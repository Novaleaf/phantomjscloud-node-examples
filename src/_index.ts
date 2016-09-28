
import refs = require("./refs");
import xlib = refs.xlib;
import phantomJsCloud = refs.phantomJsCloud;
import _ = xlib.lodash;

phantomJsCloud.setDebug(true);

//let log = new xlib.logging.Logger(__filename);
//log.info("make a request to render a single page, returning the plain-text contents of the page.");


import fs = require("fs");
import Promise = xlib.promise.bluebird;

let apiKey: string|undefined = undefined;//leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
let browser = new phantomJsCloud.BrowserApi(apiKey);

//////the page you wish to render
////let pageRequest: phantomJsCloud.ioDatatypes.IPageRequest = { url: "https://amazon.com", renderType: "pdf" };

//////make a request to render a single page, returning the plain-text contents of the page.

////console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));
////browser.requestSingle(pageRequest)
////	.then((userResponse) => {

////		if (userResponse.statusCode != 200) {			
////			throw new Error("invalid status code" + userResponse.statusCode);
////		}
		
////		fs.writeFile(userResponse.content.name, userResponse.content.data,
////			{
////				encoding: userResponse.content.encoding,
////			}, (err) => {
////				console.log("captured page written to " + userResponse.content.name);
////			});
////	});


import * as queryAndMineAlexaTopsites from "./advanced/query-and-mine-alexa-topsites";

queryAndMineAlexaTopsites.runExample();