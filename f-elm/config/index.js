// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../www/index.html'),// 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../../www'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: '',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true,// 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: '/',
    // 简单配置代理
    // proxyTable: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },

    // changeOrigin: true,本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了
    // 多路径匹配
    // proxy(['/api', '/ajax', '/someotherpath'], {...})

    // https://mainsite-restapi.ele.me/bgs/weather/current?latitude=40.06206&longitude=116.42469
    context: [ //代理路径
      '/shopping',
      '/ugc',
      '/v1',
      '/v2',
      '/v3',
      '/v4',
      '/bos',
      '/member',
      '/promotion',
      '/eus',
      '/bgs'
    ],
    proxypath: 'https://mainsite-restapi.ele.me',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false// 是否开启 cssSourceMap

  }
}