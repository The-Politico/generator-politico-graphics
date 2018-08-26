# Developing chart modules

### Theory

Read Mike Bostock's foundational doc, "[Towards Reusable Charts](https://bost.ocks.org/mike/chart/)."

This chart module pattern supplements Bostock's reusable proposal by emphasizing [idempotence](http://www.restapitutorial.com/lessons/idempotency.html) in the chart's render method. This means all state is external to the chart, passed to it through function parameters. This configuration makes charts extremely portable. You get a single chart function you can call anywhere in your code at anytime in the DOM process, making it easy to create multiples of the same chart and to handle resize events and updates to the underlying data.

### In practice

#### Writing code

Write your chart code in `js/lib/chart.js` and add custom styles to `scss/_chart.scss`.

Develop with:
```bash
$ yarn start
```

Build for production with:
```bash
$ yarn build
```

#### Writing idempotent charts with `appendSelect`

The chart module is structured around an idempotent chart function. Your chart's render method can be called anywhere, anytime and will produce the same chart as long as it's called with the same parameters.

To help you write idempotent chart functions, the module adds a custom method to d3. `appendSelect` will either append an element (with a class) if it doesn't exist or will return the selection of the first existing element that matches the given selector.

```javascript
selection.appendSelect(<selector_string>, <class_string>);
// class_string is optional
```

This helps you avoid awkward constructions and write succinct code when appending non-data-bound elements. For example:

```javascript
// Use this:
const svg = d3.select('#chart').appendSelect('svg', 'chart');

// ... instead of this:
let svg;
if(d3.select('#chart').select('svg.chart').size() === 0) {
  svg = d3.select('#chart')
    .append('svg')
    .attr('class', 'chart');
} else {
  svg = d3.select('#chart').select('svg.chart');
}
```

You can also chain `appendSelect` calls and assign multiple classes:

```javascript
const g = d3.select('#chart')
  .appendSelect('svg')
  .appendSelect('g', 'inner group');
```

Using `appendSelect` keeps your chart idempotent and agnostic to the conditions under which it's called.

```javascript
function render(selector, data) {
  const svg = d3.select(selector).appendSelect('svg');
  // etc...
}

// Calling the chart function multiple times doesn't create multiple SVGs.
render('#myChart', data);
render('#myChart', newData);
// Calling it with a different selector creates a new chart.
render('#anotherChart', otherData);
```

#### Chart methods

Out of the box, your chart module has methods to create, update and resize your chart.

```javascript
const customOpts = {
  fill: 'orange'
};

myChart.create('#selector', data, customOpts);

myChart.update(newData);

myChart.resize();
```

In reality these three methods are redundant. Because the chart is idempotent, the create function can be called again to resize or update the chart with new data. Update and resize methods are merely convenience functions you can use whenever you don't need to change existing options or the data that underlies your chart.


#### Writing your chart with configurable options

Writing you chart module to be configurable by users extends its use and makes it a more powerful template.

For example, a user may wish to customize your chart's cosmetics by passing some options:

```javascript
const customOptions = {
    stroke: '#333',
};

myChart.create('#chart', data, customOptions);
```

You can add these options to your chart's props object with defaults:

```javascript
let props = {
  stroke: '#EEE',
  fill: 'orange',
  // etc.
};
```

Then use these props in your chart's `render` method.

```javascript
circles
  .attr('stroke', props.stroke)
  .attr('fill', props.fill);
```

When a user calls your chart with custom props, they are shallowly merged with defaults in a getter-setter using [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```javascript
chart.props = (obj) => {
  if (!obj) return props;
  props = Object.assign(props, obj);
  return chart;
};
```

You can also use a deep merging function like lodash's [`_.merge`](https://lodash.com/docs/4.17.4#merge), if needed.

```javascript
import merge from 'lodash/merge';

// ...

let props = {
  margins: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

// ...

chart.props = (obj) => {
  if (!obj) return props;
  props = merge(props, obj); // Deep merge
  return chart;
};

// Used like this:
const customProps = {
  margins: {
    top: 20, // overwrites default for top. All others preserved.
  },
};

myChart.create('#chart', data, customProps);
```
