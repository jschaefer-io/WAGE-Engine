'use strict';

/**
 * Static time API for the WAGE Workflow
 * @memberof WAGE.API
 * @hideconstructor
 * @abstract
 */
class Clock{

	/**
	 * Makes this API abstract
	 */
	constructor(){
		if (this.constructor === Clock) {
			throw new Error('Clock is an abstract class and can not be instantiated.');
		}
	}

	/**
	 * Starts a new time-interval and returns the duration of the last one
	 * @return {int} Time passed since last tick
	 */
	static tick(){
		if (this.lastTick === undefined) {
			return 0;
		}
		else{
			let now = Clock.now(),
				diff = now - this.lastTick;
			this.lastTick = now;
			return diff;
		}
	}

	/**
	 * Gets the current systemtime
	 * @return {int} Current timestamp
	 */
	static now(){
		return Date.now();
	}
}

export default Clock;