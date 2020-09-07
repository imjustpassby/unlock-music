const isProduction = process.env.NODE_ENV === 'production' // 是否是生产环境
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用

function getExternals() {
  return {
    'element-ui': 'ElementUI'
  }
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  // 生产环境下的 source map
  productionSourceMap: false,
  css: {
    extract: isProduction,
    requireModuleExtension: true
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /zh-cn/) // 只引入 moment 的中文包
      // new BundleAnalyzerPlugin({ analyzerPort: 8888 }) //生产模式开启查看打包分析结果
    ],
    devtool: !isProduction ? 'cheap-module-eval-source-map' : false,
    performance: {
      // 控制webpack如何通知超出特定文件限制的资产和入口点
      hints: false // 关闭提示
    },
    externals: process.env.NODE_ENV === 'production' ? getExternals() : {}
  }
}
