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
  var selectorTest = $('#selector_test');

  casper.test.begin('DOM Event Testing', 4, function(test) {

    clickTest.click().click();
    test.assert(clickTest.text() === '2', 'Click event fired twice');

    hoverTest.mouseover().mouseover();
    test.assert(hoverTest.text() === '2', 'Hover event fired twice');

    focusTest.focus().focus();
    test.assert(focusTest.val() === 'Focused', 'Focus test');

    focusTest.blur();
    test.assert(focusTest.val() === 'Not focused', 'Blur test');

    test.done();
  });

  casper.test.begin('jQuery selected testing', 4, function(test) {
    test.assert(selectorTest.children().length === 2, 'Child selector test');
    test.assert(selectorTest.children().first().children().length === 7, '$().first() test');
    test.assert(selectorTest.children().last().prop('tagName') === 'SPAN', '$().last() test');
    test.assert(selectorTest.children().end().attr('id') === 'selector_test', 'jQuery stack test');

    test.done();
  });
});

casper.then(function() {
  $('#submit_test').submit();
});

casper.then(function() {

  casper.test.begin('Navigation Testing', 1, function(test) {
    var clickTest = $('#click_test');

    test.assert(clickTest.text() === 'Click Test', 'Page has refreshed');
  });
})

casper.run();
