/**
* view API.
* @namespace View
*/

import ViewScope from './ViewScope.js';

/* eslint-env browser */

/**
* Abstract controller extended by ui controllers.
* @constructor
* @param { Array } args - The arguments.
*/
class AbstractViewElement extends HTMLElement {
  constructor() {
    super();
    this.scope = new ViewScope(this);
    this.dataset.role = 'view';
  }
  /**
   * Broadcasts a refresh event that triggers a render of all components
   * inside the view.
   */
  refresh() {
    var event = new Event('refresh');
    this.dispatchEvent(event);
  }
}

export default AbstractViewElement;
