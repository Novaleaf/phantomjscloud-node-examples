import refs = require("../refs");
import xlib = refs.xlib;
import phantomJsCloud = refs.phantomJsCloud;
let log = new xlib.logging.Logger(__filename);

import fs = require("fs");

let apiKey:string|undefined = undefined;//leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
let browser = new phantomJsCloud.BrowserApi(apiKey);

//the request in "PageRequest" format
let pageRequest: phantomJsCloud.ioDatatypes.IPageRequest = { url: "https://amazon.com", renderType: "pdf" };
console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));

browser.requestSingle(pageRequest)
	.then((userResponse) => {

		if (userResponse.statusCode != 200) {
			throw new Error("invalid status code" + userResponse.statusCode);
		}

		fs.writeFile(userResponse.content.name, userResponse.content.data,
			{
				encoding: userResponse.content.encoding,
			}, (err) => {
				console.log("captured page written to " + userResponse.content.name);
			});
	});
