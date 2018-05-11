/**
 * view API.
 * @namespace View
 */

import PageScope from './PageScope.js';

/* eslint-env browser */

/**
 * Abstract controller extended by page elements
 * @constructor
 * @param { Array } args - The arguments.
 */
class AbstractPageElement extends HTMLElement {
  /**
   * @constructs {AbstractPageElement}
   */
  constructor() {
    super();
    this.scope = new PageScope(this);
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

export default AbstractPageElement;
