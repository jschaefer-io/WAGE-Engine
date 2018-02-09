'use strict';

/**
 * Standard Queue implementation in JavaScript
 * @memberof WAGE.Helper
 * @hideconstructor
 */
class Queue{

	/**
	 * Sets up the internal array
	 */
	constructor(){
		this.queue = [];
	}

	/**
	 * Adds an element to the queueu
	 * @param {mixed} el - new element
	 */
	add(el){
		this.queue.push(el);
	}

	/**
	 * Removes and returns the first element in the queue
	 * @return {mixed}
	 */
	remove(){
		return this.queue.splice(0,1);
	}

	/**
	 * Returns the first element in the queue, but does not remove it
	 * @return {mixed}
	 */
	peek(){
		return this.queue[0];
	}

	/**
	 * Returns the current queue size
	 * @return {int}
	 */
	size(){
		return this.queue.length;
	}

	/**
	 * Returns true if the queue is empty
	 * @return {Boolean}
	 */
	empty(){
		return this.size() === 0;
	}

	/**
	 * Removes every Element in the queue and calls the given callback for each element
	 * @param  {Function}
	 */
	forEach(callback){
		while(!this.empty()){
			callback(this.remove());
		}
	}
}
export default Queue;