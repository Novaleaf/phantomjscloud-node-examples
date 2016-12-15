//specify xlib config options, without requiring environmental config
//if ((global as any)._xlibConfigDefaults == null) { (global as any)._xlibConfigDefaults = {}; }
(global as any)._xlibConfigDefaults = {
    ...{
        logLevel: "DEBUG",
        envLevel: "PREPROD",
        isTest: "FALSE",
        isDev: "TRUE",
        sourceMapSupport: true,
    } as typeof _xlibConfigDefaults,
    ...(global as any)._xlibConfigDefaults,
};
export import xlib = require("xlib");

export import phantomJsCloud = require("phantomjscloud");


