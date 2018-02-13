'use strict'

/**
 * Common collision dispatches
 * @memberof WAGE.Library
 * @hideconstructor
 */
class Collisions{
	/**
	 * Makes this API abstract
	 */
	constructor(){
		if (this.constructor === Curve) {
			throw new Error('Collisions is an abstract class and can not be instantiated.');
		}
	}

	/**
	 * Calculates the min x and y offset
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @return {object} Object containing min x and y offset
	 */
	static collideCalcValues(calculations){
		return {
			x: Math.min(calculations[1], calculations[3]),
			y: Math.min(calculations[0], calculations[2])			
		};
	}

	/**
	 * Makes the given entity not pass the current entity at all
	 * @param  {Entity} entity - Entity which can not pass at all
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromAll(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		this.solidFromRight(entity, direction, calculations, threshold, calculations);
		this.solidFromLeft(entity, direction, calculations, threshold, calculations);
		this.solidFromTop(entity, direction, calculations, threshold, calculations);
		this.solidFromBottom(entity, direction, calculations, threshold, calculations);
	}

	/**
	 * Makes the given entity not pass the current entity from the left or right
	 * @param  {Entity} entity - Entity which can not pass from the left or right
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromHorizontal(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		this.solidFromRight(entity, direction, calculations, threshold, calculations);
		this.solidFromLeft(entity, direction, calculations, threshold, calculations);
	}

	/**
	 * Makes the given entity not pass the current entity from the top or bottom
	 * @param  {Entity} entity - Entity which can not pass from the top or bottom
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromVertical(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		this.solidFromTop(entity, direction, calculations, threshold, calculations);
		this.solidFromBottom(entity, direction, calculations, threshold, calculations);
	}

	/**
	 * Makes the given entity not pass the current entity from the top
	 * @param  {Entity} entity - Entity which can not pass from the top
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromTop(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		if (direction.top && entity.vector[0] > 0 && calculations.y < threshold) {
			entity.y -= calculations.y;
		}
	}

	/**
	 * Makes the given entity not pass the current entity from the bottom
	 * @param  {Entity} entity - Entity which can not pass from the bottom
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromBottom(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		if (direction.bottom && entity.vector[2] > 0 && calculations.y < threshold) {
			entity.y += calculations.y;
		}
	}

	/**
	 * Makes the given entity not pass the current entity from the right
	 * @param  {Entity} entity - Entity which can not pass from the right
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromRight(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		if (direction.right && entity.vector[3] > 0 && calculations.x < threshold) {
			entity.x += calculations.x;
		}
	}

	/**
	 * Makes the given entity not pass the current entity from the left
	 * @param  {Entity} entity - Entity which can not pass from the left
	 * @param  {Object} direction - Direction Object given to the collision dispatcher
	 * @param  {array} calculations - Offset array given to the collision dispatcher
	 * @param  {Number} [threshold] - Max offset, where this handler applies
	 * @param {object} [calcValues] - Object containing min x and y offset
	 */
	static solidFromLeft(entity, direction, calculations, threshold = 10, calcValues = false){
		calculations = (calcValues)? calcValues : this.collideCalcValues(calculations);
		if (direction.left && entity.vector[1] > 0 && calculations.x < threshold) {
			entity.x -= calculations.x;
		}
	}
}

export default Collisions;