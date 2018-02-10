import Effect from '../class/class.effect.js';
import Curve from '../class/class.curve.js';


/**
 * Effect to ease between Vector values
 * @memberof WAGE.Library.Effects
 * @hideconstructor
 * @augments {WAGE.Core.Effect}
 */
class EaseVector extends Effect{

	/**
	 * This Process is only needed on the process run
	 * @return {Boolean}
	 * @access private
	 */
	onProcess(){
		return true;
	}

	/**
	 * This Process is not executed on the rendering run
	 * @return {Boolean}
	 * @access private
	 */
	onRender(){
		return false;
	}

	/**
	 * Transition from the old vector value to the new one over the given duration
	 * @access private
	 */
	dispatch(e, f){
		if (this.from === undefined) {
			this.from = e.vector[this.index];
			this.diff = this.to - this.from;
			this.target = e;
		}
		
		let impact = Curve.easeInOutCubic(1 - (this.timings.duration - this.now) / this.timings.duration);
		e.vector[this.index] = this.from + impact*this.diff;
	}

	/**
	 * This effect does not need any resets
	 * @access private
	 */
	reset(){return;}

	/**
	 * To be sure, after the duration is done, the target vector will be set to the target value
	 * @access private
	 */
	done(){
		this.target.vector[this.index] = this.to;
		super.done();
	}

	/**
	 * Sets the specific Target values. This function is required!
	 * @param {int} value - The target vector value
	 * @param {int} index - The vector index on the entity object, to be accessed by this filter
	 */
	setTarget(value, index){
		this.to = value;
		this.index = index;
	}
}

export default EaseVector;