"use strict";
var refs = require("../refs");
var xlib = refs.xlib;
var phantomJsCloud = refs.phantomJsCloud;
var _ = xlib.lodash;
//show verbose details
phantomJsCloud.setDebug(true);
//let log = new xlib.logging.Logger(__filename);
//log.info("make a request to render a single page, returning the plain-text contents of the page.");
var fs = require("fs");
var Promise = xlib.promise.bluebird;
var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
var browser = new phantomJsCloud.BrowserApi(apiKey);
var topsitesPayload = { urls: [], next: null };
var totalCost = 0;
function getNextUrls(currentTopsitesData) {
    return Promise.try(function () {
        var nextPageRequest = {
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
        return browser.requestSingle(nextPageRequest) //, { endpointOrigin: "https://local.phantomjscloud.com:5445" })
            .then(function (userResponse) {
            try {
                totalCost += userResponse.meta.billing.creditCost;
            }
            catch (ex) { }
            console.log("finished reading page " + nextPageRequest.url);
            if (userResponse.statusCode != 200 || userResponse.content.statusCode != 200) {
                return Promise.reject(new Error("invalid status code"));
            }
            var pageTopsiteData = JSON.parse(userResponse.content.data);
            return pageTopsiteData;
        })
            .then(function (pageTopsiteData) {
            console.log("got url amount = " + pageTopsiteData.urls.length);
            currentTopsitesData.urls = currentTopsitesData.urls.concat(pageTopsiteData.urls);
            currentTopsitesData.next = pageTopsiteData.next;
            if (pageTopsiteData.next != null) {
                //return currentTopsitesData;
                return getNextUrls(currentTopsitesData);
            }
            else {
                return currentTopsitesData;
            }
        });
    });
}
/**
 * reads plainText from all urls and writes to file, returns promises to allow monitoring of results
 * @param urls
 */
function writeTopsiteTextToFile(urls) {
    //test hack, just 1
    //urls = [urls[0]];
    var results = [];
    _.forEach(urls, function (url, rank) {
        var topSiteCheckRequest = {
            url: "http://" + url,
            renderType: "plainText",
        };
        var result = browser.requestSingle(topSiteCheckRequest)
            .then(function (userResponse) {
            try {
                totalCost += userResponse.meta.billing.creditCost;
            }
            catch (ex) { }
            //if (userResponse.statusCode != 200 || userResponse.content.statusCode != 200) {
            //	return Promise.reject(new Error("invalid status code"));
            //}
            var fileName = rank + "_" + url + "_" + userResponse.statusCode + ".json"; // rank.toString() + "_" + url +"" ".json";
            fs.writeFile(fileName, JSON.stringify(userResponse, undefined, "\t"), { encoding: "utf8" });
            console.log("wrote " + fileName);
            return Promise.resolve(url);
        }, function (err) {
            console.error("error on writeTopsiteTextToFile() for " + url + " error=", err.toString());
        });
        results.push(result);
    });
    return results;
}
function runExample() {
    return new Promise(function (resolve, reject) {
        var startTime = Date.now();
        getNextUrls({ urls: [], next: "/topsites/global" })
            .then(function (allTopsites) {
            var finishTopsiteListTime = Date.now();
            var finishTopSiteCost = totalCost;
            //now have a list of the top 500 sites
            console.log(JSON.stringify(allTopsites.urls, undefined, "\t"));
            //can request plainText for all of them and save to disk
            return Promise.all(writeTopsiteTextToFile(allTopsites.urls))
                .then(function () {
                var finallyDoneTime = Date.now();
                var alexiaTime = (finishTopsiteListTime - startTime) / 1000;
                var readPlainTextTime = ((finallyDoneTime - startTime) / 1000) - alexiaTime;
                var readPlainTextCost = totalCost - finishTopSiteCost;
                console.log("DONE!  alexiaTop500GatherTime = " + alexiaTime + "sec $" + finishTopSiteCost + " writePlainTextTime=" + readPlainTextTime + "sec $" + readPlainTextCost);
                resolve();
            });
        }, function (errCouldNotGetTopsites) {
            console.error("could not get topsites", errCouldNotGetTopsites.toString());
            reject();
        });
    });
}
exports.runExample = runExample;
//# sourceMappingURL=query-and-mine-alexa-topsites.js.map