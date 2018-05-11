let instance;

/**
 * Service to get the TemplateEngine instance
 * @type {SingletonServiceInterface}
 */
let TemplateEngineService = {
  getInstance: function() {
    let result;
    if (!instance) {
      result = System.import('handlebars').then(function(Handlebars) {
        instance = new TemplateEngine(Handlebars.default);
      });
    } else {
      result = Promise.resolve(instance);
    }
    return result;
  },
};

/**
 * Wrapper class for template engine implementation
 */
class TemplateEngine {
  /**
   * @constructor
   * @param {object} Handlebars
   */
  constructor(Handlebars) {
    this.hb = Handlebars;
  }

  /**
   * Render function
   * @param {string} template
   * @param {Object} data
   * @return {string}
   */
  render(template, data) {
    let doRender = this.hb.compile(template);
    return doRender(data);
  }

  /**
   * Compile function
   * @param {string} template
   * @return {function} Render function
   */
  compile(template) {
    return this.hb.compile(template);
  }

  /**
   * Register helper for template engine
   * @param {string} name
   * @param {function} f
   */
  registerHelper(name, f) {
    this.hb.registerHelper(name, f);
  }
}

export default TemplateEngineService;
