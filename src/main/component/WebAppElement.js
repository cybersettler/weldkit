import WebScope from './WebScope.js';
import NavigationService from '../service/NavigationService.js';

/* global HTMLElement */

/**
 * Base class to be extended by web app elements
 */
class WebAppElement extends HTMLElement {
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

export default WebAppElement;
