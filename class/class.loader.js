'use strict';

/**
 * Asset-Loader for the WAGE Workflow
 * @memberof WAGE.API
 * @hideconstructor
 */
class Loader{

	/**
	 * Constructs the Asset-Loader
	 */
	constructor(){
		this.reset();
	}

	/**
	 * Clears the Asset-Loader and discards all added assets
	 */
	reset(){
		this.assets = [];
		this.count = 0;
		this.loaded = 0;
	}

	/**
	 * Add an asset to the Asset-Loader
	 * @param {Texture|Sound} assets - Asset to be handled by the Asset-Loader
	 */
	add(assets){
		this.assets.push(assets);
		this.count++;
	}

	/**
	 * Loads all assets into the Browser
	 * @param {function} [callback] - Callback which gets called on every update
	 * @return {Promise} Promise of all assets beeing loaded successfully
	 */
	load(callback = ()=>{}){
		return new Promise((resolve, reject)=>{
			for (var i = 0; i < this.assets.length; i++) {
				this.assets[i].load(()=>{
					this.loaded++;
					callback(this.count, this.loaded);
					if (this.loaded === this.count) {
						this.reset();
						resolve(this, 'Assets loaded');
						return;
					}
				});
			}
			if (this.assets.length === 0) {
				resolve(this, 'Assets loaded');
			}
		});
	}
}

export default Loader;