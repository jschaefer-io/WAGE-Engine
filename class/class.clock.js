'use strict';

/**
 * Static time API for the WAGE Workflow
 * @memberof WAGE.API
 * @hideconstructor
 */
class Clock{

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