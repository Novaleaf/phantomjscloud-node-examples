"use strict";
var refs = require("../refs");
var phantomJsCloud = refs.phantomJsCloud;
var fs = require("fs");
var apiKey = undefined; //leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
var browser = new phantomJsCloud.BrowserApi(apiKey);
//the request in "PageRequest" format
var pageRequest = { url: "https://amazon.com", renderType: "pdf" };
console.log("about to request page from PhantomJs Cloud.  request =", JSON.stringify(pageRequest, null, "\t"));
browser.requestSingle(pageRequest, function (err, userResponse) {
    if (userResponse.statusCode != 200) {
        throw new Error("invalid status code" + userResponse.statusCode);
    }
    fs.writeFile(userResponse.content.name, userResponse.content.data, {
        encoding: userResponse.content.encoding,
    }, function (err) {
        console.log("captured page written to " + userResponse.content.name);
    });
});
//# sourceMappingURL=capture-pdf.js.map