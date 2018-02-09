'use strict';

/**
 * Creates a Game-Entity, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 */
class Entity{

	/**
	 * Creates a new Entity
	 * @param  {int} width - Entitys width
	 * @param  {int} height - Entity height
	 */
	constructor(width, height){
		this.a = null;
		this.hitbox = null;
		this.animation = null;
		this.animations = {};
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.init();
		this.effects = [];
	}

	/**
	 * @param {Effect} ef - the Effect to apply to this Entity
	 * @param {int} delay - Time to wait until the effect applies
	 * @return {Promise} Promise of the effect application allowing for followup functions using .then()
	 */
	addEffect(ef, delay = 0){
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				this.effects.push(ef);
				resolve(this, ef, 'Effect applied');
			}, delay);		
		});	
	}

	/**
	 * Applied alls rendering affects to the entity
	 * @param  {Object} frame - Current frame object
	 */
	renderEffects(frame){
		this.effects.forEach((el)=>{
			if (el.onRender()) {
				el.tick(this, frame);	
			}
		});
		this.effects = this.effects.filter((el)=>{
			return !el.remove;
		});
	}

	/**
	 * Updates the Entitys width
	 * @param {int} width
	 */
	setWidth(width){
		this.width = width;
	}

	/**
	 * Updates the Entitys height
	 * @param {int} height
	 */
	setHeight(height){
		this.height = height;
	}

	/**
	 * Adds a named Animation to this Entity. At least one Animation needs to exist in order for this Entity to be able to spawn
	 * @param  {string} name - Animation name
	 * @param  {Animation} ani - Animation object
	 * @see  {@link Entity#spawn|spawn}
	 */
	registerAnimation(name, ani){
		this.animations[name] = ani;
	}

	/**
	 * Draws this Entity in the game canvas
	 * @param  {Engine} game - The game object this entity is drawn on
	 */
	draw(game){
		let frame = this.animation.next(Date.now());

		// Apply Rendering Effects
		this.renderEffects(frame);		
		
		// Render current Sprite
		game.draw(	this.animation.texture.img,
					this.x + frame.data.offset.x,
					this.y + frame.data.offset.y,
					(frame.data.width)?frame.data.width:this.width,
					(frame.data.height)?frame.data.height:this.height,
					frame.data.x,
					frame.data.y,
					this.width,
					this.height
				);

		// Render Hitboxes
		if (game.debug.hitboxes) {
			this.hitbox.draw(game, this);
			if (frame.data.hitbox !== undefined) {
				if (Array.isArray(frame.data.hitbox)) {
					for (var i = 0; i < frame.data.hitbox.length; i++) {
						frame.data.hitbox[i].draw(game, this);
					}
				}
				else{
					frame.data.hitbox.draw(game, this);
				}
			}
		}
	}

	/**
	 * Spawns this Entity at the given coordinates with an the given animation
	 * @param  {number} x - x-coordinate
	 * @param  {number} y - y-coordinate
	 * @param  {string} ani - animation name
	 * @see {@link Entity#registerAnimation|registerAnimation}
	 */
	spawn(x,y, ani){
		this.x = x;
		this.y = y;
		this.animation = this.animations[ani];
	}

	/**
	 * Custom Operations to setup this Entity
	 * @see  {@link Entity#setWidth|setWidth}
	 * @see  {@link Entity#setHeight|setHeight}
	 * @see  {@link Entity#registerAnimation|registerAnimation}
	 * @abstract
	 */
	init(){}
}

export default Entity;