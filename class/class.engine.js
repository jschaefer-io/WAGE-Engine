'use strict';

import Input from './class.input.js';
import Clock from './class.clock.js';

/**
 * Main Engine Handler
 * @memberof WAGE
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

		this.ctx.webkitImageSmoothingEnabled = false;
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
		// this.ctx.globalCompositeOperation = 'multiply';
		// 
		this.input = false
		this.entities = [];
		this.running = false;

		this.viewport = {
			x: 0,
			y: 0
		}
	}

	/**
	 * Centers the Viewport around the given point
	 * @param  {number} x - X-Coordinate
	 * @param  {number} y - Y-Coordinate
	 */
	centerViewport(x, y){
		this.centerViewportX(x);
		this.centerViewportY(y);
	}

	/**
	 * Centers the Viewport around the given x-value
	 * @param  {number} x - X-Coordinate
	 */
	centerViewportX(x){
		x -= this.canvas.width / 2;
		this.setViewportX(x);
	}

	/**
	 * Centers the Viewport around the given y-value
	 * @param  {number} y - Y-Coordinate
	 */
	centerViewportY(y){
		y -= this.canvas.height / 2;
		this.setViewportY(y);
	}

	/**
	 * Sets the viewport origin to the given point
	 * @param  {number} x - X-Coordinate
	 * @param  {number} y - Y-Coordinate
	 */
	setViewport(x, y){
		this.setViewportX(x);
		this.setViewportY(y);
	}

	/**
	 * Sets the viewport x-origin to given value
	 * @param  {number} x - X-Coordinate
	 */
	setViewportX(x){
		this.viewport.x = x;
	}

	/**
	 * Sets the viewport y-origin to given value
	 * @param  {number} y - Y-Coordinate
	 */
	setViewportY(y){
		this.viewport.y = y;
	}

	/**
	 * Returns an Object containing the current Viewport data
	 * @return {Object}
	 */
	getViewport(){
		return {
			x: this.viewport.x,
			y: this.viewport.y,
			width: this.canvas.width,
			height: this.canvas.height
		};
	}

	/**
	 * Prepares user-input in the game engine
	 * @param  {Function} callback - Callback which gets called on every input
	 */
	allowInput(callback = function(){}){
		this.input = new Input();
		this.inputHandler = callback;
	}

	/**
	 * Adds a user-input event to the game engine
	 * @param {string} type - Event type
	 * @param {Element} element - DOM-Node where the EventListener will be applied
	 */
	addEvent(type, element){
		if (this.input === false) {
			throw new Error('To allow user Input on this game, call game.allowInput(callback);');
		}
		this.input.addEvent(type, element);
	}

	/**
	 * Starts the game process loop
	 */
	start(){
		this.running = true;
		this.loop();
	}

	/**
	 * Paused the game process loop
	 */
	pause(){
		this.running = false;
	}

	/**
	 * Main Process Loop, get called on every Frame
	 * @access private
	 */
	loop(){
		if (this.running) {
			let tick = Clock.tick() / 1000;
			this.processFrame(tick);
			this.renderFrame(tick);
			window.requestAnimationFrame(()=>{
				this.loop();
			});
		}
	}

	/**
	 * Processes the Physiks and Entity-Updates on every Tick
	 * @param  {int} time - Time passed since last Tick
	 * @access private
	 */
	processFrame(time){

		// Input Dispatch
		if (this.input) {
			this.input.forEach((e)=>{
				this.inputHandler(e, e.type);
			});
		}

		// Process
		this.entities.forEach((entity)=>{
			entity.processEffects();
			entity.process(time, this);
			entity.dispatchVector(time);
		});

		// Collision handler
		let collisions = [];
		this.entities.forEach((entity, index)=>{
			collisions[index] = entity.checkCollisions(this.entities, index, collisions);
		});

		this.entities.forEach((entity)=>{
			entity.afterProcess(time, this);
		});
	}

	/**
	 * Processes the Rendering for every Entity on every Tick
	 * @param  {int} time - Time passed since last Tick
	 * @access private
	 */
	renderFrame(time){
		this.clearCanvas();
		this.entities.forEach((entity)=>{
			entity.renderEffects();
			entity.draw(this);
			if (this.debug.hitboxes) {
				entity.drawHitboxes(this)
			}
		});
	}

	/**
	 * Fixes the canvas scaling problem
	 */
	alignCanvas(){
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
	}

	/**
	 * Clears the canvas in preparation for the next frame
	 */
	clearCanvas(){
		this.ctx.beginPath();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Draws an image on the canvas
	 * @param  {Image} img - The image to draw
	 * @param  {number} [sx] - the cropped x-coordinate
	 * @param  {number} [sy] - the cropped y-coordinate
	 * @param  {int} [sw] - the cropped image parts width
	 * @param  {int} [sh] - the cropped image parts height
	 * @param  {number} x - the x-coordinate to draw
	 * @param  {number} y - the y-coordinate to draw
	 * @param  {int} w - the images width
	 * @param  {int} h - the images height
	 */
	draw(img, sx, sy, sw, sh, x, y, w, h,){
		if (img) {
			x -= this.viewport.x;
			y -= this.viewport.y;
			this.ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
		}
	}

	/**
	 * Draws a rectangle on the canvas
	 * @param  {number} x - the x-coordinate
	 * @param  {number} y - the y-coordinate
	 * @param  {int} width - Rectangle width
	 * @param  {int} height - Rectangle heigh
	 */
	drawRect(x, y, width, height){
		x -= this.viewport.x;
		y -= this.viewport.y;
		this.ctx.beginPath();
		this.ctx.rect(x, y, width, height);
		this.ctx.strokeStyle="#FF0000";
		this.ctx.stroke();
	}

	/**
	 * Checks if the given entity is allready registered in this game
	 * @param  {Entity} entity - The entity to look for in the game
	 * @return {Boolean}
	 */
	hasEntity(entity){
		return this.entities.indexOf(entity) >= 0;
	}

	/**
	 * Adds the given entity to this game
	 * @param {Entity} entity - The new entity in the game
	 * @return {Boolean} Returns false if the entity has already been added
	 */
	addEntity(entity){
		if (!this.hasEntity(entity)) {
			this.entities.push(entity);	
			return true;
		}
		return false;		
	}

	/**
	 * Removes the given entity from this game
	 * @param  {Entity} entity - The entity to remove from the game
	 * @return {Boolean} Returns false if the entity could not be removed
	 */
	removeEntity(entity){
		let index = this.entities.indexOf(entity)
		if (index >= 0) {
			this.entities.splice(index, 1);
			return true;
		}
		return false;
	}
}

export default Engine;