import Scope from './Scope.js';

/**
 * Scope used by view elements
 */
class ViewScope extends Scope {
  /**
   * @constructor
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
    onViewNodeConnected(currentElement)
    .then(() => currentElement.dataset.role = 'view');
  }

  /**
   * Returns the page component
   * @return {Element | null}
   */
  getPage() {
    return document.querySelector('[data-role=page]');
  }
}

// Private functions
/* eslint-disable require-jsdoc */
function onViewNodeConnected(view) {
  let page = document.querySelector('[data-role=page]');

  let observerOptions = {
    childList: true,
    attributes: false,
    subtree: false,
  };

  return new Promise((resolve) => {
    let observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === 'childList' &&
            containsViewNode(mutationList, view)) {
          /* One or more children have been added to and/or removed
             from the tree; see mutation.addedNodes and
             mutation.removedNodes */
          observer.disconnect();
          resolve();
        }
      });
    });
    observer.observe(page, observerOptions);
  });
}

function containsViewNode(mutationList, view) {
  let found;
  if (mutationList.length) {
    found = Array.from(mutationList[0].addedNodes)
    .find((node) => node.nodeName === view.nodeName);
  }
  return typeof found !== 'undefined';
}

/* eslint-enable require-jsdoc */

export default ViewScope;
