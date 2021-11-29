<template>
  <div class="wrapper">
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
      <Navbar />
      <MobileNavbar />
      <PageHeader
        :title-name-tw="titleTextTw"
        :title-name-en="titleTextEn"
      />
    </section>
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="main-content">
              <section class="bus-faq share-title">
                <div class="title">
                  <span class="line">Bus FAQ</span>
                  <h2>公車常見問題</h2>
                  <p>時常坐公車的您，是否有遇過司機的態度很不好、車上有人飲食亂丟垃圾等問題呢?</p>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="faq-content">
              <el-collapse
                accordion
              >
                <el-collapse-item name="1">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>如何檢舉公車交通違規事項？</span>
                  </template>
                  <div>
                    公車交通違規事項可向 <a
                      href="https://tvrs.ntpd.gov.tw/"
                      target="_blank"
                    >本府警察局交通違規檢舉系統反映</a>
                  </div>
                  <div>亦可洽詢交通警察大隊(02)2225-5999</div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>駕駛可配戴藍芽耳機嗎?</span>
                  </template>
                  <div>
                    目前並無法令強制規定限制駕駛於行駛中使用藍芽耳機，但基於行車安全，本局已宣導客運駕駛應秉持專心行駛，非不得已情況不使用。
                  </div>
                  <div>依據道路交通管理處罰條例第三十一條之一規定：「汽車駕駛人於行駛道路時，使用手持式行動電話進行撥接或通話者，處新臺幣3,000元罰鍰。」另因市區內路況瞬息萬變，為避免駕駛分心，無法注意突發狀況，仍不建議市區公車駕駛使用免持裝置接聽行動電話，以維民眾搭乘權益及用路人、車之安全。</div>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>公車上可飲食嗎？</span>
                  </template>
                  <div>
                    目前並無法令強制規定限制旅客飲食，但為維謢車內清潔環境，請駕駛委婉勸導。
                  </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>搭乘公車溢刷票卡如何處理？</span>
                  </template>
                  <div>
                    可提供電子票證 (悠遊卡、一卡通、iCash2、HappyCash) 卡號等資料逕電洽各客運業者查詢退費。
                  </div>
                </el-collapse-item>
                <el-collapse-item name="5">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>可攜帶寵物上公車及須另收費嗎？</span>
                  </template>
                  <div>
                    目前各公司並無強制規定限制旅客攜帶寵物及訂定收費辦法。
                  </div>
                </el-collapse-item>
                <el-collapse-item name="6">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>搭乘公車遺失物品如何協尋？</span>
                  </template>
                  <div>
                    請直接向所搭乘公車路線調度站洽詢協助辦理，調度站電話可於公車站牌上的路線圖找到。
                  </div>
                  <div>
                    亦可撥打所搭乘公車業者服務電話洽請公車業者協尋。
                  </div>
                </el-collapse-item>
                <el-collapse-item name="7">
                  <template slot="title">
                    <span class="material-icons">
                      help_outline
                    </span>
                    <span>如何申訴公車業者或查詢公車業者資料?</span>
                  </template>
                  <div>
                    如欲申訴，請提供乘車日期、時間、路線編號、車號與申訴情事。至各公車業者網址及各公車業者申訴電話撥打進行申訴。
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileScrollTop />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
// @ is an alias to /src
import LoadingSvg from '@/components/LoadingSvg'
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileSideMenu from '@/components/MobileSideMenu'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import MobileScrollTop from '@/components/MobileScrollTop'

export default {
  name: 'BusFaq',
  components: {
    LoadingSvg,
    Navbar,
    MobileNavbar,
    MobileSideMenu,
    PageHeader,
    Footer,
    ScrollTop,
    MobileScrollTop
  },
  data() {
    return {
      isLoading: false,
      titleTextTw: '常見問題',
      titleTextEn: 'Bus FAQ'
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

<style scoped lang="scss">
@import '@/assets/scss/shared/_mainContent.scss';
@import '@/assets/scss/page/_busFaq.scss';
</style>
