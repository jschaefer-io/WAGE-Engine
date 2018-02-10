'use strict';

import Clock from './class.clock.js';

/**
 * Creates an Effect-Handler, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @abstract
 * @throws {Error} If this abstract class is instantiated
 */
class Effect{

	/**
	 * Construct the Texture
	 * @param  {int} [duration] - Time this effect will be applied
	 * @param {Function} [callback] - Function called, when the done() method is called or when the Effect is flagged as removed
	 */
	constructor(duration = 0, callback = ()=>{}){
		if (this.constructor === Effect) {
			throw new Error('Effect is an abstract class and can not be instantiated.');
		}

		this.data = {};
		this.remove = false;
		this.duration = duration;
		this.timings = {};
		this.start = undefined;
		this.callback = callback;
	}

	/**
	 * Calls the in the constructor given callback when called or after the Effect is beeing removed
	 * @access private
	 */
	done(){
		this.callback(this);
	}

	/**
	 * Updates the internal clock
	 * @access private
	 */
	prepare(){
		if (this.start === undefined) {
			this.start = Clock.now();
		}
		this.now = Clock.now() - this.start;
	}

	/**
	 * Updates the internal timings object according to the current clock time
	 * @access private
	 */
	prepareDuration(){
		if (this.timings.end === undefined) {
			this.timings.end = this.now + this.duration;
			this.timings.start = this.now;
			this.timings.duration = this.duration;
			this.timings.span = this.timings.end - this.timings.start;
		}
	}

	/**
	 * True if this effect should be executed on the render-process
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 * @return {Boolean}
	 */
	onRender(){
		throw new Error('The onRender method is abstract and needs to be implemented.');
	}

	/**
	 * True if this effect should be executed on the computation-process
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 * @return {Boolean}
	 */
	onProcess(){
		throw new Error('The onProcess method is abstract and needs to be implemented.');
	}

	/**
	 * Flags this effect to be deleted and prevents any further ticks
	 */
	delete(){
		this.remove = true;
		this.done();
	}

	/**
	 * Kicks off one tick of the effect. If the duration is set and exired, the effect will auto delete
	 * @param  {Entity} entity - Entity this effect is applied to
	 * @param  {Object} [frame] - Current frame object
	 * @access private
	 */
	tick(entity, frame = false){
		this.prepare();
		if (this.duration) {
			this.prepareDuration();
			if (this.now >= this.duration) {
				this.reset(entity, frame);
				this.delete();
				return;
			}
		}
		this.dispatch(entity, frame);
	}

	/**
	 * Custom operations to be executed on each tick.
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 * @param  {Entity} entity - Entity this effect is applied to
	 * @param  {Object} [frame] - Current frame object
	 */
	dispatch(entity, frame = false){
		throw new Error('The dispatch method is abstract and needs to be implemented.');
	}

	/**
	 * Custom reset if the duration ends. Is meant to reset modifications on the entity or frame object.
	 * @abstract
	 * @throws {Error} If this method is not implemented
	 * @param  {Entity} entity - Entity this effect is applied to
	 * @param  {Object} [frame] - Current frame object
	 */
	reset(entity, frame = false){
		throw new Error('The reset method is abstract and needs to be implemented.');
	};
}

export default Effect;