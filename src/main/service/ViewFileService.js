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
    let path = getModulePathFromTagName(element);
    let service = this;
    return this.load(`/frontend/component/${path}view.html`).
        then((result) => result, () => {
          return service.load(`/node_modules/${path}dist/view/view.html`);
        }).
        then((result) => result, () => {
          return service.load(`/node_modules/${path}view.html`);
        });
  },
};

/* eslint-disable require-jsdoc */

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
