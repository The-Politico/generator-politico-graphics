import React from 'react';
import debounce from 'lodash/debounce';

import { Colors } from 'politico-style';

import Chart from '../lib/chart.js';

const { brand } = Colors;

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    // Create a new instance of our chart and attach it to this component
    this.chart = new Chart();
  }
  componentDidMount() {
    // Create the chart on mount
    this.createChart(null, { fill: brand.politicoBlue.hex });
    // Add a listener to resize chart with the window
    window.addEventListener('resize', debounce(this.resizeChart, 250));

    // Showreel...
    setTimeout(() => {
      this.updateChart([20, 34, 48, 60], { fill: brand.politicoOrange.hex });
    }, 1000);
    setTimeout(() => {
      this.updateChart([30, 50, 30], { fill: brand.politicoBlue.hex });
    }, 2000);
  }

  componentDidUpdate() {
    // Update the chart with the component
    this.updateChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.resizeChart, 250));
  }

  createChart = (data = null, props = null) => {
    this.chart.create('#chart', data, props);
  }

  updateChart = (data = null, props = null) => {
    this.chart.update(data, props);
  }

  resizeChart = () => {
    this.chart.resize();
  }

  render() {
    return (
      <div id='chart' />
    );
  }
}

export default ChartContainer;
