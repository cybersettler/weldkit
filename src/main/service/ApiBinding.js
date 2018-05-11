/**
 * Element parent binding meant to be used in a child component.
 * @module frontend/service/UpBinding
 */

/* eslint-env browser */

import BindingMethodNameService from './BindingMethodNameService.js';

const CustomMethodPattern = /^{(\w+)}$/;

/**
 * Instantiates a parent binding.
 */
class ApiBinding {
  /**
   * @constructor
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {HTMLElement} parentView
   */
  constructor(attributeName, attributeValue, parentView) {
    let modelName = CustomMethodPattern.exec(attributeValue)[1];
    this.parentView = parentView;
    let methodNames = BindingMethodNameService.getBindingMethodNames(
        attributeName);
    this.getterName = methodNames.getterName;
    this.setterName = methodNames.setterName;
    this.creatorName = methodNames.creatorName;
    this.updaterName = methodNames.updaterName;
    this.removerName = methodNames.removerName;
    this.onName = methodNames.onName;
    this.modelMethod = BindingMethodNameService.getBindingMethodNames(
        modelName);
  }

  /**
   * Getter function.
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  getter() {
    return invokeMethod(this.modelMethod.getterName, this.parentView);
  }

  /**
   * Setter function
   * @param {object|string|number|boolean} data
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  setter(data) {
    return invokeMethod(this.modelMethod.setterName, this.parentView, data);
  }

  /**
   * Event trigger function.
   * @param {Object|string|number|boolean} data - Data to be comunicated.
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  on(data) {
    return invokeMethod(this.modelMethod.onName, this.parentView, data);
  }

  /**
   * Creator function.
   * @param {Object|string|number|boolean} data - Data to be posted.
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  creator(data) {
    return invokeMethod(this.modelMethod.creatorName, this.parentView, data);
  }

  /**
   * Updater function.
   * @param {Object|string|number|boolean} data - Data to be updated.
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  updater(data) {
    return invokeMethod(this.modelMethod.updaterName, this.parentView, data);
  }

  /**
   * Remover function.
   * @param {Object|string|number|boolean} data - Data to be removed.
   * @return {Promise} A promise that resolves to the handler's return data.
   */
  remover(data) {
    return invokeMethod(this.modelMethod.removerName, this.parentView, data);
  }
}

/* eslint-disable require-jsdoc */
function invokeMethod(methodName, parentView, data) {
  let result = parentView[methodName](data);

  if (result && !result.then) {
    result = Promise.resolve(result);
  } else if (!result) {
    result = Promise.resolve();
  }

  return result;
}
/* eslint-enable require-jsdoc */

export default ApiBinding;
