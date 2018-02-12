'use strict';

/**
 * The HTMLAudioElement interface provides access to the properties of <audio> elements, as well as methods to manipulate them.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement}
 * @external Audio
 */

/**
 * Creates a Sound file, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @extends {external:Audio}
 */
class Sound extends Audio{

	/**
	 * Constructs the soundfile
	 * @param  {string} url - Link to the soundfile image
	 * @param {Boolean} [load=true] - False if the soundfile should not be loaded on construction
	 */
	constructor(url, load = true){
		super();
		this.loadUrl = url;
		if (load) {
			this.load();
		}

	}

	/**
	 * Starts loading the audiofile asynchronously
	 * @param  {Function} [callback] - Function to call after the audio has been loaded
	 */
	load(callback = function(){}){
		this.addEventListener('canplaythrough', callback);
		this.src = this.loadUrl;
	}
}
export default Sound;