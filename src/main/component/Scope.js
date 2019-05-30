import ViewFileService from '../service/ViewFileService.js';
import TemplateEngineService from '../service/TemplateEngineService.js';
import ApiService from '../service/ApiService.js';
import RestService from '../service/web/RestService.js';

const TemplatePattern = /^(<template>)|(<\/template>)$/g;
const ViewFilenamePattern = /(\w+)[.]html$/;

/**
 * This class is extended by scope classes
 */
class Scope {
  /**
   * @constructor
   * @param {HTMLElement} currentElement
   */
  constructor(currentElement) {
    let scope = this;
    this.getCurrentElement = function() {
      return currentElement;
    };
    let appReady = new Promise(function(fulfill) {
      let app = scope.getApp();
      if (app.dataset.status === 'ready') {
        fulfill();
      } else {
        app.addEventListener('appReady', fulfill);
      }
    });
    let promises = [
      appReady,
      initializeTemplateEngine(this),
    ];
    this.onAppReady = Promise.all(promises);
  }

  /**
   * Returns the app component
   * @return {Element | null}
   */
  getApp() {
    return document.querySelector('[data-role=app]');
  }

  /**
   * Sets the current page to the corresponding URL.
   * Google recommends using only hyphens as word
   * delimeters for element ids and classes
   * @see {@link https://google.github.io/styleguide/htmlcssguide.html#ID_and_Class_Name_Delimiters}
   * @param {string} pageName - The url of the view.
   * @param {string} id - An id to param to pass to the page
   */
  setPage(pageName, id) {
    let result = '#page-' + pageName;
    if (id) {
      result += '--' + id;
    }
    window.hash = result;
  }

  /**
   * Binds a data attribute from the element to a
   * parent element API.
   * @param {string} attributeName - Name of the attribute excluding the 'data-'
   * part.
   */
  bindAttribute(attributeName) {
    ApiService.bindAttribute(attributeName, this);
  }

  /**
   * Binds a list of data attributes from the element to a
   * parent element API.
   * @param {string[]} attributeList - An array of the attributes
   * excluding the 'data-' part.
   */
  bindAttributes(attributeList) {
    ApiService.bindAttributes(attributeList, this);
  }

  appendShadowViewFromTemplate(url) {
    let scope = this;
    return this.importTemplate(url).then((template) => {
      addShadowRootTemplate(template, scope);
      return template;
    });
  }

  appendViewFromTemplate(url) {
    let scope = this;
    return this.importTemplate(url).then((template) => {
      addLightTemplate(template, scope);
      return template;
    });
  }

  loadTemplate(url) {
    return RestService.getRepresentation(url).
        then(readResponseText).
        then(parseTemplateResource);
  }

  importTemplate(url) {
    let previouslyImportedTemplate = this.getTemplate(url);
    let result;
    let scope = this;
    if (previouslyImportedTemplate) {
      result = Promise.resolve(template);
    } else {
      result = this.loadTemplate(url).then((template) => {
        template.id = getTemplateId(url, scope);
        document.body.appendChild(template);
        return template;
      });
    }
    return result;
  }

  getTemplate(url) {
    let templateId = getTemplateId(url, this);
    return document.querySelector('#' + templateId);
  }

  getModuleDir() {
    let moduleName = this.getCurrentElement().tagName.toLowerCase();
    let found = Array
      .from(document.querySelectorAll('script[type=module]'))
      .find((item) => item.src.indexOf(moduleName) > -1);
    let result = '';
    if (found) {
      result = found.src.replace(/(\w+[.]js)$/, '');
    } else {
      result = '/';
    }
    return result;
  }

  importESModule(moduleName) {
    return System.import(moduleName);
  }
}

// Private functions
/* eslint-disable require-jsdoc */
function getTemplateId(url, scope) {
  let filename;
  if (ViewFilenamePattern.test(url)) {
    let match = ViewFilenamePattern.exec(url);
    filename = match.length === 2 ? match[1].toUpperCase() : '';
  } else {
    filename = '';
  }
  return `${scope.getCurrentElement().tagName}-${filename}-TEMPLATE`;
}

function readResponseText(response) {
  if (response.ok) {
    return response.text();
  } else {
    throw new Error('Something went wrong trying to fetch', response.url);
  }
}

function parseTemplateResource(htmlString) {
  let result = document.createElement('template');
  let content = htmlString.trim().replace(TemplatePattern, '');
  result.innerHTML = content;
  return result;
}

function addTemplate(scope) {
  let lightTemplate = scope.getLightTemplate();
  let shadowTemplate = scope.getShadowTemplate();
  if (lightTemplate) {
    addLightTemplate(lightTemplate, scope);
  } else if (shadowTemplate) {
    addShadowRootTemplate(shadowTemplate, scope);
  }
}

function addShadowRootTemplate(shadowTemplate, scope) {

  // Creates the shadow root
  let element = scope.getCurrentElement();
  let root = element.shadowRoot;
  if (!root && element.attachShadowRoot) {
    root = element.attachShadowRoot();
  } else if (!root && element.createShadowRoot) {
    root = element.createShadowRoot();
  } else if (element.attachShadow) {
    root = element.attachShadow({mode: 'open'});
  }

  // Adds a template clone into shadow root
  let clone = document.importNode(shadowTemplate.content, true);
  root.appendChild(clone);
}

function addLightTemplate(lightTemplate, scope) {
  let clone = document.importNode(lightTemplate.content, true);
  scope.getCurrentElement().appendChild(clone);
}

function initializeTemplateEngine(scope) {
  return TemplateEngineService.getInstance().then(function(service) {
    scope.templateEngine = service;
  });
}

/* eslint-enable require-jsdoc */

export default Scope;
