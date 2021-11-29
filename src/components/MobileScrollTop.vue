<template>
  <div class="mobile-scroll-top-wrapper">
    <a
      href="#"
      class="mobile-scroll-top"
      @click.prevent="scrollTop"
    >
      <p>Scroll</p>
      <img
        src="~@/assets/images/scrollTop-icon.svg"
        alt="Scroll to Top"
        title="Scroll to Top"
      >
      <p>to Top</p>
    </a>
  </div>
</template>

<script>

export default {
  name: 'MobileScrollTop',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_mobileScrollTop.scss';
</style>
