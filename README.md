# DM Ajax Loader v1.0.0

This lib allows you to include internal and external files/sources into your html DOM.

## Usage

```html
<div class="ajax" data-source="http://www.diegomengarda.com.br/api/ajax.php"></div>
```
```javascript
var ajaxLoader = new DmAjaxLoader('.ajax');
```

#### Custom Options

```html
<div class="ajax"></div>
```
```javascript
var ajaxLoader = new DmAjaxLoader('.ajax', {
	method: 'POST',
	source: 'http://www.diegomengarda.com.br/api/ajax.php'
	params: {
		name: 'test',
		value: 200
	}
});
```