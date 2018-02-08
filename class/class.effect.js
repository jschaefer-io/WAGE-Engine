import Clock from './class.clock.js';

/**
 * Creates an Effect-Handler, which integrates into the WAGE Workflow
 */
class Effect{

	/**
	 * Construct the Texture
	 * @param  {int} [duration] - Time this effect will be applied
	 * @param {Function} callback - Function called, when the done() method is called or when the Effect is flagged as removed
	 */
	constructor(duration = 0, callback = ()=>{}){	
		this.data = {};

		this.remove = false;
		this.duration = duration;
		this.timings = {};
		this.start = undefined;
		this.callback = callback;
	}

	/**
	 * Calls the in the constructor given callback when called or after the Effect is beeing removed
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
	 * @return {Boolean}
	 */
	onRender(){
		return false;
	}

	/**
	 * True if this effect should be executed on the computation-process
	 * @abstract
	 * @return {Boolean}
	 */
	onProcess(){
		return false;
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
	 * @param  {Object} frame - Current frame object
	 */
	tick(entity, frame){
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
	 * @param  {Entity} entity - Entity this effect is applied to
	 * @param  {Object} frame - Current frame object
	 */
	dispatch(entity, frame){}

	/**
	 * Custom reset if the duration ends. Is meant to reset modifications on the entity or frame object.
	 * @param  {Entity} entity - Entity this effect is applied to
	 * @param  {Object} frame - Current frame object
	 */
	reset(entity, frame){};
}

export default Effect;