/**
 * ui API.
 * @namespace UI
 */

/* global HTMLElement */

import FragmentScope from './FragmentScope.js';

const dataAttrPattern = /data-(\w+)/;

/**
 * Abstract controller extended by ui controllers.
 * @constructor
 */
class AbstractFragmentElement extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    let scope = new FragmentScope(this);
    let bindingAttributes = Object.keys(this.dataset);
    if (bindingAttributes && bindingAttributes.length > 0) {
      scope.bindAttributes(bindingAttributes);
    }
    this.scope = scope;
  }

  /**
   * Attribute changed callback
   * @param {string} name
   */
  attributeChangedCallback(name) {
    if (dataAttrPattern.test(name)) {
      let attr = dataAttrPattern.exec(name)[1];
      this.scope.bindAttribute(attr);
    }
  }
}

export default AbstractFragmentElement;
