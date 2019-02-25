export default class ChartError extends Error {
  constructor(constructorName = 'Chart component') {
    super(constructorName);
    this.constructorName = constructorName;
    this.name = 'ChartComponentError';
  }
}

export class ErrorDrawMethodUndefined extends ChartError {
  message = `${this.constructorName} should have a draw method`
}

export class ErrorSelectorType extends ChartError {
  message = `${this.constructorName} selector should be a DOM Element or selector string`
}

export class ErrorPropsType extends ChartError {
  message = `${this.constructorName} props should be an Object`
}

export class ErrorDataType extends ChartError {
  message = `${this.constructorName} data should be an Array`
}
