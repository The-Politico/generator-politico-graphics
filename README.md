![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-graphics

A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building reusable graphic modules at POLITICO.

### What you'll need installed

Make sure you have [node](https://docs.npmjs.com/getting-started/installing-node) installed as well as the [yarn](https://yarnpkg.com/en/docs/install) package manager.

Then install [gulp](http://gulpjs.com/), [yeoman](http://yeoman.io/) and this generator, globally*:
```
$ npm install -g gulp-cli yo generator-politico-graphics
```
_\* You may need to prefix with `sudo`_

## How to use

### Starting a new graphic module

Create a fresh directory for your project and move into it in your console.

```bash
$ mkdir my-project
$ cd my-project
```

Now run the generator and answer the questions it asks to build your dev environment.

```bash
$ yo politico-graphics
```

Run gulp to start the development server.

```bash
$ gulp
```

Develop files in the `src` directory and they will be automatically compiled to the `dist` directory.

### Developing your graphic module

Read [this](https://bost.ocks.org/mike/chart/) for the theory behind reusable chart templates.

The generator includes a basic example of a reusable chart function in `src/js/chart.js` you can rework to your own use.

## Prior art

[generator-dmninteractives](https://github.com/DallasMorningNews/generator-dmninteractives/tree/master/generators/graphic-module)
