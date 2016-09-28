
import refs = require("../refs");
import xlib = refs.xlib;
import phantomJsCloud = refs.phantomJsCloud;
import _ = xlib.lodash;

phantomJsCloud.setDebug(true);

//let log = new xlib.logging.Logger(__filename);
//log.info("make a request to render a single page, returning the plain-text contents of the page.");


import fs = require("fs");
import Promise = xlib.promise.bluebird;

let apiKey: string | undefined = undefined;//leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
let browser = new phantomJsCloud.BrowserApi(apiKey);


//////////  MAIN EXAMPLE:   
//make demo app to automatically extract top 100 sites from alexia, then crawl them all extracting all hyperlinks



interface ITopsitesData { urls: string[]; next: string | null }
let topsitesPayload: ITopsitesData = { urls: [], next: null };



let totalCost = 0;

function getNextUrls(currentTopsitesData: ITopsitesData): Promise<ITopsitesData> {

    return Promise.try<ITopsitesData>(() => {
        let nextPageRequest: refs.phantomJsCloud.ioDatatypes.IPageRequest = {
            url: "http://www.alexa.com" + currentTopsitesData.next,
            renderType: "script",
            scripts: {
                domReady: [
                    //"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js", //alexa already has jquery so don't need to load it
                    //the following scipt will return back a "ITopsitesData" datastructure
                    "var urls=[];  $('li.site-listing p.desc-paragraph a').map(function (i,v) { urls.push(v.innerText);});  var next = $('a.next')[0]; _pjscMeta.scriptOutput={urls:urls,next:$('a.next').attr('href')}; ",
                ],
                loadFinished: [],
            },
        };
        console.log("start reading page " + nextPageRequest.url);
        return browser.requestSingle(nextPageRequest)//, { endpointOrigin: "https://local.phantomjscloud.com:5445" })
            .then<ITopsitesData>((userResponse) => {

                try {
                    totalCost += userResponse.meta.billing.creditCost;
                } catch (ex) { }
                console.log("finished reading page " + nextPageRequest.url);
                if (userResponse.statusCode != 200 || userResponse.content.statusCode != 200) {
                    return Promise.reject(new Error("invalid status code"));
                }
                let pageTopsiteData: ITopsitesData = JSON.parse(userResponse.content.data);
                return pageTopsiteData;
            })
            .then((pageTopsiteData) => {
                console.log("got url amount = " + pageTopsiteData.urls.length);
                currentTopsitesData.urls = currentTopsitesData.urls.concat(pageTopsiteData.urls);
                currentTopsitesData.next = pageTopsiteData.next;
                if (pageTopsiteData.next != null) {
                    //return currentTopsitesData;
                    return getNextUrls(currentTopsitesData);
                } else {
                    return currentTopsitesData;
                }
            });
    });
}

/**
 * reads plainText from all urls and writes to file, returns promises to allow monitoring of results
 * @param urls
 */
function writeTopsiteTextToFile(urls: string[]) {

    //test hack, just 1
    //urls = [urls[0]];

    let results: Promise<string>[] = [];
    _.forEach(urls, (url, rank) => {
        let topSiteCheckRequest: refs.phantomJsCloud.ioDatatypes.IPageRequest = {
            url: "http://" + url,
            renderType: "plainText",
        };
        let result = browser.requestSingle(topSiteCheckRequest)
            .then<string>((userResponse) => {

                try {
                    totalCost += userResponse.meta.billing.creditCost;
                } catch (ex) { }
                //if (userResponse.statusCode != 200 || userResponse.content.statusCode != 200) {
                //	return Promise.reject(new Error("invalid status code"));
                //}
                let fileName = `${rank}_${url}_${userResponse.statusCode}.json`;// rank.toString() + "_" + url +"" ".json";
                fs.writeFile(fileName, JSON.stringify(userResponse, undefined, "\t"), { encoding: "utf8" });
                console.log("wrote " + fileName);
                return Promise.resolve(url);
            }, (err) => {
                console.error("error on writeTopsiteTextToFile() for " + url + " error=", err.toString());
            });
        results.push(result as any);
    });

    return results;
}









export function runExample(): Promise<void> {

    return new Promise<void>((resolve,reject) => {


        let startTime = Date.now();
        getNextUrls({ urls: [], next: "/topsites/global" })
            .then((allTopsites) => {
                let finishTopsiteListTime = Date.now();
                let finishTopSiteCost = totalCost;

                //now have a list of the top 500 sites
                console.log(JSON.stringify(allTopsites.urls, undefined, "\t"));

                //can request plainText for all of them and save to disk

                return Promise.all(writeTopsiteTextToFile(allTopsites.urls))
                    .then(() => {
                        let finallyDoneTime = Date.now();
                        let alexiaTime = (finishTopsiteListTime - startTime) / 1000;
                        let readPlainTextTime = ((finallyDoneTime - startTime) / 1000) - alexiaTime;
                        let readPlainTextCost = totalCost - finishTopSiteCost;
                        console.log(`DONE!  alexiaTop500GatherTime = ${alexiaTime}sec $${finishTopSiteCost} writePlainTextTime=${readPlainTextTime}sec $${readPlainTextCost}`);
                        resolve();
                    });


            }, (errCouldNotGetTopsites) => {
                console.error("could not get topsites", errCouldNotGetTopsites.toString());
                reject();
            });




    });

}





