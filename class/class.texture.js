'use strict';

/**
 * Creates a Texture, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @extends {Image}
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
		if (load) {
			this.load();
		}		
	}

	/**
	 * Starts loading the Texture asynchronously
	 * @param  {Function} [callback] - Function to call after Texture has been loaded
	 */
	load(callback = function(){}){
		this.addEventListener('load', callback);
		this.src = this.loadUrl;
	}
}

export default Texture;