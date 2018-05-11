import AbstractScope from './xAbstractScope.js';

/**
 * Scope used by view elements
 */
class ViewScope extends AbstractScope {
  /**
   * @constructor
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
  }

  /**
   * Returns the page component
   * @return {Element | null}
   */
  getPage() {
    return document.querySelector('[data-role=page]');
  }
}

export default ViewScope;
