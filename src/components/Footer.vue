<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 desktop">
          <div class="copyright-text">
            © 2021 All rights reserved. Design & Code with
            <span class="material-icons">
              favorite
            </span>
            by
            <a
              href="https://github.com/jedchang"
              target="_blank"
            >Jed Chang</a>
          </div>
        </div>
        <div class="col-12 mobile">
          <div class="copyright-text txt">
            © 2021 All rights reserved.
          </div>
          <div class="design-code txt">
            Design & Code with
            <span class="material-icons">
              favorite
            </span>
            by
            <a
              href="https://github.com/jedchang"
              target="_blank"
            >Jed Chang</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_footer.scss';
</style>
