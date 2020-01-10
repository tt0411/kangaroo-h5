module.exports = {
  publicPath: './',
    devServer: {
      port: '8889',
      open: true
    },
    configureWebpack: {
      externals: {
        'AMap': 'AMap' // 高德地图配置
      }
    }
  }