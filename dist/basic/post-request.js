"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var refs = require("../refs");
var xlib = refs.xlib;
var phantomJsCloud = refs.phantomJsCloud;
var log = new xlib.logging.Logger(__filename);
/**
 *  basic example using POST requests
 */
function runExample() {
    log.info("make a POST request, returning details about the request and displaying them via the console.");
    var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
    var browser = new phantomJsCloud.BrowserApi(apiKey);
    browser.requestSingle({
        /** this url will return details about your request.  good for troubleshooting/inspecting */
        url: "https://phantomjscloud.com/examples/helpers/requestdata",
        renderType: "plainText",
        urlSettings: { operation: "POST" },
    }, function (err, userResponse) {
        //can use a callback like this example, or a Promise (see the Typescript example below)
        if (err != null) {
            throw err;
        }
        console.log(JSON.stringify(userResponse.content));
    });
}
exports.runExample = runExample;
//if this script is run directly, execute the example automatically
if (!module.parent) {
    //parent
    runExample();
}
else {
    //child
    //noop
}
//# sourceMappingURL=post-request.js.map