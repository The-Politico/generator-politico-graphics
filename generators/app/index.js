const Generator = require('yeoman-generator');
const S = require('string');
const path = require('path');

module.exports = class extends Generator {
  initializing() {
    if (process.env.GITHUB_TOKEN) {
      this.composeWith(require.resolve('../github'));
    }
  }

  prompting() {
    const prompts = [{
      name: 'pkgName',
      message: 'What should we call your package, e.g., "politico_scatterplot-module"?',
      default: path.basename(process.cwd()),
    }, {
      name: 'clsName',
      message: 'What class will users call to use your chart, e.g., "ScatterplotChart"?',
      default: answers => S(answers.pkgName)
        .camelize().s
        .replace(/^\w/, c => c.toUpperCase()),
    }];
    return this.prompt(prompts).then((answers) => {
      this.pkgName = S(answers.pkgName).slugify().s;
      this.clsName = S(answers.clsName).camelize().s
        .replace(/^\w/, c => c.toUpperCase());
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('config/rollup.esm.js'),
      this.destinationPath('./config/rollup.esm.js'));
    this.fs.copyTpl(
      this.templatePath('config/rollup.lib.js'),
      this.destinationPath('./config/rollup.lib.js'),
      { clsName: this.clsName });
    this.fs.copy(
      this.templatePath('config/webpack.dev.js'),
      this.destinationPath('./config/webpack.dev.js'));
    this.fs.copy(
      this.templatePath('config/webpack.docs.js'),
      this.destinationPath('./config/webpack.docs.js'));

    this.fs.copyTpl(
      this.templatePath('src/js/demo/App.jsx'),
      this.destinationPath('./src/js/demo/App.jsx'),
      { clsName: this.clsName });
    this.fs.copy(
      this.templatePath('src/js/demo/Chart.jsx'),
      this.destinationPath('./src/js/demo/Chart.jsx'));
    this.fs.copy(
      this.templatePath('src/js/lib/base/ChartComponent.js'),
      this.destinationPath('./src/js/lib/base/ChartComponent.js'));
    this.fs.copy(
      this.templatePath('src/js/lib/base/errorClasses.js'),
      this.destinationPath('./src/js/lib/base/errorClasses.js'));
    this.fs.copy(
      this.templatePath('src/js/lib/data/default.json'),
      this.destinationPath('./src/js/lib/data/default.json'));
    this.fs.copy(
      this.templatePath('src/js/lib/utils/d3.js'),
      this.destinationPath('./src/js/lib/utils/d3.js'));
    this.fs.copyTpl(
      this.templatePath('src/js/lib/Chart.js'),
      this.destinationPath('./src/js/lib/Chart.js'),
      { clsName: this.clsName });
    this.fs.copy(
      this.templatePath('src/js/lib/global.js'),
      this.destinationPath('./src/js/lib/global.js'));
    this.fs.copy(
      this.templatePath('src/index.html'),
      this.destinationPath('./src/index.html'));

    this.fs.copyTpl(
      this.templatePath('src/scss/_chart.scss'),
      this.destinationPath('./src/scss/_chart.scss'),
      { clsName: this.clsName });
    this.fs.copyTpl(
      this.templatePath('src/scss/_variables.scss'),
      this.destinationPath('./src/scss/_variables.scss'),
      { clsName: this.clsName });
    this.fs.copyTpl(
      this.templatePath('src/scss/global.scss'),
      this.destinationPath('./src/scss/global.scss'),
      { clsName: this.clsName });
    this.fs.copyTpl(
      this.templatePath('src/scss/styles.scss'),
      this.destinationPath('./src/scss/styles.scss'),
      { clsName: this.clsName });

    this.fs.copy(
      this.templatePath('eslintrc.json'),
      this.destinationPath('./.eslintrc.json'));
    this.fs.copy(
      this.templatePath('DEVELOPING.md'),
      this.destinationPath('./DEVELOPING.md'));
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('./package.json'),
      { pkgName: this.pkgName });
    this.fs.copy(
      this.templatePath('preview.png'),
      this.destinationPath('./preview.png'));
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('./README.md'), {
        pkgName: this.pkgName,
        clsName: this.clsName,
      });
  }

  install() {
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false,
    });
  }

  end() {
    this.spawnCommand('yarn', ['start']);
  }
};
