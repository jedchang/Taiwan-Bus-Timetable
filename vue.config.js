module.exports = {
  // 如果環境是生產模式，就使用 gitHub pages 路徑，不然就用根目錄
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwan-Bus-Timetable/' : '/',

  // 本地預覽 file:// 改為相對路徑 './'
  // publicPath: './'

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '全台公車動態時刻查詢應用服務'
      args[0].keywords = '全台公車動態時刻查詢應用服務'
      args[0].description = '公車動態隨時查，轉車順暢沒煩惱！'
      return args
    })
  },

  // 使用 scss 全域變數
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
