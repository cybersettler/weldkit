/* eslint-env browser */

import BindingMethodNameService from './BindingMethodNameService.js';
import ApiBinding from './ApiBinding.js';

const BackendPattern = /^\//;
const attributeValueApiPattern = /^{\w+}$/;

/**
 * API service module.
 * @module frontend/service/ApiService
 */
let ApiService = {
  bindAttribute: function(attributeName, scope) {
    let attributeValue = scope.getCurrentElement().dataset[attributeName];
    if (BackendPattern.test(attributeValue)) {
      augmentScopeWithBackendBindings(attributeName, attributeValue, scope);
    } else if (attributeValueApiPattern.test(attributeValue)) {
      augmentScopeWithBindingMethods(attributeName, attributeValue, scope,
          scope.getParentView());
    } else {
      aumentScopeWithGetterMethod(attributeName, attributeValue, scope);
    }
  },
  bindAttributes: function(attributeList, scope) {
    let service = this;
    attributeList.forEach(function(attributeName) {
      service.bindAttribute(attributeName, scope);
    });
  },
};

/* eslint-disable require-jsdoc */
function aumentScopeWithGetterMethod(attributeName, attributeValue, scope) {
  let getter = BindingMethodNameService.getBindingMethodNames(
      attributeName).getterName;
  scope[getter] = function() {
    return Promise.resolve(attributeValue);
  };
}

function augmentScopeWithBindingMethods(
    attributeName, attributeValue, scope, parentView) {
  let binding = new ApiBinding(attributeName, attributeValue, parentView);

  scope[binding.getterName] = function() {
    return binding.getter();
  };
  scope[binding.setterName] = function(data) {
    return binding.setter(data);
  };
  scope[binding.creatorName] = function(data) {
    return binding.creator(data);
  };
  scope[binding.updaterName] = function(data) {
    return binding.updater(data);
  };
  scope[binding.removerName] = function(data) {
    return binding.remover(data);
  };
  scope[binding.onName] = function(data) {
    return binding.on(data);
  };
}

function augmentScopeWithBackendBindings(attributeName, attributeValue, scope) {
  let url = attributeValue;
  let binding = BindingMethodNameService.getBindingMethodNames(attributeName);

  scope[binding.getterName] = function(data) {
    return scope.sendGetRequest(url, data).then(function(response) {
      return response.body;
    });
  };
  scope[binding.setterName] = function(data) {
    return scope.sendPutRequest(url, data);
  };
  scope[binding.creatorName] = function(data) {
    return scope.sendPostRequest(url, data);
  };
  scope[binding.updaterName] = function(data) {
    return scope.sendPatchRequest(url, data);
  };
  scope[binding.removerName] = function() {
    return scope.sendDeleteRequest(url);
  };
}
/* eslint-enable require-jsdoc */

export default ApiService;
