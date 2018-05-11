import {AbstractPageElement} from '/index.js';

/**
 * App element
 */
class DetailElement extends AbstractPageElement {
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
