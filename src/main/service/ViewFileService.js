import StringUtil from '../util/StringUtil.js';

const ViewFileService = {
  load: function(href) {
    let link = document.createElement('link');
    link.rel = 'import';
    link.href = href;
    let promise = new Promise(function(fulfill) {
      link.addEventListener('load', function() {
        console.log('template loaded', link.import);
        fulfill(link.import);
      });
    });
    document.querySelector('head').appendChild(link);
    return promise;
  },
  loadTemplateForElement: function(element) {
    return getModuleViewPath(element).then((path) => {
      return this.load(path);
    });
  },
};

/* eslint-disable require-jsdoc */

function getModuleViewPath(element) {
  let path = element.tagName.toLowerCase();
  let url = `/node_modules/${path}/dist/main/view/view.html`;
  let options = {
    method: 'HEAD',
  };
  return fetch(url, options).then((response) => {
    if (response.ok) {
      return response;
    } else {
      url = `/node_modules/${path}/view.html`;
      return fetch(url, options);
    }
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      path = getModulePathFromTagName(element);
      url = `/frontend/component/${path}view.html`;
      return fetch(url, options);
    }
  }).then(() => url);
}

function getModulePathFromTagName(element) {
  let parts = element.tagName.toLowerCase().split('-');
  return parts.reduce(function(result, item, index) {
    let part;
    if (index === 0) {
      part = item;
    } else {
      part = StringUtil.capitalize(item);
    }
    return result + part + '/';
  }, '');
}

/* eslint-enable require-jsdoc */

export default ViewFileService;
