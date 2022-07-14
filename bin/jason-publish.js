#! /usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const spawn = require('cross-spawn')
const program = new Command();


const logError = (error) => console.log(chalk.red(error));
const logSuccess = (success) => console.log(chalk.green(success));
const logWarning = (warning) => console.log(chalk.yellow(warning));

program
  .name('Jason Publish')
  .description('Publish to a remote server')
  .version('0.0.1')

program
  .command('auto')
  .description('Publish  to a remote server')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'publishType',
          message: '请选择发布类型',
          choices: [
            { name: '发布到测试', value: 'dev' },
            { name: '发布到正式', value: 'prod' }
          ]
        }
      ])
    } catch (error) {
      console.log(error);
    }
  })

program
  .command('push')
  .description('Push to a remote server')
  .argument('[main]', 'The main Jason file to push')
  .option('-m, --merge [branch]', 'merge a branch into the current branch','master')
  .option('-c, --commit [message]', 'commit the changes', 'jason-publish')
  .action((args, options) => {
    console.log(args, options);
  })

program.parse(process.argv)
