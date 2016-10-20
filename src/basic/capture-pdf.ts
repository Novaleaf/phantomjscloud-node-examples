import refs = require("../refs");
import phantomJsCloud = refs.phantomJsCloud;

import fs = require("fs");

/**
 *  basic example using callback
 */
export function runExample() {

	let apiKey: string | undefined = undefined;//leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
	let browser = new phantomJsCloud.BrowserApi(apiKey);

	//the request in "PageRequest" format
	let pageRequest: phantomJsCloud.ioDatatypes.IPageRequest = { url: "https://amazon.com", renderType: "pdf" };
	console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));

	browser.requestSingle(pageRequest, (err, userResponse) => {
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

}

//if this script is run directly, execute the example automatically
if (!module.parent) {
	//parent
	runExample();
} else {
	//child
	//noop
}