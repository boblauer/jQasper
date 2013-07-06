#Casper-jQuery

**Casper-jQuery** is a jQuery proxy for CasperJS.  It lets you write jQuery-style DOM manipulations in CasperJS.

##Installation

```
npm install casper-jquery
```

##Example Usage

```javascript
var casper = require('casper').create(),
	$ = require('casper-jquery').create(casper),

	url = 'http://localhost:8000/index.html';

casper.start(url);

casper.then(function() {

	var clickable = $('div').filter('.clickable');

	casper.test.assert(clickable.hasClass('active'), 'clickable element is initially active');

	clickable.click();

	casper.test.assert(clickable.is(':visible') === false, 'clickable element is now hidden');

	clickable.click();

	casper.test.assert($('body').children().length === 5, 'body children count test');
});

casper.run();
```

##What if jQuery isn't loaded?
If you're opening a webpage from CasperJS that doesn't have jQuery loaded, you can have CasperJS load it for you by following [these instructions](http://casperjs.org/faq.html#faq-jquery).

##Limitations
Because all of the jQuery-like code runs inside of [CasperJS's evaluate function](http://casperjs.org/api.html#casper.evaluate), it is running in a different context than the rest of the code.  This means that code like this:
```javascript
casper.then(function() {
	function myButtonHandler() {
		console.log('My button was clicked!');
	}

	$('#myButton').on('click', myButtonHandler);
});
```
won't work, because myButtonHandler doesn't exist inside of the page you have navigated to.  It only exists within the PhantomJS and CasperJS environment.

