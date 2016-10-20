import refs = require("../refs");
import xlib = refs.xlib;
import phantomJsCloud = refs.phantomJsCloud;
let log = new xlib.logging.Logger(__filename);



/**
 *  basic example using promise
 */
export function runExample() {

	log.info("make a request to render a single page, returning the plain-text contents of the page.");

	let apiKey: string | undefined = undefined;//leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
	let browser = new phantomJsCloud.BrowserApi(apiKey);

	//the page you wish to render
	let pageRequest: phantomJsCloud.ioDatatypes.IPageRequest = { url: "http://www.example.com" };

	//make a request to render a single page, returning the plain-text contents of the page.
	return browser.requestSingle({ url: "http://www.example.com", renderType: "plainText" })
		.then((userResponse) => {
			console.log(JSON.stringify({
				//the content of the page you requested
				content: userResponse.content,
				//metadata about your request, such as billing
				meta: userResponse.meta,
				//the status code of your request
				statusCode: userResponse.statusCode
			}, null, "\t"));
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