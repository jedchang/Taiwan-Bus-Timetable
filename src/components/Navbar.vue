<template>
  <!-- Desktop -->
  <div
    id="desktop-navbar"
    class="desktop-navbar navbar"
  >
    <div class="container">
      <div class="navbar-inner">
        <div class="row main">
          <div class="col-3">
            <div class="navbar-header">
              <router-link
                to="/"
                class="navbar-brand"
              >
                <img
                  class="logo"
                  src="~@/assets/images/logo.svg"
                  alt="Logo"
                >
              </router-link>
            </div>
          </div>
          <div class="col-9">
            <div class="main-menu">
              <router-link
                to="/"
                class="menu-item menu-index"
              >
                首頁
                <span class="material-icons">
                  chevron_right
                </span>
              </router-link>
              <router-link
                to="/Bus-Dynamics"
                class="menu-item menu-bus-dynamics"
              >
                公車動態
                <span class="material-icons">
                  chevron_right
                </span>
              </router-link>
              <router-link
                to="/Bus-FAQ"
                class="menu-item menu-bus-faq"
              >
                常見問題
                <span class="material-icons">
                  chevron_right
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  mounted() {
    const desktopNavbar = document.querySelector('#desktop-navbar')
    window.addEventListener('scroll', function() {
      if (window.scrollY > desktopNavbar.offsetTop) {
        desktopNavbar.classList.add('sticky-navbar')
      } else {
        desktopNavbar.classList.remove('sticky-navbar')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_navBar.scss';
</style>
