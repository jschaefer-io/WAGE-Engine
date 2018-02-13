'use strict';

/**
 * The WAGE Engine
 * @namespace WAGE
 */

// Base
import Animation from './class/class.animation.js';
import Clock from './class/class.clock.js';
import Curve from './class/class.curve.js';
import Effect from './class/class.effect.js';
import Engine from './class/class.engine.js';
import Collector from './class/class.collector.js';
import Entity from './class/class.entity.js';
import Hitbox from './class/class.hitbox.js';
import Loader from './class/class.loader.js';
import Texture from './class/class.texture.js';
import Sound from './class/class.sound.js';
import Input from './class/class.input.js';
import Queue from './class/class.queue.js';

// Libs
import EaseVector from './lib/class.easevector.js';
import Gravity from './lib/class.gravity.js';
import Callback from './lib/class.callback.js';
import Collisions from './lib/class.collisions.js';
import Group from './lib/class.group.js';


const WAGE = {

	Engine,

	/**
	 * Core Elements of the WAGE-ENGINE
	 * @namespace WAGE.Core
	 */
	Core: {
		Animation,
		Entity,
		Hitbox,
		Sound,
		Texture,
		Input,
		Effect
	},
	/**
	 * Major APIs of the WAGE-Engine
	 * @namespace WAGE.API
	 */
	API: {
		Clock,
		Curve,
		Collector,
		Loader
	},
	/**
	 * General Helpers of the WAGE-Engine
	 * @namespace WAGE.Helper
	 */
	Helper: {
		Queue
	},

	/**
	 * Library of often used Patterns
	 * @namespace WAGE.Library
	 */
	Library: {
		
		Collisions,
		Group,
		

		/**
		 * Effect Library
		 * @namespace WAGE.Library.Effects
		 */
		Effects: {
			EaseVector,
			Gravity,
			Callback
		}
	}
};
export default WAGE;