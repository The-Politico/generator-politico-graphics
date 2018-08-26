import d3 from './utils/d3';

import defaultData from './data/default.json';

export default () => ({

  /**
   * Develop your chart in this render function.
   *
   * For more details about this pattern, see Mike Bostock's proposal for
   * reusable charts: https://bost.ocks.org/mike/chart/
   */
  render() {
    /**
     * Set default chart properties in this object. Users can overwrite them
     * by passing a props object through the module's create or update methods.
     */
    let props = {
      stroke: 'lightgrey',
      strokeWidth: '1px',
      fill: 'steelblue',
    };

    function chart(selection) {
      selection.each((data, i, elements) => {
        /**
         * YOUR D3 CODE HERE 📈 📊 🌐
         */
        const node = elements[i]; // the selected element
        const { width, height } = node.getBoundingClientRect();
        const t = d3.transition()
          .duration(750);

        const g = d3.select(node)
          .appendSelect('svg') // see docs in ./utils/d3.js
          .attr('width', width)
          .attr('height', height)
          .appendSelect('g')
          .attr('transform', `translate(${width / 2 - 62}, 60)`);

        const circles = g.selectAll('circle') // DATA JOIN
          .data(data, (d, i) => i);

        circles // UPDATE
          .style('fill', props.fill)
          .style('stroke', props.stroke);

        circles.enter().append('circle') // ENTER
          .style('fill', props.fill)
          .style('stroke', props.stroke)
          .style('stroke-width', props.strokeWidth)
          .attr('cy', '60')
          .attr('cx', (d, i) =>
            data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
          )
          .merge(circles) // ENTER + UPDATE
          .transition(t)
          .attr('cx', (d, i) =>
            data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
          )
          .attr('r', d => d / 2);

        circles.exit() // EXIT
          .transition(t)
          .attr('r', 0)
          .remove();
      });
    }

    /**
     * Getter-setters merge any user-provided properties with the defaults.
     */
    chart.props = (obj) => {
      if (!obj) return props;
      props = Object.assign(props, obj);
      return chart;
    };

    return chart;
  },

  /**
   * Draws the chart by calling the idempotent render function with
   * a selected element.
   */
  draw() {
    const chart = this.render()
      .props(this._props);

    d3.select(this._selection)
      .datum(this._data)
      .call(chart);
  },

  /**
   * The following methods represent the external API of this chart module.
   *
   * See ../preview/App.jsx for an example of how they are used.
   */

  /**
   * Creates the chart initially.
   */
  create(selection, data, props = {}) {
    this._selection = selection;
    this._data = data || defaultData;
    this._props = props;

    this.draw();
  },

  /**
   * Updates the chart with new data and/or props.
   */
  update(data, props = {}) {
    this._data = data || this._data;
    this._props = Object.assign({}, this._props, props);
    this.draw();
  },

  /**
   * Resizes the chart.
   */
  resize() {
    this.draw();
  },
});
