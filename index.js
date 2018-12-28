import WebAppElement from './src/main/component/WebAppElement.js';
import PageElement from './src/main/component/PageElement.js';
import ViewElement from './src/main/component/ViewElement.js';
import FragmentElement from './src/main/component/FragmentElement.js';
import WebScope from './src/main/component/Scope.js';
import FragmentScope from './src/main/component/FragmentScope.js';

/* global SystemJS */
SystemJS.config({
  baseURL: '/node_modules',
  map: {
    handlebars: 'handlebars/dist/handlebars.js',
    i18next: 'i18next/i18next.js',
    d3: 'd3/dist/d3.min.js',
  },
});

export {
  WebAppElement,
  PageElement,
  ViewElement,
  FragmentElement,
  WebScope,
  FragmentScope,
};
