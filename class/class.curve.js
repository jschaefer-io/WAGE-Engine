'use strict';

/**
 * Static bezier easing API for the WAGE Workflow
 * @memberof WAGE.API
 * @hideconstructor
 */
class Curve{

	/**
	 * Linear easing curve
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static linear(t) {
		return this.clean(t);
	}

	/**
	 * Quad easing curve (with ease-in)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInQuad(t) {
		return this.clean(t*t);
	}

	/**
	 * Quad easing curve (with ease-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeOutQuad(t) {
		return this.clean(t*(2-t));
	}

	/**
	 * Quad easing curve (with ease-in-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInOutQuad(t) {
		return this.clean(t<.5 ? 2*t*t : -1+(4-2*t)*t);
	}

	/**
	 * Cubic easing curve
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInCubic(t) {
		return this.clean(t*t*t);
	}

	/**
	 * Cubic easing curve (with ease-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeOutCubic(t) {
		return this.clean((--t)*t*t+1);
	}

	/**
	 * Cubic easing curve (with ease-in-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInOutCubic(t) {
		return this.clean(t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1);
	}

	/**
	 * Quart easing curve (with ease-in)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInQuart(t) {
		return this.clean(t*t*t*t);
	}

	/**
	 * Quart easing curve (with ease-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeOutQuart(t) {
		return this.clean(1-(--t)*t*t*t);
	}

	/**
	 * Quart easing curve (with ease-in-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInOutQuart(t) {
		return this.clean(t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t);
	}

	/**
	 * Quint easing curve (with ease-in)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInQuint(t) {
		return this.clean(t*t*t*t*t);
	}

	/**
	 * Quint easing curve (with ease-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeOutQuint(t) {
		return this.clean(1+(--t)*t*t*t*t);
	}

	/**
	 * Quint easing curve (with ease-in-out)
	 * @param  {number} t - Float from 0 to 1
	 * @return {number} The corresponding curved value
	 */
	static easeInOutQuint(t) {
		return this.clean(t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t);
	}

	/**
	 * Allows the given number to have a max value of 1 and a min value of 0
	 * @param  {number} t - Number to be cleaned
	 * @return {number} Cleaned number
	 */
	static clean(t){
		if (t >= 1) {
			return 1;
		}
		if(t <= 0){
			return 0;
		}
		return t;
	}
}

export default Curve;