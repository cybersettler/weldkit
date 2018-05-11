import TemplateEngineService from './TemplateEngineService.js';
import i18next from '../../../node_modules/i18next/dist/es/index.js';

/**
 * Manage resource boundles for tranlations.
 */
class ResourceBundleManager {
  /**
   * @constructor
   * @param {Scope} scope
   */
  constructor(scope) {
    this.scope = scope;
  }

  /**
   * Load resource boundle.
   * @param { string } locale - locale
   * @param { string } [namespace=translation] - namespace
   * @param { string } [url=/i18n/translation?locale=en] - resource url
   * @return { Promise } A promise.
   */
  loadResource(locale, namespace, url) {
    namespace = namespace || 'translation';
    let resourceUrl = url || '/i18n/' + namespace + '?locale=' + locale;
    let manager = this;
    return this.scope.sendGetRequest(resourceUrl)
      .then((result) => result.json())
      .then((result) => manager.setResource(locale, result, namespace));
  }

  setResource(locale, resource, namespace) {
    let config = {
      lng: locale,
      resources: {},
    };
    config.resources[locale] = {};
    namespace = namespace || 'translation';
    config.resources[locale][namespace] = resource;
    return TemplateEngineService.getInstance()
      .then(function(templateEngine) {
      i18next.init(config, (err, t) => {
        if (err) {
          throw new Error(err);
        }

        templateEngine.registerHelper('i18n', function(key, opt) {
          return t(key, opt);
        });
      });
    });
  }
}

export default ResourceBundleManager;
