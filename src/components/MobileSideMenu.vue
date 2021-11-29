<template>
  <div class="mobile-side-menu">
    <!-- Main panel -->
    <div class="menu-panel">
      <div class="container">
        <div class="menu-wrapper">
          <div class="menu-list">
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
</template>

<script>
import resetAttr from '@/utils/resetAttr.js'

export default {
  name: 'MobileSideMenu',
  data() {
    return {
    }
  },
  mounted() {
    this.resetAttr()
  },
  methods: {
    resetAttr
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/_mobileSideMenu.scss';
</style>
