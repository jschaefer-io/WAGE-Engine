'use strict';

/**
 * Creates a Hitbox handler, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 */
class Hitbox{

	/**
	 * Checks the collision between two hitboxes
	 * @param  {Hitbox} hitbox1 - First hitbox
	 * @param  {Entity} entity1 - First entity
	 * @param  {Hitbox} hitbox2 - Second hitbox
	 * @param  {Entity} entity2 - Second entity
	 * @return {Boolean} True if the two hitboxes do collide
	 */
	static checkCollision(hitbox1, entity1, hitbox2, entity2){
		return (entity1.x + hitbox1.offset.x) < (entity2.x + hitbox2.offset.x) + hitbox2.width &&
				   (entity1.x + hitbox1.offset.x) + hitbox1.width > (entity2.x + hitbox2.offset.x) &&
				   (entity1.y + hitbox1.offset.y) < (entity2.y + hitbox2.offset.y) + hitbox2.height &&
				   hitbox1.height + (entity1.y + hitbox1.offset.y) > (entity2.y + hitbox2.offset.y)
	}

	/**
	 * Checks, from which direction the two objects collide
	 * @param  {Hitbox} hitbox1 - First hitbox
	 * @param  {Entity} entity1 - First entity
	 * @param  {Hitbox} hitbox2 - Second hitbox
	 * @param  {Entity} entity2 - Second entity
	 * @return {Object} Object containing collision data
	 */
	static checkCollisionDirection(hitbox1, entity1, hitbox2, entity2){
		let x1 = entity1.x + hitbox1.offset.x,
			y1 = entity1.y + hitbox1.offset.y,
			x2 = entity2.x + hitbox2.offset.x,
			y2 = entity2.y + hitbox2.offset.y;

		let vector1 = [entity1.vector[1] - entity1.vector[3], entity1.vector[0] - entity1.vector[2]],
			vector2 = [entity2.vector[1] - entity2.vector[3], entity2.vector[1] - entity2.vector[3]];

		let collisions = {
				origin: {
					top: false,
					left: false,
					right: false,
					bottom: false,
					undefined: false
				},
				target: {
					top: false,
					left: false,
					right: false,
					bottom: false,
					undefined: false
				}
			},
			undef = true;

		let calculations = [
				(y1+hitbox1.height) - (y2), // TOP
				(x2+hitbox2.width) - (x1), 	// RIGHT
				(y2+hitbox2.height) - (y1), // BOTTOM
				(x1+hitbox1.width) - (x2), 	// LEFT
			],
			direction = calculations.indexOf(Math.min(...calculations));


		switch(direction){
			case 0:
				collisions.origin.top = true;
				collisions.target.bottom = true;
				undef = false;
				break;
			case 1:
				collisions.origin.right = true;
				collisions.target.left = true;			
				undef = false;
				break;
			case 2:
				collisions.origin.bottom = true;
				collisions.target.top = true;			
				undef = false;
				break;
			case 3:
				collisions.origin.left = true;
				collisions.target.right = true;
				undef = false;
				break;
		}
		if (undef) {
			collisions.origin.undefined = true;
			collisions.target.undefined = true;
		}
		return {directions: collisions, calculations: calculations};	
	}

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