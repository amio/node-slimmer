#! /usr/bin/env node

const fs = require('fs')
const help = require('./help')
const bundler = require('./bundler')

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    v: 'version',
    h: 'help',
    f: 'format',
  },
})

if (argv.version) {
  help.printVersion()
  process.exit()
}

if (argv.help || argv._.length === 0) {
  help.printHelp()
  process.exit()
}

const [ entry, dest ] = argv._
bundler(entry, dest, argv)
.catch(e => {
  console.error(e)
  e.codeFrame && console.log(e.codeFrame)
  process.exit(1)
})
