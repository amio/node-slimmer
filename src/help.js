const path = require('path')

const helpText = `
  Usage

    $ slimmer <entry> <dest> [<options>]

  Options

    -f, --format <format> Output format - 'amd', 'cjs', 'es6', 'iife', 'umd'

  Examples

    # All default options
    $ slimmer index.js

    #
    $ slimmer index.js index.bundle -f cjs
`

module.exports = {
  printHelp: function () {
    process.stdout.write(helpText)
    return true
  },
  printVersion: function () {
    const version = 'v' + require(path.join(__dirname, '../package.json')).version
    process.stdout.write(version + '\n')
    return true
  },
}
