![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# <%= pkgName %>

A reusable chart module made with ❤️.

![](preview.png)

### Install
```bash
$ yarn add git+ssh://git@github.com:The-Politico/<%= pkgName %>
```

### Use

##### In the browser

Include any dependencies, your stylesheet and the minified bundle, which defines a global chart object, `<%= clsName %>`.

```html
<!-- head -->
<script src="https://cdn.jsdelivr.net/npm/babel-polyfill@6.26.0/dist/polyfill.min.js"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="chart.min.js"></script>
<link rel="stylesheet" type="text/css" href="styles.css">

<!-- body -->
<div id="<%= clsName %>-container"></div>

<script type="text/javascript">
var myChart = new <%= clsName %>();

myChart.create('#<%= clsName %>-container', data);
</script>
```
##### As a module

To use as a module, simply import the chart object:
```javascript
import <%= clsName %> from '<%= pkgName %>';
```


The chart object has three methods, one to create the chart, initially, another to update chart elements with new data, and one to resize the chart.

```javascript
const myChart = new <%= clsName %>();

// The create method needs a selection string, which will be parent
// to the chart elements, and a data array. You can also provide an
// optional properties object.

const props = {
  stroke: 'orange',
};

myChart.create('#chart', data, props);

// The update method takes new data to update chart elements.
myChart.update(newData);

// The resize method can be called at any point to update the chart's size.
myChart.resize();
```

To apply this chart's default styles when using SCSS, simply define the variable `$<%= clsName %>-container` to represent the ID or class of the chart's container(s) and import the `_chart.scss` partial.

```CSS
$<%= clsName %>-container: '#chart';

@import '~<%= pkgName %>/src/scss/chart';
```


### Developing the chart

Start developing:
```bash
$ yarn start
```

Build for production:
```bash
$ yarn build
```

Read [DEVELOPING](DEVELOPING.md) for more information on using this chart module pattern.
