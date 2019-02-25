# Developing chart components

### Theory

Read Mike Bostock's foundational doc, "[Towards Reusable Charts](https://bost.ocks.org/mike/chart/)."

This chart component pattern supplements Bostock's reusable proposal by emphasizing [idempotence](http://www.restapitutorial.com/lessons/idempotency.html) in the chart's render method. Data and configuration are external to the chart, passed to it through props. That makes charts extremely portable. You get a single chart function you can call anywhere in your code at any time in the DOM process, making it easy to create multiples of the same chart and to handle resize events and updates to the underlying data.

### In practice

#### Writing code

Write your chart code in the `draw` method of your custom chart component in `src/js/lib/Chart.js` and add custom styles to `scss/_chart.scss`.

Develop with:
```bash
$ yarn start
```

Build for production with:
```bash
$ yarn build
```

#### Writing idempotent charts with `appendSelect`

The chart component is structured around an idempotent chart function. Your chart's `draw` method can be called anywhere, anytime and will produce the same chart as long as it's called with the same data and props.

To help you write idempotent chart functions, this module adds a custom method to d3. `appendSelect` will either append an element (with a class) if it doesn't exist or will return the selection of the first existing element that matches the given selector.

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

Out of the box, your chart component has several getter-setter methods to get and set the root d3 selection, the data your chart will use and some props you can use to configure display options or to pass more complex logic to your chart.

```javascript
const chart = new MyChartComponent();

chart
  .selection('#selector')
  .data([1, 2, 3])
  .props({ fill: 'orange' })
  .draw();

chart.selection();
// A d3 selection of #selector

chart.data();
// [1, 2, 3]

chart.props();
// { fill: 'orange' }
```

Each method is extended from the `ChartComponent` base class, with the exception of `draw`, which you must define with your chart code. Of course you can always overwrite any of methods you like, but the built in ones offer some nice conveniences.

For example, within your chart component you can set defaults for props and data so users can start with sensible defaults.

```javascript
class MyChartComponent extends ChartComponent {
  defaultProps = {
    stroke: '#333',
    fill: 'steelblue',
  }

  defaultData = [3, 4, 5]

  draw() {
    // ...
  }
}
```

When users set props on their chart instance, they will be merged with these defaults using [lodash's merge method](https://lodash.com/docs/4.17.11#merge).

Using the example above, a user can override just one prop and the other defaults will persist:

```javascript
const chart = new MyChartComponent();

chart.props({ fill: 'orange' });

chart.props();
// { fill: 'orange', stroke: '#333' }
```

As you're writing your chart component, you can use these same methods to get data using `this`.

```javascript
class MyChartComponent extends ChartComponent {
  // ...

  draw() {
    this.selection()
      .appendSelect('svg');

    const fillColor = this.props().fill;
    const chartData = this.data();

    // ...
  }
}
```

In more complex cases, you can even use the props method to *set* some internal state.

```javascript
class MyChartComponent extends ChartComponent {
  defaultProps = {
    counter = 0;
  }

  draw() {
    const { counter } = this.props();

    this.selection()
      .appendSelect('button')
      .text('Click me!')
      .on('click', () => {
        this.props({ counter: counter + 1 });
      });
  }
}
```
