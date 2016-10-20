"use strict";
var refs = require("../refs");
var xlib = refs.xlib;
var phantomJsCloud = refs.phantomJsCloud;
var log = new xlib.logging.Logger(__filename);
/**
 *  basic example using promise
 */
function runExample() {
    log.info("make a request to render a single page, returning the plain-text contents of the page.");
    var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
    var browser = new phantomJsCloud.BrowserApi(apiKey);
    //the page you wish to render
    var pageRequest = { url: "http://www.example.com" };
    //make a request to render a single page, returning the plain-text contents of the page.
    return browser.requestSingle({ url: "http://www.example.com", renderType: "plainText" })
        .then(function (userResponse) {
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
exports.runExample = runExample;
//if this script is run directly, execute the example automatically
if (!module.parent) {
    //parent
    runExample();
}
else {
}
//# sourceMappingURL=capture-plaintext-promise.js.map