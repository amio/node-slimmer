const path = require('path')
const rollup = require('rollup')
const json = require('rollup-plugin-json')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = function bundler (source, dest, options = {}) {
  // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
  const format = options.format || 'umd'
  const entry = path.join(__dirname, source)
  const target = dest ? path.join(__dirname, dest) : entry.replace(/(\.\w+)?$/, '.bundle$1')

  console.time('Building')

  return rollup.rollup({
    entry: entry,
    plugins: [
      json(),
      commonjs(),
      babel({
        presets: ['es2015-rollup'],
        exclude: 'node_modules/**'
      }),
      // nodeResolve({
      //   extensions: ['.js', '.json']
      // }),
    ],
    onwarn: function ( message ) {
      if ( /external dependency/.test( message ) ) return;
      console.error( message );
    }
  }).then(function(bundle) {
    console.timeEnd('Building')
    return bundle.write({
      moduleName: 'myModule',
      format: format,
      dest: target
    })
  })
}
