'use strict';

/**
 * Collection API for entities for the WAGE Workflow
 * @memberof WAGE.API
 * @hideconstructor
 */
class EntityCollector{

	/**
	 * Constructs the Entity Collector
	 */
	constructor(){
		this._count = 0;
		this._names = [];
	}

	/**
	 * Adds a new entity template to the collector
	 * @param  {string} name - The entitys name
	 * @param  {class} obj - The entitys callable class
	 */
	new(name, obj){
		this[name] = obj;
		this._count++;
		this._names.push(name);
	}

	/**
	 * Returns the current template count
	 * @return {int}
	 */
	length(){
		return this._count;
	}

	/**
	 * Returns an object containing all currently registered templates
	 * @return {object}
	 */
	all(){
		let collection = {};
		this._names.forEach((name)=>{
			collection[name] = this[name];
		});
		return collection;
	}
}

export default EntityCollector;