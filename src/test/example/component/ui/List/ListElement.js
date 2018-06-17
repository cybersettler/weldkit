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
      result.forEach((text, i) => {
        let item = document.createElement('li');
        let a = document.createElement('a');
        a.href = '#page-detail--'+i;
        a.textContent = scope.templateEngine.render(text);
        item.appendChild(a);
        list.appendChild(item);
      });
      element.appendChild(list);
    });
  }
}

customElements.define('ui-list', ListElement);

export default ListElement;
