"use strict";
var refs = require("./refs");
var phantomJsCloud = refs.phantomJsCloud;
phantomJsCloud.setDebug(true);
var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
var browser = new phantomJsCloud.BrowserApi(apiKey);
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
var queryAndMineAlexaTopsites = require("./advanced/query-and-mine-alexa-topsites");
queryAndMineAlexaTopsites.runExample();
//# sourceMappingURL=_index.js.map