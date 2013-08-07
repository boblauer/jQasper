#jQasper

**jQasper** is a jQuery proxy for CasperJS.  It lets you write jQuery-style DOM manipulations in CasperJS.

##Installation

```
npm install jqasper
```

##Example Usage

```javascript
var casper = require('casper').create(),
	$ = require('jQasper').create(casper),

	url = 'http://localhost:8000/index.html';

casper.start(url);

casper.then(function() {

	var clickable = $('div').filter('.clickable');

	casper.test.assert(clickable.hasClass('active'), 'clickable element is initially active');

	clickable.click();

	casper.test.assert(clickable.is(':visible') === false, 'clickable element is now hidden');

	casper.test.assert($('body').children().length === 5, 'body children count test');
});

casper.run();
```

##What if jQuery isn't loaded?
If you're opening a webpage from CasperJS that doesn't have jQuery loaded, you can have CasperJS load it for you by following [these instructions](http://docs.casperjs.org/en/latest/faq.html#can-i-use-jquery-with-casperjs).