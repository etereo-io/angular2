import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'
import typescript  from 'rollup-plugin-typescript'

export default {
  entry: './index.ts',
  dest: './bundles/core.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  moduleName: 'core',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // intercepts in some rollup versions

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      typescript({
        typescript: require('typescript')
      })
  ]
}
