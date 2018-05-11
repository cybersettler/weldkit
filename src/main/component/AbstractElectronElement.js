/**
 * Core API.
 * @namespace Core
 */

/* global HTMLElement */

import ElectronScope from './ElectronScope.js';

/**
 * Abstract controller extended by core-app controller.
 * @constructor
 * @memberof Core
 * @param{ Array } args - The arguments.
 */
class AbstractElectronElement extends HTMLElement {
    constructor() {
        super();
        this.scope = new ElectronScope(this);
    }
}

export default AbstractElectronElement;
