import PageScope from './PageScope.js';

/* eslint-env browser */

/**
 * Base class used by page elements
 */
class PageElement extends HTMLElement {
  /**
   * @constructs {PageElement}
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

export default PageElement;
