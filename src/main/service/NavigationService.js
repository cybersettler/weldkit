const hashPattern = /^#((page-\w+-?\w*)(-{2}\w*)?)$/;

let NavigationService = {
  updatePage: function() {
    if (hashPattern.test(window.location.hash)) {
      let match = hashPattern.exec(window.location.hash);
      let pageId = match[1];
      let tagName = match[2];
      let app = document.querySelector('[data-role=app]');
      let currentPage = app.querySelector('[data-role=page]');
      app.removeChild(currentPage);
      let nextPage = document.createElement(tagName);
      nextPage.id = getPageId(pageId);
      nextPage.dataset.role = 'page';
      app.appendChild(nextPage);
    }
  },
};

export default NavigationService;
