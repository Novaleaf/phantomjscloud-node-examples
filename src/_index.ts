
import refs = require("./refs");
import xlib = refs.xlib;
import phantomJsCloud = refs.phantomJsCloud;
import _ = xlib.lodash;


let log = new xlib.logging.Logger(__filename);

//log.info("PhantomJsCloud examples.   uncomment the various lines below to run an example.");




//////////////////////////
//// basic examples

////callback based example
//import * as capturePdf from "./basic/capture-pdf";
//capturePdf.runExample();

////promise based example
//import * as capturePdfPromise from "./basic/capture-pdf-promise";
//capturePdfPromise.runExample()
//	.then(() => {
//		log.info("done!");
//	});

////promise based example
//import * as capturePlaintextPromise from "./basic/capture-plaintext-promise";
//capturePlaintextPromise.runExample()
//	.then(() => {
//		log.info("done!");
//	});


//////////////////////////
//// advanced examples

//////advanced example showing how to extract a list of url's from a collection of pages, then mine those url's.
//import * as queryAndMineAlexaTopsites from "./advanced/query-and-mine-alexa-topsites";
////WARNING!!!!   running this example costs about $0.30, so you need paid credits or it would aborted part way through.
//queryAndMineAlexaTopsites.runExample();


log.warn("read the README.MD for how to run the examples.   \n for example, run: \n\t\t node ./dist/basic/capture-pdf-promise.js");