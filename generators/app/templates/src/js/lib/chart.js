import d3 from './utils/d3';
import ChartComponent from './base/ChartComponent';
import defaultData from './data/default.json';

class <%= clsName %> extends ChartComponent {
  defaultProps = {
    stroke: '#ccc',
    strokeWidth: '2px',
    fill: 'steelblue',
    count: 0,
  }

  defaultData = defaultData

  draw() {
    const data = this.data();
    const props = this.props();

    const node = this.selection().node();
    const { width, height } = node.getBoundingClientRect();
    const t = d3.transition()
      .duration(750);

    const g = this.selection()
      .appendSelect('svg') // see docs in ./utils/d3.js
      .attr('width', width)
      .attr('height', height - 35)
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

    /**
     * This code shows how you can set props inside your
     * chart function, creating an internal state. It also
     * shows how you can pass a method as a prop from a parent
     * component.
     */
    this.selection().appendSelect('button')
      .on('click', () => {
        // Set a prop internally
        this.props({ count: props.count + 1 });
        // Call a method passed down as a prop
        props.sendMessage(`
          I was a React method called by this chart component.
          I've been called ${this.props().count} times.
        `);
      })
      .text('Click');

    return this;
  }
}

export default <%= clsName %>;
