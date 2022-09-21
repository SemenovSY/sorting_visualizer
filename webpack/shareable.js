const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'shared': path.resolve('src', 'shared'),
      'constants': path.resolve('src', 'constants.styl'),
      'jsConstants': path.resolve('src', 'constants.js'),
      'utils': path.resolve('src', 'utils'),
      'store': path.resolve('src', 'store.js')
    },
    modules: ['node_modules'],
    extensions: ['.jsx', '.js', '.styl', '.svg']
  }
};
