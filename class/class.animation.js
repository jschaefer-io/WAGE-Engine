'use strict';

/**
 * Creates an Animation-Handler, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 */
class Animation{

	/**
	 * Sets the static Member variables
	 * @access private
	 */
	static setModes(){

		/**
		 * Animation Mode: Normal
		 */
		this.NORMAL = 0;

		/**
		 * Animation Mode: Reverse
		 */
		this.REVERSE = 1;

		/**
		 * Animation Mode: Alternate
		 */
		this.ALTERNATE = 2;
	}

	/**
	 * Construct the Animation
	 * @param  {Texture} texture - The Texture to use in this Animation
	 */
	constructor(texture){
		Animation.setModes();
		this.texture = texture;
		this.frames = [];
		this.count = 0;
		this.current = this.count;
		this.tick = 0;
		
		this.mode = Animation.NORMAL;
		this.repeat = -1;
		
		this.direction = true;
		this.loops = 0;
		this.done = false;
	}

	/**
	 * Updates the animation mode
	 * @param {int} mode - The new mode
	 * @see Member Variables
	 */
	setMode(mode){
		this.mode = mode;
		this.reset();
	}

	/**
	 * Updates the repeat count
	 * @param {int} count - The new animation count
	 */
	setRepeat(count){
		this.repeat = count;
	}

	/**
	 * Resets the Animation to the first Position
	 */
	reset(){
		switch(this.mode){
			case Animation.NORMAL:
				this.count = 0;
				break;
			case Animation.REVERSE:
				this.count = this.frames.length -1
				break;
			case Animation.ALTERNATE:
				this.count = 0;
				break;
		}
		this.done = false;
		this.loops = 0;
		this.tick = 0;		
	}

	/**
	 * Adds a frame to the Animation
	 * @param {Object} data - The frames data
	 * @param {int} delay - Time this frame is shown
	 */
	addFrame(data, delay){
		data = Object.assign({
			x: 0,
			y: 0,
			offset: {
				x: 0,
				y: 0
			},
			height: 0,
			width: 0,
			hitbox: false
		}, data);
		this.frames.push({
			data: data,
			delay: delay 
		});
		this.reset();
	}

	isDone(){
		return this.done;
	}

	/**
	 * Updates the current frame according to the time passed and returns the next frame
	 * @param  {int} time - Current time stamp
	 * @return {Object} The current animation frame object
	 */
	next(time){
		// console.log('test');
		if (this.frames.length > 0 && time >= this.tick && !this.done) {
			if (this.repeat !== -1 && this.loops >= this.repeat) {
				this.done = true;
			}
			let frame = this.frames[this.count];
			this.tick = time + frame.delay;
			this.current = this.count;
			this.advandeFrame();
			return frame;
		}
		return this.frames[this.current];
	}

	/**
	 * Advance one step in the animation
	 * @access private
	 */
	advandeFrame(){
		switch(this.mode){
			case Animation.NORMAL:
				this.count++;
				if (this.count === this.frames.length) {
					this.loops++;
				}
				break;
			case Animation.REVERSE:
				this.count += this.frames.length - 1;
				if (this.count === this.frames.length) {
					this.loops++;
				}
				break;
			case Animation.ALTERNATE:
				if (this.direction && this.mode === Animation.ALTERNATE) {
					this.count++
					if (this.count == this.frames.length - 1) {
						this.direction = false;
					}
				}
				else{
					this.count--;
					if (this.count == 0) {
						this.direction = true;
					}
				}
				if (this.count === 0) {
					this.loops++;
				}
				break;
		}
		this.count %= this.frames.length;
	}
}

export default Animation;