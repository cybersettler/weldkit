import {AbstractWebElement} from '/index.js';

/**
 * App element
 */
class AppElement extends AbstractWebElement {
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
    console.log('App element added to the DOM');
    let scope = this.scope;
    scope.onDocumentLoadComplete()
    .then(()=> {
      return scope.loadMessageResource(
          'en', 'translation', 'assets/locales/en/translation.json');
    })
    .then(() => {
      scope.resolveAppReady();
    }, (err) => {
            throw new Error(err);
    });
  }
}

customElements.define('web-app', AppElement);

export default AppElement;
