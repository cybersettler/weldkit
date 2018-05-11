/* global HTMLElement */

import ElectronScope from './ElectronScope.js';

/**
 * Base class to be extended by electron app elements.
 */
class ElectronAppElement extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
        super();
        this.scope = new ElectronScope(this);
    }
}

export default ElectronAppElement;
