'use strict';

import Entity from '../class/class.entity.js';

/**
 * Group of entities
 * @memberof WAGE.Library
 * @abstract
 * @augments {WAGE.Core.Entity}
 * @throws {Error} If this abstract class is instantiated
 */
class Group extends Entity{

	/**
	 * Makes this entity abstract
	 */
	constructor(entity, xCount = 1, yCount = 1){
		super();
		if (xCount === 0 || yCount === 0) {
			throw new Error('X and Y must be 1 or more to build a Group');
		}
		this.countX = xCount;
		this.countY = yCount;
		this.groupContent = new Array(yCount).fill(new Array(xCount).fill(new entity()));
		this.contentWidth = this.groupContent[0][0].width;
		this.contentHeight = this.groupContent[0][0].height;
		this.setWidth(this.groupContent[0][0].width * this.countX);
		this.setHeight(this.groupContent[0][0].height * this.countY);

		this.prepare();
	}

	getType(){
		return this.groupContent[0][0].getType();
	}

	init(){
		return;
	}
	prepare(){

		let hitbox = new WAGE.Core.Hitbox(this.width, this.height),
			tex = new WAGE.Core.Texture(false);

		let none = new WAGE.Core.Animation(tex);
		none.addFrame({x: 0, y: 0, hitbox: hitbox, width: 50, height: 50}, 1000);
		this.registerAnimation('none', none);
		this.setAnimation('none');
	}
	draw(game){
		super.draw(game);
		this.groupContent.forEach((subgroup, yOffset)=>{
			subgroup.forEach((entity, xOffset)=>{
				// entity.draw(game, this.x + xOffset * this.contentWidth, this.y + yOffset * this.contentHeight);
				entity.draw(game, this.x - xOffset * this.contentWidth, this.y - yOffset * this.contentHeight);
			});
		});
	}
	spawn(x, y){
		super.spawn(x,y);
		this.groupContent.forEach((subgroup, yOffset)=>{
			subgroup.forEach((entity, xOffset)=>{
				entity.spawn(xOffset * this.contentWidth, yOffset * this.contentHeight);
			});
		});
	}
	process(time, game){
		this.groupContent.forEach((subgroup)=>{
			subgroup.forEach((entity)=>{
				entity.process(time, game);
			});
		});
	}
	resolveCollision(entity, direction, calculations, thisHitbox, entityHitbox){
		this.groupContent[0][0].resolveCollision(entity, direction, calculations, thisHitbox, entityHitbox);
	}
}

export default Group;