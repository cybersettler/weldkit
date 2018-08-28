import ViewFileService from '../service/ViewFileService.js';
import TemplateEngineService from '../service/TemplateEngineService.js';
import ApiService from '../service/ApiService.js';

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
      initializeLocalContext(this),
      initializeTemplateEngine(this),
    ];
    this.onAppReady = Promise.all(promises).then(function() {
      addTemplate(scope);
    }).catch((err) => {
      throw new Error(err);
    });
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
   * Returns the main html template of the component.
   * @return { Element | null } An html element.
   */
  getLightTemplate() {
    return this.localContext.querySelector('template.light');
  }

  /**
   * Returns the shadow html template of the component.
   * @return { Element | null } An html element.
   */
  getShadowTemplate() {
    return this.localContext.querySelector('template.shadow');
  }

  /**
   * Binds a data attribute from the element to a
   * parent element API.
   * @param {string} attributeName - Name of the attribute excluding the 'data-'
   * part.
   */
  bindAttribute(attributeName) {
    ApiService.bindAttribute(attributeName, this);
  };

  /**
   * Binds a list of data attributes from the element to a
   * parent element API.
   * @param {string[]} attributeList - An array of the attributes
   * excluding the 'data-' part.
   */
  bindAttributes(attributeList) {
    ApiService.bindAttributes(attributeList, this);
  };
}

// Private functions
/* eslint-disable require-jsdoc */
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
  let root;
  if (scope.getCurrentElement().attachShadowRoot) {
    root = scope.getCurrentElement().attachShadowRoot();
  } else {
    root = scope.getCurrentElement().createShadowRoot();
  }

  // Adds a template clone into shadow root
  let clone = document.importNode(shadowTemplate.content, true);
  root.appendChild(clone);
}

function addLightTemplate(lightTemplate, scope) {
  let clone = document.importNode(lightTemplate.content, true);
  scope.getCurrentElement().appendChild(clone);
}

function initializeLocalContext(scope) {
  let element = scope.getCurrentElement();
  return ViewFileService.loadTemplateForElement(element)
  .then(function(localContext) {
    scope.localContext = localContext;
  });
}

function initializeTemplateEngine(scope) {
  return TemplateEngineService.getInstance().then(function(service) {
    scope.templateEngine = service;
  });
}

/* eslint-enable require-jsdoc */

export default Scope;
