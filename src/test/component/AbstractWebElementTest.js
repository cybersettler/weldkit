describe('AbstractWebElement', () => {
  'use strict';

  before(function(done) {
    // add fixtures
    console.log('location href', window.location.href);
    done();
  });

  after(function() {
    console.log('Test finished');
  });

  beforeEach(function(done) {
    window.SystemJS.config({
      baseURL: '/node_modules',
      map: {
        handlebars: 'handlebars/dist/handlebars.js',
      },
    });
    console.log('done with setup');
    done();
  });

  describe('view', () => {
    it('has header', (done) => {
      // let header = document.querySelector('h1');
      // should.exist(header);
      // console.log('header:', header.textContent);
      window.System.import('handlebars').then((module) => {
         should.exist(module);
         done();
      }, (err) => {
        console.error('something went wrong');
        done(err);
      });
    });
  });
});