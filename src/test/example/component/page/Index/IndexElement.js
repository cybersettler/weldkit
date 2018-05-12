import {PageElement} from '/index.js';

/**
 * App element
 */
class IndexElement extends PageElement {
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
    console.log('Index Page element added to the DOM');
  }

  /**
   * Get records
   * @return {Array}
   */
  getRecords() {
    return [
        "{{i18n 'fruit.apple'}}",
      "{{i18n 'fruit.banana'}}",
      "{{i18n 'fruit.coconut'}}"
    ];
  }
}

customElements.define('page-index', IndexElement);

export default IndexElement;
