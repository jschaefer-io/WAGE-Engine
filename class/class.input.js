'use strict';

import Queue from './class.queue.js';

/**
 * Creates a Input dispatcher, which integrates into the WAGE Workflow
 * @memberof WAGE.Core
 * @augments {WAGE.Helper.Queue}
 */
class Input extends Queue{
	/**
	 * Adds an Event to the Inputdispatcher
	 * @param {string} type - Event type
	 * @param {Element} node - DOM-Node where the EventListener will be applied
	 */
	addEvent(type, node){
		node.addEventListener(type, (e)=>{
			this.add(e);
		});
	}
}
export default Input;