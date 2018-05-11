const ViewFileService = {
  load: function(href) {
    let link = document.createElement('link');
    link.rel = 'import';
    link.href = href;
    let promise = new Promise(function(fulfill) {
      link.addEventListener('load', function(){
        console.log('template loaded', link.import);
        fulfill(link.import);
      });
    });
    document.querySelector('head').appendChild(link);
    return promise;
  },
};

export default ViewFileService;