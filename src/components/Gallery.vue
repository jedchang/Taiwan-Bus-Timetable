<template>
  <section class="gallery">
    <div class="container">
      <div class="section-title">
        <span class="line">Gallery</span>
        <h2>搭乘的美好時刻</h2>
        <p>我們的服務您放心，用心紀錄與您互動的美好時刻!</p>
      </div>
      <div class="section-photo">
        <div class="row">
          <div class="col-12">
            <vue-picture-swipe
              :items="items"
              :options="{
                shareEl: false,
                zoomEl: false,
                fullscreenEl: false,
                bgOpacity: 0.85
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Gallery',
  data () {
    return {
      items: [
        {
          src: require('../assets/images/gallery-img-1.jpg'),
          thumbnail: require('../assets/images/gallery-img-1s.jpg'),
          w: 1000,
          h: 667,
          alt: 'Gallery'
        },
        {
          src: require('../assets/images/gallery-img-2.jpg'),
          thumbnail: require('../assets/images/gallery-img-2s.jpg'),
          w: 1000,
          h: 667,
          alt: 'Gallery'
        },
        {
          src: require('../assets/images/gallery-img-3.jpg'),
          thumbnail: require('../assets/images/gallery-img-3s.jpg'),
          w: 1000,
          h: 667,
          alt: 'Gallery'
        },
        {
          src: require('../assets/images/gallery-img-4.jpg'),
          thumbnail: require('../assets/images/gallery-img-4s.jpg'),
          w: 1000,
          h: 667,
          alt: 'Gallery'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_gallery.scss';
</style>
