import Scope from './Scope.js';

/**
 * Scope used in Page elements
 */
class PageScope extends Scope {
  /**
   * @constructor
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
  }
}

export default PageScope;