import WebScope from './WebScope.js';

/**
 * Scope used in electron elements
 */
class ElectronScope extends WebScope {
    /**
     * @constructor
     * @param {HTMLElement} currentElement
     */
    constructor(currentElement) {
        super(currentElement);
        this.menu = {};
    }

    /**
     * Instantiates an Electron remote Menu.
     * @return {Object} Electron Menu instance.
     */
    getMenuInstance() {
        const Menu = require('electron').remote.Menu;
        return new Menu();
    }

    /**
     * Sets the app menu form a template.
     * @param{ Array } template - Generally,
     * the template is just an array of options for constructing a MenuItem.
     * @return { Object } This.
     */
    setMenuFromTemplate(template) {
        const Menu = require('electron').remote.Menu;
        let menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
        this.menu = menu;
        return this;
    }

    /**
     * Sets the app menu.
     * @param { Object } menu - The app menu,
     * an instance of electron.remote.Menu.
     * @return { Object } This.
     */
    setMenu(menu) {
        const Menu = require('electron').remote.Menu;
        Menu.setApplicationMenu(menu);
        this.menu = menu;
        return this;
    }

    /**
     * Load resource bundle to use in translations.
     * @param { string } locale - locale
     * @param { namespace } namespace - namespace
     * @return { Promise } A promise.
     */
    loadResource(locale, namespace) {
        return this.resourceBundleManager.loadResource(locale, namespace);
    }
}

export default ElectronScope;
