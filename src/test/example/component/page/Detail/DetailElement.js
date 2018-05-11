import {PageElement} from '/index.js';

/**
 * App element
 */
class DetailElement extends PageElement {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Handler of the connected event
   * @param {*} args
   */
  connectedCallback() {
    console.log('Detail Page element added to the DOM');
  }
}

customElements.define('page-detail', DetailElement);

export default DetailElement;
