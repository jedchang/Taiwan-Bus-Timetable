<template>
  <header
    class="page-header"
    :class="{
      'bus-dynamics': titleNameEn === 'Bus Dynamics',
      'bus-faq': titleNameEn === 'Bus FAQ'
    }"
  >
    <div class="container">
      <ol class="bread">
        <li>
          <a href="/">
            <span>首頁</span>
          </a>
        </li>
        <li class="divider">
          <span>//</span>
        </li>
        <li>
          <span> {{ titleNameTw }}</span>
        </li>
      </ol>
      <div class="title">
        <h1>{{ titleNameEn }}</h1>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    titleNameTw: {
      type: String,
      required: true
    },
    titleNameEn: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_pageHeader.scss';
</style>
