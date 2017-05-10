require('./check-versions')() // 检查 Node 和 npm 版本

/* 
** 如果 Node 的环境无法判断当前是 dev / product 环境
** 使用 config.dev.env.NODE_ENV 作为当前的环境
*/
var config = require('../config') // 获取 config/index.js 的默认配置
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 一个可以强制打开浏览器并跳转到指定 url 的插件
var opn = require('opn')
// 使用 NodeJS 自带的文件路径工具
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// 使用 proxyTable  代理的插架
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend

// https://github.com/chimurai/http-proxy-middleware

// var proxyTable = config.dev.proxyTable

/* 使用 express 启动一个服务 */
var app = express()
// 启动 webpack 编译
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  // quiet: true,// 不打印
  stats: {
    colors: true,
    chunks: false
  }
})
// Hot-reload 热重载插件
//webpack-hot-middleware的作用就是实现浏览器的无刷新更新
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   // 使用代理的中间件
//   app.use(proxyMiddleware(options.filter || context, options))
// })
// 获取要代理路径的匹配的数组
var context = config.dev.context
var proxypath = config.dev.proxypath

var options = {
  target: proxypath,
  changeOrigin: true,
}
if (context.length) {
  app.use(proxyMiddleware(context, options))
}
app.use(proxyMiddleware('/payapi', {
  target: 'https://pay.ele.me',
  changeOrigin: true,
}))
app.use(proxyMiddleware('/m.ele.me@json', {
  target: 'https://crayfish.elemecdn.com',
  changeOrigin: true,
}))
// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// serve pure static assets
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

// 存储一个promise的结果
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// 编译成功后打印网址信息
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
