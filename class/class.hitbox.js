
/**
 * Creates a Hitbox handler, which integrates into the WAGE Workflow
 */
class Hitbox{

	/**
	 * Construct the Hitbox
	 * @param  {int} width - The hitbox width
	 * @param  {int} height - The hitbox height
	 * @param  {number} x - the x offset relative to the entities origin
	 * @param  {number} y - the y offset relative to the entities origin
	 */
	constructor(width, height, x = 0, y = 0){
		this.width = width;
		this.height = height;
		this.offset = {
			x: x,
			y: y
		};
	}

	/**
	 * Draws the hitbox on the given game canvas
	 * @param  {Engine} game - The game object
	 * @param  {Entity} parent - The entity this hitbox applies to
	 */
	draw(game, parent){
		game.ctx.beginPath();
		game.ctx.rect(parent.x + this.offset.x, parent.y + this.offset.y, this.width , this.height);
		game.ctx.strokeStyle="#FF0000";
		game.ctx.stroke();
	}
}

export default Hitbox;