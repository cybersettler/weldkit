import {FragmentElement} from '/index.js';

/**
 * List custom element
 */
class ListElement extends FragmentElement {
  /**
   * Get observed dynamic attributes.
   * If attributes are not specified here
   * the attributeChangedCallback wont be triggered
   * @return {string[]}
   */
  static get observedAttributes() {
    return ['data-model'];
  }
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Connected callback
   */
  connectedCallback() {
    console.log('List element attached');
    this.render();
  }

  /**
   * Render function
   */
  render() {
    let scope = this.scope;
    let element = this;
    let list = document.createElement('ul');
    list.slot = 'content';
    this.innerHTML = '';
    scope.getModel().then((result) => {
      result.forEach((text) => {
        let item = document.createElement('li');
        item.textContent = scope.templateEngine.render(text);
        list.appendChild(item);
      });
      element.appendChild(list);
    });
  }
}

customElements.define('ui-list', ListElement);

export default ListElement;
