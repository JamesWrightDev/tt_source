const path = require('path')

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/sass/utilities/_reset.scss'),
        path.resolve(__dirname, './src/sass/utilities/_variables.scss'),
        path.resolve(__dirname, './src/sass/utilities/_mixins.scss'),
        path.resolve(__dirname, './src/sass/layout/_grid.scss'),
        path.resolve(__dirname, './src/sass/components/_typography.scss'),
      ],
    })
}