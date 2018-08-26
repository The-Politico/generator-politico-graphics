![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-graphics [![npm](https://img.shields.io/npm/v/generator-politico-graphics.svg)](https://www.npmjs.com/package/generator-politico-graphics)

A [Yeoman](http://yeoman.io) generator that scaffolds a development environment for building reusable graphic modules.

![](circles.gif)

## Why this?

Building data visualizations is expensive, especially for small teams balancing graphics with other development work. At POLITICO, we want to build our charts using patterns that promote reusability and that make them easy to  integrate in multiple contexts.

This framework builds on the reusable chart pattern proposed by Mike Bostock in his seminal "[Toward Reusable Charts](https://bost.ocks.org/mike/chart/)," adding to it a few conventions borrowed from reactive programming and modern JS modules. It helps us create chart modules that have simple, declarative APIs and can be easily configured for different uses.

That's the theory. In practice, this framework helps us separate the concerns of dataviz development from other client-side work. We've used it as a shortcut to build dozens of complex data visualization components and reusable chart modules over several years.

## Features

- Scaffolds a modern JavaScript development environment.
- Includes our boilerplate framework for developing reusable chart modules and example code you can easily rework.
- Builds a minified, self-executing ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)) version of your chart script, which can be included directly in a client.
- Builds an [ECMAScript module](https://developers.google.com/web/fundamentals/primers/modules) version of your script, which can be imported into other build environments.
- Builds your chart's preview page to a directory for hosting on GitHub pages.
- Includes a linter configuration for [ESLint](https://eslint.org/) based on [JavaScript Standard Style](https://standardjs.com/).

## How to use it

### What you'll need installed

Make sure you have [node](https://docs.npmjs.com/getting-started/installing-node), the [yarn](https://yarnpkg.com/en/docs/install) package manager, [yeoman](http://yeoman.io/) and this generator installed:

```bash
$ npm install -g yarn yo generator-politico-graphics
```

This generator can also create a GitHub repo for you while it's building out your development environment. Export an environment variable with a Github [personal access token](https://github.com/settings/tokens) to `GITHUB_TOKEN`. The generator will then ask whether you'd like to create a repo with each new build.

### Starting a new graphic module

Create a fresh directory for your project and move into it in a terminal window.

```bash
$ mkdir my-new-graphic
$ cd my-new-graphic
```

Now run the generator and answer the questions it asks to build your dev environment.

```bash
$ yo politico-graphics
```

### Developing your graphic module

Start the development server.

```bash
$ yarn start
```

The generator includes a basic example of a reusable chart module in `src/js/lib/chart.js`. Start there to build your chart.

The README included when you run the generator includes many tips for using this reusable pattern. Read it!


### Publishing your graphic module

Once you're ready to publish your module, run:

```bash
$ yarn build
```

From here you can commit your code to GitHub and host the preview page using GitHub pages or publish your module to [NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).
