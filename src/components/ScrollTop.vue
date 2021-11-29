<template>
  <a
    href="#"
    class="scroll-top"
    @click.prevent="scrollTop"
  >
    <img
      src="~@/assets/images/scrollTop-icon.svg"
      alt="Scroll to Top"
      title="Scroll to Top"
    >
  </a>
</template>

<script>
export default {
  name: 'ScrollTop',
  data() {
    return {}
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScroll)
  },
  methods: {
    handlerScroll() {
      const scrollTop = document.querySelector('.scroll-top')
      if (window.scrollY > 300) {
        scrollTop.classList.add('show')
      } else {
        scrollTop.classList.remove('show')
      }
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/scss/components/_scrollTop.scss';
</style>
