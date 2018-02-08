/**
 * Texture Loader for the WAGE Workflow
 */
class TexLoader{

	/**
	 * Constructs the Texture Loader
	 */
	constructor(){
		this.reset();
	}

	/**
	 * Clears the Texture Loader and discards all added textures
	 */
	reset(){
		this.tex = [];
		this.count = 0;
		this.loaded = 0;
	}

	/**
	 * Add a Texture to the Texture Loader
	 * @param {Texture} tex - Texture to be handled by the Texture Loader
	 */
	addTexture(tex){
		this.tex.push(tex);
		this.count++;
	}

	/**
	 * Loads all Textures into the Browser
	 * @return {Promise} Promise of all Textures beeing loaded successfully
	 */
	load(){
		return new Promise((resolve, reject)=>{
			for (var i = 0; i < this.tex.length; i++) {
				this.tex[i].load(()=>{
					this.loaded++;
					if (this.loaded === this.count) {
						this.reset();
						resolve(this, 'Textures loaded');
					}
				});
			}
		});
	}
}

export default TexLoader;