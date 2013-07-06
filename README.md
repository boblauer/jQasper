#Casper-jQuery

**Casper-jQuery** is a jQuery proxy for CasperJS.  It lets you write jQuery-style DOM manipulations in Casper.


##Usage

'''javascript
var casper = require('casper').create(),
	$ = require('../libs/casper.jquery').create(casper),

	url = 'http://localhost:8000/index.html';

casper.start(url);

casper.then(function() {

	var clickable = $('div').filter('.clickable');

	casper.test.assert(clickable.hasClass('active'), 'clickable element is initially active');

	clickable.click();

	casper.test.assert(clickable.is(':visible') === false, 'clickable element is now hidden');

	clickable.click();

	casper.test.assert($('body').children().length === 5, 'body children test');
});

casper.run();
```

