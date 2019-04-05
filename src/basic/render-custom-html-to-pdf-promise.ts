import phantomJsCloud = require( "phantomjscloud" );
import fs = require( "fs" );


/**
 * pass in your own custom html to PhantomJsCloud and have it be returned as a PDF
 */
export function runExample() {

	let apiKey: string | undefined = undefined;// leave undefined to use a demo key.  get a free key at https://Dashboard.PhantomJsCloud.com
	let browser = new phantomJsCloud.BrowserApi( apiKey );

	// the request in "PageRequest" format
	let pageRequest: phantomJsCloud.ioDatatypes.IPageRequest = { content: "<h1>Hello</h1><small><em>world</em></small>", renderType: "pdf" } as any; // need to cast as any because pageRequest expects url, but we don't use the url when passing content.
	console.log( "about to request page from PhantomJs Cloud.  request =", JSON.stringify( pageRequest, null, "\t" ) );

	return browser.requestSingle( pageRequest )
		.then( ( userResponse ) => {

			if ( userResponse.statusCode !== 200 ) {
				throw new Error( "invalid status code" + userResponse.statusCode );
			}

			fs.writeFile( userResponse.content.name, userResponse.content.data,
				{
					encoding: userResponse.content.encoding,
				}, ( err ) => {
					console.log( "captured page written to " + userResponse.content.name );
				} );
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