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
      message: 'Great! What\'s your repo\'s name?',
      default: path.basename(process.cwd()),
      when: a => a.create,
    }, {
      name: 'privateRepo',
      type: 'confirm',
      message: 'Should it be private?',
      when: a => a.create,
    }, {
      name: 'org',
      message: 'What\'s your GitHub org (make blank for none)?',
      default: 'The-Politico',
      store: true,
      when: a => a.create,
    }, {
      name: 'username',
      message: 'GitHub username?',
      store: true,
      when: a => a.create,
    }, {
      name: 'password',
      message: 'GitHub password?',
      type: 'password',
      when: a => a.create,
    }];

    return this.prompt(prompts).then((answers) => {
      this.answers = answers;
    });
  }


  writing() {
    const root = this.destinationRoot();

    const { create, username, password, org, name, privateRepo } = this.answers;

    if (!create) return;

    octokit.authenticate({
      type: 'basic',
      username,
      password,
    });

    try {
      if (org !== '') {
        octokit.repos.createForOrg({
          org,
          name,
          private: privateRepo,
        })
        .then(p => git(root)
            .init()
            .addRemote('origin', p.data.ssh_url)
            .add('.')
            .commit('initial')
            .push('origin', 'master'));
      } else {
        octokit.repos.create({
          name,
          private: privateRepo,
        })
        .then(p => git(root)
            .init()
            .addRemote('origin', p.data.ssh_url)
            .add('.')
            .commit('initial')
            .push('origin', 'master'));
      }
    } catch (e) {
      this.log(
        chalk.bgRed('GitHub error:'),
        'Couldn\'t create repo',
        chalk.yellow(this.answers.repo));
    }
  }
};
