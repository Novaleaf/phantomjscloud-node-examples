"use strict";
exports.__esModule = true;
var phantomJsCloud = require("phantomjscloud");
var fs = require("fs");
/**
 * pass in your own custom html to PhantomJsCloud and have it be returned as a PDF
 */
function runExample() {
    var apiKey = undefined; // leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
    var browser = new phantomJsCloud.BrowserApi(apiKey);
    // the request in "PageRequest" format
    var pageRequest = { content: "<h1>Hello</h1><small><em>world</em></small>", renderType: "pdf" }; // need to cast as any because pageRequest expects url, but we don't use the url when passing content.
    console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));
    return browser.requestSingle(pageRequest)
        .then(function (userResponse) {
        if (userResponse.statusCode !== 200) {
            throw new Error("invalid status code" + userResponse.statusCode);
        }
        fs.writeFile(userResponse.content.name, userResponse.content.data, {
            encoding: userResponse.content.encoding
        }, function (err) {
            console.log("captured page written to " + userResponse.content.name);
        });
    });
}
exports.runExample = runExample;
// if this script is run directly, execute the example automatically
if (!module.parent) {
    // parent
    runExample();
}
else {
    // child
    // noop
}
//# sourceMappingURL=render-custom-html-to-pdf-promise.js.map