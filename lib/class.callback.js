import Effect from '../class/class.effect.js';
import Curve from '../class/class.curve.js';


/**
 * An empty effect, for use as timed callback wrapper
 * @memberof WAGE.Library.Effects
 * @hideconstructor
 * @augments {WAGE.Core.Effect}
 */
class Callback extends Effect{

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
	 * Sets the target 
	 * @access private
	 */
	dispatch(){
		return;
	}

	/**
	 * This effect does not need any resets
	 * @access private
	 */
	reset(){return;}
}

export default Callback;