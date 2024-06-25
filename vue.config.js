let proxyObj = {}
proxyObj['/aisite'] = {
  target: 'http://localhost:9090',
  ws: false,
  changeOrigin: true,
  pathRewrite: {
    '^/aisite': '/aisite'
  }
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 9091,
    proxy: proxyObj,
    webSocketServer: false
  }
}
