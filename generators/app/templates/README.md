![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# <%= appName %>

Chart module for _{your chart type here}_.

![](preview.png)

## Install
```bash
$ npm install --save git+ssh://git@github.com:The-Politico/module_<%= appName %>
```

#### Requirements

This module uses ES6 syntax. To use as a pre-compiled module, you'll need a compiler like [babel](https://babeljs.io/).

## Use

In the client, include the `global-chart.js` bundle, which defines a global chart object, `<%= objName %>`:

```html
<script src="some/path/to/global-chart.js"></script>
```

To use as a module, simply import the chart object:
```javascript
import <%= objName %> from '<%= appName %>';
```


The chart object has three methods, one to create the chart, initially, another to update chart elements with new data, and one to resize the chart.

```javascript
var myChart = new <%= objName %>();

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

To apply this chart's default styles when using SCSS, simply define the variable `$<%= objName %>-container` to represent the ID or class of the chart's container(s) and import the `_chart-styles.scss` partial.

```CSS
$<%= objName %>-container: '#chart';

@import '../../node_modules/<%= appName %>/src/scss/_chart-styles';
```


### Developing the chart

See [DEVELOPING](DEVELOPING.md).
