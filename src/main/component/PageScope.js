import Scope from './Scope.js';

/**
 * Scope used in Page elements
 */
class PageScope extends Scope {
  /**
   * @constructor
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
    onPageNodeConnected(currentElement)
        .then(() => currentElement.dataset.role = 'page');
  }
}

// Private functions
/* eslint-disable require-jsdoc */
function onPageNodeConnected(page) {
  let app = document.querySelector('[data-role=app]');

  var observerOptions = {
    childList: true,
    attributes: false,
    subtree: false,
  };

  return new Promise((resolve) => {
    let observer = new MutationObserver((mutationList, ob) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === 'childList' &&
            containsPageNode(mutationList, page)) {
          /* One or more children have been added to and/or removed
             from the tree; see mutation.addedNodes and
             mutation.removedNodes */
          observer.disconnect();
          resolve();
        }
      });
    });
    observer.observe(app, observerOptions);
  });
}

function containsPageNode(mutationList, page) {
  let found;
  if (mutationList.length) {
    found = Array.from(mutationList[0].addedNodes)
      .find((node) => node.nodeName === page.nodeName);
  }
  return typeof found !== 'undefined';
}

/* eslint-enable require-jsdoc */

export default PageScope;