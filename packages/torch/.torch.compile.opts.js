module.exports = {
  babelrc: {
    presets: [
      '@babel/env'
    ],
    sourceMaps: 'inline'
  },
  extensions: ['.es6', '.es', '.jsx', '.js'],
  include: [
    '__tests__/renderer/**',
  ],
  exclude: [
    'bower_components/**',
    'node_modules/**'
  ]
}
