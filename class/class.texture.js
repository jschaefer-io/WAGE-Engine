'use strict';

/**
 * The HTMLImageElement interface provides special properties and methods  for manipulating the layout and presentation of <img> elements.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement}
 * @external Image
 */


/**
 * Creates a Texture, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @extends {external:Image}
 */
class Texture extends Image{

	/**
	 * Constructs the Texture
	 * @param  {string} url - Link to the texture image
	 * @param {Boolean} [load=true] - False if the Texture should not be loaded on construction
	 */
	constructor(url, load = true){
		super();
		this.loadUrl = url;
		if (load && this.loadUrl) {
			this.load();
		}		
	}

	/**
	 * Starts loading the Texture asynchronously
	 * @param  {Function} [callback] - Function to call after Texture has been loaded
	 */
	load(callback = function(){}){
		if (this.loadUrl) {
			this.addEventListener('load', callback);
			this.src = this.loadUrl;
		}
		else{
			callback();
		}
	}
}

export default Texture;