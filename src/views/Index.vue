<template>
  <div class="wrapper index">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
      >
        <template slot="default">
          <LoadingSvg />
        </template>
      </loading>
    </div>
    <MobileSideMenu />
    <section class="header">
      <nav class="navbar-wrapper">
        <Navbar />
        <MobileNavbar />
      </nav>
      <div class="banner-content">
        <div class="container banner">
          <div class="title">
            <h1>Taiwan Bus Timetable</h1>
            <p>全台公車動態時刻查詢應用服務</p>
          </div>
          <router-link
            to="/bus-dynamics"
            class="btn"
          >
            <span class="material-icons">
              departure_board
            </span>
            <span>立即體驗</span>
          </router-link>
          <div class="bus-image">
            <img
              src="~@/assets/images/bus.png"
              class="bus"
              alt="Bus"
            >
            <img
              src="~@/assets/images/bus-splash.png"
              class="splash"
              alt="Bus"
            >
          </div>
        </div>
      </div>
    </section>
    <div class="page-content">
      <section class="service">
        <div class="container">
          <div class="section-title">
            <span class="line">Welcome</span>
            <h2>我們的服務</h2>
            <p>提供全台最完善、最即時的公車動態服務，把握重要訊息不漏接!</p>
          </div>
          <div class="section-service">
            <div class="row">
              <div class="col-12 col-md-4 dotted-line">
                <div class="icon">
                  <img
                    src="~@/assets/images/services-1.png"
                    alt="Service"
                  >
                </div>
                <h5>公車到站時刻</h5>
                <p>提供最即時的公車預期到站時刻，讓您輕鬆掌握資訊。</p>
              </div>
              <div class="col-12 col-md-4 dotted-line">
                <div class="icon">
                  <img
                    src="~@/assets/images/services-2.png"
                    alt="Service"
                  >
                </div>
                <h5>公車站序列表</h5>
                <p>提供最完整站序列表，清楚了解目前公車到站位置。</p>
              </div>
              <div class="col-12 col-md-4 dotted-line">
                <div class="icon">
                  <img
                    src="~@/assets/images/services-3.png"
                    alt="Service"
                  >
                </div>
                <h5>公車地圖模式</h5>
                <p>提供公車路線地圖瀏覽模式，讓您清楚又明瞭。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Gallery />
    </div>
    <MobileScrollTop />
    <Footer />
    <ScrollTop />
  </div>
</template>
<script>
import LoadingSvg from '@/components/LoadingSvg'
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileSideMenu from '@/components/MobileSideMenu'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import MobileScrollTop from '@/components/MobileScrollTop'

export default {
  name: 'Index',
  components: {
    LoadingSvg,
    Navbar,
    MobileNavbar,
    MobileSideMenu,
    Gallery,
    Footer,
    ScrollTop,
    MobileScrollTop
  },
  data() {
    return {
      isLoading: false
    }
  },
  created() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1200)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/page/_index.scss';
</style>
