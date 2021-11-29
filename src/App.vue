<template>
  <div id="app">
    <router-view :current-width="screenWidth" />
  </div>
</template>

<script>
import resetAttr from '@/utils/resetAttr.js'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth: {
      handler: function (newValue) {
        const menuPanel = document.querySelector('.menu-panel')
        if (menuPanel.classList.contains('open') && newValue > 767) {
          this.resetAttr()
        }
      }
    }
  },
  mounted() {
    this.resetAttr()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    resetAttr
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url('https://fonts.googleapis.com/css2?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap-grid.min.css');
@import './assets/scss/main.scss';
</style>
