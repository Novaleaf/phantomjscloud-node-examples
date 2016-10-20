"use strict";
var refs = require("../refs");
var xlib = refs.xlib;
var phantomJsCloud = refs.phantomJsCloud;
var log = new xlib.logging.Logger(__filename);
var fs = require("fs");
/**
 *  basic example using promise
 */
function runExample() {
    var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
    var browser = new phantomJsCloud.BrowserApi(apiKey);
    //the request in "PageRequest" format
    var pageRequest = { url: "https://amazon.com", renderType: "pdf" };
    console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));
    return browser.requestSingle(pageRequest)
        .then(function (userResponse) {
        if (userResponse.statusCode != 200) {
            throw new Error("invalid status code" + userResponse.statusCode);
        }
        fs.writeFile(userResponse.content.name, userResponse.content.data, {
            encoding: userResponse.content.encoding,
        }, function (err) {
            console.log("captured page written to " + userResponse.content.name);
        });
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
//# sourceMappingURL=capture-pdf-promise.js.map