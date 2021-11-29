<template>
  <!-- Mobile -->
  <div
    id="mobile-navbar"
    class="mobile-navbar navbar"
  >
    <a
      href="#"
      class="navbar-toggle"
      @click.prevent="toggleMenu"
    >
      <svg
        class="hamburger"
        viewBox="0 0 100 100"
      >
        <path
          class="line top"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        />
        <path
          class="line middle"
          d="m 30,50 h 40"
        />
        <path
          class="line bottom"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        />
      </svg>
    </a>
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
</template>
<script>
export default {
  name: 'MobileNavbar',
  methods: {
    toggleMenu() {
      const body = document.querySelector('body')
      const hamburger = document.querySelector('.hamburger')
      const menuPanel = document.querySelector('.menu-panel')
      const navBarToggle = document.querySelector('.navbar-toggle')
      body.classList.toggle('fixed-menu')
      hamburger.classList.toggle('active')
      menuPanel.classList.toggle('open')
      navBarToggle.classList.toggle('fixed')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_mobileNavBar.scss';
</style>
