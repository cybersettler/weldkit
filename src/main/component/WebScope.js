import Scope from './Scope.js';
import RestService from '../service/web/RestService.js';
import ResourceBundleManager from '../service/ResourceBundleManager.js';

/**
 * Scope used in WebElement classes
 */
class WebScope extends Scope {
  /**
   * @constructs WebScope
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    super(currentElement);
    this.resourceBundleManager = new ResourceBundleManager(this);
  }

  /**
   * Sends a GET request to the backend.
   * @param {string} url - A REST resource location.
   * @param {Object} filter - Filter object.
   * @return {Promise} A promise.
   */
  sendGetRequest(url, filter) {
    return RestService.getRepresentation(url, filter);
  }

  /**
   * Sends a post request to the backend.
   * @param {string} url - A REST resource location.
   * @param {Object} data - State to be tansfered.
   * @return {Promise} A promise.
   */
  sendPostRequest(url, data) {
    return RestService.postRepresentation(url, data);
  }

  /**
   * Sends a put request to the backend.
   * @param {string} url - A REST resource location.
   * @param {Object} data - State to be tansfered.
   * @return {Promise} A promise.
   */
  sendPutRequest(url, data) {
    return RestService.putRepresentation(url, data);
  }

  /**
   * Sends a patch request to the backend.
   * @param {string} url - A REST resource location.
   * @param {Object} data - State to be tansfered.
   * @return {Promise} A promise.
   */
  sendPatchRequest(url, data) {
    return RestService.patchRepresentation(url, data);
  }

  /**
   * Sends a delete request to the backend.
   * @param {string} url - A REST resource location.
   * @return {Promise} A promise.
   */
  sendDeleteRequest(url) {
    return RestService.deleteRepresentation(url);
  }

  /**
   * Load i18n resource
   * @param {string} locale
   * @param {string} namespace
   * @return {Promise}
   */
  loadMessageResource(locale, namespace, url) {
    return this.resourceBundleManager.loadResource(locale, namespace, url);
  }

  /**
   * Returns a promise that is resolved
   * when the readyState of the
   * document is complete
   * @return {Promise<any>}
   */
  onDocumentLoadComplete() {
    return new Promise(function(fulfill) {
      if (document.readyState === 'complete') {
        fulfill();
      } else {
        window.addEventListener('load', fulfill);
      }
    });
  }

  /**
   * To resolve the status of the App implies to things:
   * broadcasting the appReady event and setting the
   * appStatus to ready
   */
  resolveAppReady() {
    let app = this.getCurrentElement();
    let ready = new Event('appReady');
    app.dispatchEvent(ready);
    app.dataset.status = 'ready';
  }
}

export default WebScope;
