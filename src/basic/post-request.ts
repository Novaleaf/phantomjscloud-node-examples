import phantomJsCloud = require( "phantomjscloud" );
import fs = require( "fs" );


/**
 *  basic example using POST requests
 */
export function runExample() {

    console.info( "make a POST request, returning details about the request and displaying them via the console." );

    let apiKey: string | undefined = undefined;// leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
    let browser = new phantomJsCloud.BrowserApi( apiKey );


    browser.requestSingle(
        {
            /** this url will return details about your request.  good for troubleshooting/inspecting */
            url: "https://phantomjscloud.com/examples/helpers/requestdata",
            renderType: "plainText",
            urlSettings: {
                operation: "POST",
                contentType: "application/json",
                data: { hello: "world" },
            },
        }
        , ( err, userResponse ) => {
            // can use a callback like this example, or a Promise (see the Typescript example below)
            if ( err != null ) {
                throw err;
            }
            console.log( userResponse.content.data );
        } );

}



// if this script is run directly, execute the example automatically
if ( !module.parent ) {
    // parent
    runExample();
} else {
    // child
    // noop
}