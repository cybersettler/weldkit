# Ackee

> Create web and desktop applications using web components.

## Installation

```bash
cd myproject
npm install ackee
```

## Getting started

There are four base classes to create web components:

* _WebAppElement_: Used to create web applications
* _ElectronAppElement_: Used to create desktop applications
* _PageElement_: Used to create page elements
* _ViewElement_: Used to create view elements
* _FragmentElement_: Used to create fragment elements

All these are modules exported by the ackee module. These elements
are meant to be used in a hierarchical way, so the App element should
be at the at the root of the documents body.

```
body
|
+--> AppElement
      |
      +--> PageElement
            |
            +--> ViewElement
                 |
                 +--> FragmentElement
```

In this hierarchy view elements are optional, so a fragment element
may be a child of a page element. A fragment element would be for
example a table, a form, a list, in general, an HTML UI widget.
A view is a collection of fragments that work together. The page
element is used to hold an entire screen, so at any given time
only one page is active and visible to the user, who may navigate
between different screens to interact with the application.

To use a base element, simply import it and extend your class,
like so:

```javascript

// MyAppElement.js
import {WebAppElement} from 'npm_modules/ackee/index.js';

class MyAppElement extends WebAppElement {
  
  constructor() {
    super();
  }
  
  
}
```

All base element classes extend from HTMLElement class, so they
share the same API, which include HTML element lifecycle methods, such
as (see MDN guide: [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)):

* connectedCallback
* disconnectedCallback
* adoptedCallback
* attributeChangedCallback

Your element should be a module, so it has to be exported. But before
you should register it like so:

```javascript
customElements.define('web-app', MyAppElement);
```

