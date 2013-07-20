var casper = require('casper').create({
      clientScripts: ['libs/jquery.min.js']
    }),
    $ = require('../../index').create(casper),

    url = 'http://localhost:8000/index.html';

casper.start(url);

casper.then(function() {
  var clickTest = $('#click_test');
  var hoverTest = $('#hover_test');
  var focusTest = $('#focus_test');
  var changeTest = $('#change_test');

  casper.test.begin('testing', 2, function(test) {

    clickTest.click().click();
    test.assert(clickTest.text() === '2', 'Click event fired twice');

    hoverTest.mouseover().mouseover();
    test.assert(hoverTest.text() === '2', 'Hover event fired twice');

    focusTest.focus();
    console.log(focusTest.val());
    test.assert(focusTest.val() === 'Focused', 'Focus test');

    focusTest.blur();
    test.assert(focusTest.val() === 'Not focused', 'Blur test');

    test.done();
  });
});

casper.run();
