const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const S = require('string');

module.exports = class extends Generator {
  initializing() {
    this.composeWith('politico-interactives:passphrase');
    this.composeWith('politico-interactives:linters');
  }

  prompting() {
    const prompts = [{
      name: 'appName',
      message: 'What\'s your project slug, e.g., "politico-chart-scatterplot"?',
    }, {
      name: 'objName',
      message: 'What\'s the name of the chart class users will call, e.g., "UsaChoropleth"?',
    }];
    return this.prompt(prompts).then((answers) => {
      this.appName = answers.appName;
      this.objName = S(answers.objName).camelize().s;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('./package.json'),
      { appName: this.appName });
    this.fs.copyTpl(
      this.templatePath('README'),
      this.destinationPath('./README.md'), {
        appName: this.appName,
        objName: this.objName,
      });
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('./gulpfile.js'));
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
      this.templatePath('src/js/global-chart.js'),
      this.destinationPath('./src/js/global-chart.js'),
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
      this.templatePath('gulp/index.js'),
      this.destinationPath('./gulp/index.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/browserify.js'),
      this.destinationPath('./gulp/tasks/browserify.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/sass.js'),
      this.destinationPath('./gulp/tasks/sass.js'));
    this.fs.copy(
      this.templatePath('gulp/tasks/server.js'),
      this.destinationPath('./gulp/tasks/server.js'));
    this.fs.copyTpl(
      this.templatePath('dist/index.html'),
      this.destinationPath('./dist/index.html'),
      { objName: this.objName });
    this.fs.copy(
      this.templatePath('dist/data/create.json'),
      this.destinationPath('./dist/data/create.json'));
    this.fs.copy(
      this.templatePath('dist/data/update.json'),
      this.destinationPath('./dist/data/update.json'));
    mkdirp('./dist/css');
    mkdirp('./dist/js');
  }

  install() {
    const dependencies = [
      'babelify',
      'babel-preset-es2015',
      'browser-sync',
      'browserify',
      'd3',
      'event-stream',
      'gulp',
      'gulp-babili',
      'gulp-cssnano',
      'gulp-if',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-util',
      'vinyl-buffer',
      'vinyl-source-stream',
      'watchify',
    ];

    this.yarnInstall(dependencies, { save: true });
  }

  end() {
    this.spawnCommand('gulp');
  }
};
