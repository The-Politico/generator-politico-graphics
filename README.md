![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-graphics [![npm](https://img.shields.io/npm/v/generator-politico-graphics.svg)](https://www.npmjs.com/package/generator-politico-graphics)

A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building reusable graphic modules.

## How to use

### What you'll need installed

Make sure you have [node](https://docs.npmjs.com/getting-started/installing-node), the [yarn](https://yarnpkg.com/en/docs/install) package manager, [yeoman](http://yeoman.io/) and this generator installed:

```bash
$ npm install -g yarn yo generator-politico-graphics
```

If you'd like the generator to be able to create a GitHub repo for you while it's creating your development environment, export an environment variable with a Github [personal access token](https://github.com/settings/tokens) to `GITHUB_TOKEN`. It will then prompt you to ask whether you'd like a repo made.

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

Start the development server.

```bash
$ yarn start
```

### Developing your graphic module

Read [this](https://bost.ocks.org/mike/chart/) for the theory behind reusable chart templates. The README included when you run the generator includes more tips for using the this pattern.

The generator includes a basic example of a reusable chart function in `src/js/lib/chart.js`. You can rework it to your own use.
