import Scope from './Scope.js';

const viewPattern = /^view-/;

/**
 * Scope used in Fragment elements
 */
class FragmentScope extends Scope {
  /**
   * @constructs FragmentScope
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
    currentElement.addEventListener('render', function() {
      if (currentElement.render) {
        currentElement.render();
      }
    });
  }

  /**
   * Returns the page component
   * @return {Element | null}
   */
  getPage() {
    return document.querySelector('[data-role=page]');
  }

  /**
   * Returns the view to which this component belongs.
   * @return { HTMLElement | Element | null} The HTML element.
   */
  getParentView() {
    let e = this.getCurrentElement();
    while (e && !isViewComponent(e)) {
      if (e.parentNode) {
        e = e.parentNode;
      } else {
        e = e.host;
      }
    }
    return e ? e : this.getPage();
  }
}

function isViewComponent(el) { // eslint-disable-line require-jsdoc
  return el.tagName && viewPattern.test(el.tagName.toLowerCase());
}

export default FragmentScope;
