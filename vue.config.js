module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwan-Bus-Timetable/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '全台公車動態時刻查詢應用服務'
      args[0].keywords = '全台公車動態時刻查詢應用服務'
      args[0].description = '公車動態隨時查，轉車順暢沒煩惱！'
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/scss/utils/_variables.scss";
          @import "~@/assets/scss/utils/_transition.scss";
          @import "~@/assets/scss/utils/_mixins.scss";
        `
      }
    }
  }
}
