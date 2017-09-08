const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const S = require('string');

module.exports = class extends Generator {
  initializing() {
    this.composeWith('politico-interactives:passphrase');
    this.composeWith('politico-interactives:linters');
    this.composeWith('politico-interactives:bundler-webpack', {
      context: false
    });
    this.composeWith('politico-interactives:router', {
      context: false
    });
  }

  prompting() {
    const prompts = [{
      name: 'appName',
      message: 'What\'s your project slug, e.g., "politico-chart-scatterplot"?',
    }, {
      name: 'objName',
      message: 'What\'s the name of the chart class users will call, e.g., "UsaChoropleth"?',
    }, {
      type: 'confirm',
      name: 'spreadsheet',
      message: 'Would you like Google Spreadsheet integration?',
      default: false
    }];
    return this.prompt(prompts).then((answers) => {
      this.appName = answers.appName;
      this.objName = S(answers.objName).camelize().s;
      this.spreadsheet = answers.spreadsheet;
    });
  }

  template() {
    this.composeWith('politico-interactives:gulp', {
      spreadsheet: this.spreadsheet
    });
    if (this.spreadsheet) this.composeWith('politico-interactives:spreadsheet');
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('./package.json'),
      { appName: this.appName });
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('./README.md'), {
        appName: this.appName,
        objName: this.objName,
      });
    this.fs.copy(
      this.templatePath('DEVELOPING.md'),
      this.destinationPath('./DEVELOPING.md'));
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));
    this.fs.copy(
      this.templatePath('preview.png'),
      this.destinationPath('./preview.png'));
    this.fs.copy(
      this.templatePath('src/js/chart.js'),
      this.destinationPath('./src/js/chart.js'));
    this.fs.copy(
      this.templatePath('src/js/d3.js'),
      this.destinationPath('./src/js/d3.js'));
    this.fs.copyTpl(
      this.templatePath('src/js/main-chart.js'),
      this.destinationPath('./src/js/main-chart.js'),
      { objName: this.objName });
    this.fs.copyTpl(
      this.templatePath('src/scss/_variables.scss'),
      this.destinationPath('./src/scss/_variables.scss'),
      { objName: this.objName });
    this.fs.copyTpl(
      this.templatePath('src/scss/_chart-styles.scss'),
      this.destinationPath('./src/scss/_chart-styles.scss'),
      { objName: this.objName });
    this.fs.copyTpl(
      this.templatePath('src/scss/styles.scss'),
      this.destinationPath('./src/scss/styles.scss'),
      { objName: this.objName });
    this.fs.copy(
      this.templatePath('src/data/data.json'),
      this.destinationPath('./src/data/data.json'));
    this.fs.copy(
      this.templatePath('src/data/update.json'),
      this.destinationPath('./src/data/update.json'));
    this.fs.copyTpl(
      this.templatePath('src/templates/index.html'),
      this.destinationPath('./src/templates/index.html'), {
        objName: this.objName
      });
    mkdirp('./dist/css');
    mkdirp('./dist/data');
    mkdirp('./dist/js');
  }

  install() {
    const dependencies = [
      'd3',
      'lodash',
    ];

    this.yarnInstall(dependencies, { save: true });
  }

  end() {
    this.spawnCommand('gulp');
  }
};
