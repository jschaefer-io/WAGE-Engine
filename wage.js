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
import EntityCollector from './class/class.entitycollector.js';
import Entity from './class/class.entity.js';
import Hitbox from './class/class.hitbox.js';
import TexLoader from './class/class.texloader.js';
import Texture from './class/class.texture.js';
import Input from './class/class.input.js';
import Queue from './class/class.queue.js';

// Libs
import EaseVector from './lib/class.easevector.js';

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
		EntityCollector,
		TexLoader
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
		/**
		 * Effect Library
		 * @namespace WAGE.Library.Effects
		 */
		Effects: {
			EaseVector
		}
	}
};
export default WAGE;