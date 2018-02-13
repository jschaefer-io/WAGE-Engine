import Effect from '../class/class.effect.js';
import Curve from '../class/class.curve.js';


/**
 * Common Gravity Effect
 * @memberof WAGE.Library.Effects
 * @hideconstructor
 * @augments {WAGE.Core.Effect}
 */
class Gravity extends Effect{

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
	dispatch(e){
		e.vector[0] = this.strength;
	}

	/**
	 * This effect does not need any resets
	 * @access private
	 */
	reset(){return;}

	/**
	 * Sets the specific Target values. This function is required!
	 * @param {int} value - The target vector value
	 * @param {int} index - The vector index on the entity object, to be accessed by this filter
	 */
	setStrength(value){
		this.strength = value;
	}
}

export default Gravity;