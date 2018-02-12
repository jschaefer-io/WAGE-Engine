'use strict';

import Clock from './class.clock.js';
import Hitbox from './class.hitbox.js';

/**
 * Creates a Game-Entity, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @abstract
 * @throws {Error} If this abstract class is instantiated
 */
class Entity{

	/**
	 * Creates a new Entity
	 * @param  {int} width - Entitys width
	 * @param  {int} height - Entity height
	 */
	constructor(width, height){
		if (this.constructor === Entity) {
			throw new Error('Effect is an abstract class and can not be instantiated.');
		}

		this.animation = null;
		this.animations = {};
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;

		this.init();
		this.effects = [];
		this.vector = [0,0,0,0];
	}

	/**
	 * Adds an effect to this entity
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
	 * Removes the given effect from this entity
	 * @param  {string} type - Effect Class
	 * @return {Boolean} Returns true if the first occurance of this effect has been successful
	 */
	removeEffect(type){
		this.effects.forEach((ef)=>{
			if (ef.constructor === type) {
				ef.delete();
				return true;
			}
		});
		return false;
	}

	/**
	 * Removes all occurances of the given effect
	 * @param  {string} type - Effect Class
	 */
	removeAllEffect(type){
		while(this.hasEffect(type)){
			this.removeEffect();
		}
	}


	/**
	 * Checks if this entity has the given effect type
	 * @param  {class}  type - Effect Class
	 * @return {Boolean} Returns true if the given effect type currently applies to this entity
	 */
	hasEffect(type){
		this.effects.forEach((ef)=>{
			if (ef.constructor === type) {
				return true;
			}
		});
		return false;
	}

	/**
	 * Execute all effects activated for the rendering process
	 * @param  {Object} frame - Current frame object
	 */
	renderEffects(frame){
		this.effects.forEach((el)=>{
			if (el.onRender()) {
				el.tick(this, frame);	
			}
		});
		this.cleanupEffects();
	}

	/**
	 * Execute all effects activated for the physics and update process
	 */
	processEffects(){
		this.effects.forEach((el)=>{
			if (el.onProcess()) {
				el.tick(this);	
			}
		});
		this.cleanupEffects();
	}

	/**
	 * Remove all effects, which are deactivated from this entity
	 */
	cleanupEffects(){
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
	 * Updates the animation to the given one
	 * @param {string} type - Animation name
	 */
	setAnimation(type){
		this.animation = this.animations[type];
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
	 * Checks, if this entity collides with one entity out of the given list (ignoring itself)
	 * and starts the collision dispatcher
	 * @param  {array} list - Array of entities
	 * @param  {id} [self] - own index in the array
	 * @param {array} done - Result of past collision checks
	 * @return {array} List of indexes, where a collision occured
	 */
	checkCollisions(list, self = false, done = []){
		let now = Clock.now(),
			selfBox = this.animation.next(now).data.hitbox,
			compBox,
			direction,
			collisions = [];
		list.forEach((entity, index)=>{
			if ((self === false || self !== index) && done[index] === undefined) {
				compBox = entity.animation.next(now).data.hitbox;
				if (Hitbox.checkCollision(selfBox, this, compBox, entity)) {
				   	collisions.push(index);

				   	direction = Hitbox.checkCollisionDirection(selfBox, this, compBox, entity);
				   	this.resolveCollision(entity, direction.origin, selfBox, compBox);
					entity.resolveCollision(this, direction.target, compBox, selfBox);
					
				}		
			}
		});
		return collisions;
	}

	/**
	 * Custom Collision resolve - Resolves the collision with another entity.
	 * @param  {Entity} entity - Entity which collided with the current Entity
	 * @param {Object} [direction] - Object containing informations about the collision detection
	 * @param {Hitbox} [thisHitbox] - Own Hitbox, which collided
	 * @param {Hitbox} [entityHitbox] - Collided Hitbox
	 * @abstract
	 */
	resolveCollision(entity, direction, thisHitbox, entityHitbox){
		throw new Error('The resolveCollision method is abstract and needs to be implemented.');
	}

	/**
	 * Draws this Entity in the game canvas
	 * @param  {Engine} game - The game object this entity is drawn on
	 */
	draw(game){
		let frame = this.animation.next(Clock.now());

		// Apply Rendering Effects
		this.renderEffects(frame);		
		
		// Render current Sprite
		game.draw(	this.animation.texture,
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
		if (game.debug.hitboxes && frame.data.hitbox) {
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

	/**
	 * Custom Physic/Entity Update process called on every game tick
	 * @param  {int} time - Time passed since last tick
	 * @param  {Engine} game - Main game object
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 */
	process(time, game){
		throw new Error('The process method is abstract and needs to be implemented.');
	}

	/**
	 * Executes all vectors onto this entities x and y coordinates
	 * @param  {int} time - Time passed since last tick
	 * @access private
	 */
	dispatchVector(time){
		this.x += time * (this.vector[1] - this.vector[3]);
		this.y += time * (this.vector[0] - this.vector[2]);
	}

	/**
	 * Spawns this Entity at the given coordinates with an the given animation
	 * @param  {number} x - x-coordinate
	 * @param  {number} y - y-coordinate
	 * @param  {string} ani - animation name
	 * @see {@link Entity#registerAnimation|registerAnimation}
	 */
	spawn(x,y){
		this.x = x;
		this.y = y;
	}

	/**
	 * Custom Operations to setup this Entity
	 * @see  {@link Entity#setWidth|setWidth}
	 * @see  {@link Entity#setHeight|setHeight}
	 * @see  {@link Entity#registerAnimation|registerAnimation}
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 */
	init(){
		throw new Error('The init method is abstract and needs to be implemented.');
	}
}

export default Entity;