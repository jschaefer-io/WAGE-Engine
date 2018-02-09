'use strict';

/**
 * Creates a Texture, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 */
class Texture{

	/**
	 * Constructs the Texture
	 * @param  {string} url - Link to the texture image
	 * @param  {TexLoader} [loader] - Loader to register this Texture to
	 */
	constructor(url, loader = null){
		this.img = new Image();
		this.url = url;
		if (loader !== null) {
			loader.addTexture(this);
		}
		else{
			this.load();
		}		
	}

	/**
	 * Starts loading the Texture asynchronously
	 * @param  {Function} [callback] - Function to call after Texture has been loaded
	 */
	load(callback){
		this.img.addEventListener('load', callback);
		this.img.src = this.url;
	}
}

export default Texture;