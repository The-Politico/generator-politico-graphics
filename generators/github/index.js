const Generator = require('yeoman-generator');
const path = require('path');
const octokit = require('@octokit/rest')();
const git = require('simple-git');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    const prompts = [{
      name: 'create',
      type: 'confirm',
      message: 'Would you like to create a GitHub repository for this project?',
    }, {
      name: 'name',
      message: 'OK, what\'s your repo\'s name?',
      default: path.basename(process.cwd()),
      when: a => a.create,
    }, {
      name: 'privateRepo',
      type: 'confirm',
      message: 'Should it be private?',
      when: a => a.create,
    }, {
      name: 'useOrg',
      type: 'confirm',
      message: 'Do you want to create the repo on an org account?',
      when: a => a.create,
    }, {
      name: 'org',
      message: 'OK, what\'s your GitHub org?',
      default: 'The-Politico',
      store: true,
      when: a => a.create && a.useOrg,
    }];

    return this.prompt(prompts).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    const root = this.destinationRoot();

    const { create, name, privateRepo, useOrg, org } = this.answers;

    if (!create || !process.env.GITHUB_TOKEN) return;

    octokit.authenticate({
      type: 'token',
      token: process.env.GITHUB_TOKEN,
    });

    const createRepo = useOrg ?
      octokit.repos.createForOrg :
      octokit.repos.create;

    const opts = useOrg ? {
      org,
      name,
      private: privateRepo,
    } : {
      name,
      private: privateRepo,
    };

    createRepo(opts)
      .then(p => git(root)
        .init()
        .addRemote('origin', p.data.ssh_url)
        .add('.')
        .commit('initial')
        .push('origin', 'master'))
      .catch((e) => {
        this.log(chalk.bgRed('GitHub error!'));
        this.log(e);
      });
  }
};
