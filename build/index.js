const webpack = require('webpack')
const ora = require('ora')
const argv = require('yargs').argv
const config = require('./webpack.config.js')

const log = console.log
const WATCH = argv.watch

if (WATCH) {
  const nodemon = require('nodemon')
  const path = require('path')
  const chalk = require('chalk')
  let env
  try {
    env = require('./env.js') // eslint-disable-line import/no-unresolved
  } catch (err) {
    console.error(err)
    env = {}
  }

  let runner
  const run = () => nodemon({
    execMap: { js: 'node --inspect' },
    script: path.join(__dirname, '../index.js'),
    ignore: ['*'],
    watch: ['nothing/'],
    ext: 'noop',
    env: (env || {})
  })

  const starter = ora('Building...').start()
  webpack(config).watch(100, () => {
    if (runner) {
      log(chalk.gray('Restarting...'))
      nodemon.restart()
    } else {
      starter.succeed('Built!')
      runner = run()
    }
  })
} else {
  const starter = ora('Building...').start()
  webpack(config).run(() => {
    starter.succeed('Built!')
  })
}
