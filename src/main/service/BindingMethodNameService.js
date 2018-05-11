/* eslint-env browser */

import StringUtil from '../util/StringUtil.js';

/**
 * Element parent binding meant to be used in a child component.
 * @module frontend/service/BindingMethodNameService
 */
let BindingMethodNameService = {
  getBindingMethodNames: function(attributeName) {
    let name = StringUtil.capitalize(attributeName);
    return {
      getterName: 'get' + name,
      setterName: 'set' + name,
      creatorName: 'create' + name,
      updaterName: 'update' + name,
      removerName: 'remove' + name,
      onName: 'on' + name,
    };
  },
};

export default BindingMethodNameService;
