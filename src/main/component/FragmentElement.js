import FragmentScope from './FragmentScope.js';

/* global HTMLElement */

const dataAttrPattern = /data-(\w+)/;

/**
 * Base class extended by fragment elements
 */
class FragmentElement extends HTMLElement {
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

export default FragmentElement;
