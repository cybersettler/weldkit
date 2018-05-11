/**
 * Core API.
 * @namespace Core
 */

/* global HTMLElement */

import WebScope from './WebScope.js';
import NavigationService from '../service/NavigationService.js';

/**
 * Abstract controller extended by web-app element.
 * @constructor
 * @memberof Core
 * @param{ Array } args - The arguments.
 */
class AbstractWebElement extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.scope = new WebScope(this);
    window.addEventListener('hashchange',
        NavigationService.updatePage);
  }
}

export default AbstractWebElement;
