/**
 * Main Engine Handler
 */
class Engine{

	/**
	 * Initialises the Game Engine
	 * @param  {Element} node - DOM-Node of the game canvas
	 */
	constructor(node){
		this.canvas = node;
		this.ctx = node.getContext('2d');
		window.addEventListener('resize', ()=>{
			this.alignCanvas();			
		});
		this.alignCanvas();
		this.debug = {
			hitboxes: false
		}
		// this.ctx.globalCompositeOperation = 'multiply';
	}

	/**
	 * Fixes the canvas scaling problem
	 */
	alignCanvas(){
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}

	/**
	 * Draws an image on the canvas
	 * @param  {Image} img - The image to draw
	 * @param  {number} x - the x-coordinate to draw
	 * @param  {number} y - the y-coordinate to draw
	 * @param  {int} w - the images width
	 * @param  {int} h - the images height
	 * @param  {number} [cx] - the cropped x-coordinate
	 * @param  {number} [cy] - the cropped y-coordinate
	 * @param  {int} [cw] - the cropped image parts width
	 * @param  {int} [ch] - the cropped image parts height
	 */
	draw(img, x, y, w, h, cx = undefined, cy = undefined, cw = undefined, ch = undefined){
		this.ctx.beginPath();
		this.ctx.clearRect(0, 0, 1000, 1000);
		if (cx !== undefined) {
			this.ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
		}
		else{
			this.ctx.drawImage(img, x, y, w, h);
		}
	}
}

export default Engine;