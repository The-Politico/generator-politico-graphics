import * as d3 from 'd3';

// Add a couple useful utilities to reorder elements...
d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    const firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

// ... and the important addition. ⬇️⬇️⬇️

/**
 * appendSelect either selects a matching child element of your current
 * selection if one exists or appends that child and selects it. It's useful
 * for writing idempotent chart functions.
 *
 * Use it like this:
 *
 * selection.appendSelect(<element selector>, <class string>)
 *
 * It can be chained like any normal d3 selection:
 *
 * const g = d3.select(myNode).appendSelect('g', 'viz-group');
 * g.appendSelect('rect')
 *   .attr('x', 0); etc.
 *
 * @param  {string} el  String representation of element to be appended/selected.
 * @param  {string} cls Class string (w/out dots) of element to be appended/
 *                      selected. Can pass none or multiple separated by whitespace.
 * @return {object}     d3 selection of child element
 */
d3.selection.prototype.appendSelect = function(el, cls) {
  const selected = cls ?
    this.select(`${el}.${cls.split(' ').join('.')}`) : this.select(el);
  if (selected.empty()) {
    return cls ? this.append(el).classed(cls, true) : this.append(el);
  }
  return selected;
};

export default d3;
