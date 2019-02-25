import d3 from '../utils/d3';
import merge from 'lodash/merge';
import {
  ErrorDrawMethodUndefined,
  ErrorSelectorType,
  ErrorPropsType,
  ErrorDataType
} from './errorClasses';

class ChartComponent {
  constructor(selector, props, data) {
    this.selection(selector);
    this.props(props);
    this.data(data);
  }
  /**
   * Getter/setter for DOM node chart is drawn into
   * @param  {String or Element} selector
   */
  selection(selector) {
    if (!selector) return this._selection;

    if (!(selector instanceof Element) && typeof selector !== 'string') {
      throw new ErrorSelectorType(this.constructor.name);
    }

    this._selection = d3.select(selector);
    return this;
  }

  /**
   * Default props
   * @type {Object}
   */
  defaultProps = {}

  /**
   * Getter/setter for props object
   * @param  {Object} obj props
   */
  props(obj) {
    if (!obj) return this._props || this.defaultProps;

    if (!(obj instanceof Object)) {
      throw new ErrorPropsType(this.constructor.name);
    }

    this._props = merge(this._props || this.defaultProps, obj);
    return this;
  }

  /**
   * Default data
   * @type {Array}
   */
  defaultData = []

  /**
   * Getter/setter for chart data
   * @param  {Array} arr data
   */
  data(arr) {
    if (!arr) return this._data || this.defaultData;

    if (!(arr instanceof Array)) {
      throw new ErrorDataType(this.constructor.name);
    }

    this._data = arr;
    return this;
  }

  draw() {
    throw new ErrorDrawMethodUndefined(this.constructor.name);
  }
}

export default ChartComponent;
