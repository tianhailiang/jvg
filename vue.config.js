module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9090,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      '/api': {
        target: 'http://123.206.80.226:9082',
        changeOrigin: true,
        secure: false,
        // ws: true,
        pathRewrite: {'^/api': '/api'}
      }//,//proxyObj, // string | Object
      //before: app => {
      //}
    }
  }
}