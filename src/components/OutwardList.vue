<template>
  <div class="outward-list list">
    <div class="item-thead">
      <div class="item-col stop-sequence">
        站序
      </div>
      <div class="item-col stop-status">
        預估到站
      </div>
      <div class="item-col stop-name">
        站名
      </div>
    </div>
    <div
      v-if="cityName !== '' && routeName !== ''"
      class="item-tbody"
    >
      <div
        v-for="(fo, i) in filterOutwardStopsData"
        :key="i"
        class="item-row"
        @click="clickStops(fo.Stops)"
      >
        <div class="item-col stop-sequence">
          <div
            v-if="fo.StopStatus === 0 && fo.EstimateTime <= 1"
            class="number number-enter"
          >
            {{ fo.StopSequence }}
            <span class="round" />
          </div>
          <div
            v-else
            class="number"
          >
            {{ fo.StopSequence }}
            <span class="round" />
          </div>
        </div>
        <div class="item-col stop-status">
          <!-- 一分鐘內表示進站中 -->
          <div
            v-if="fo.StopStatus === 0 && fo.EstimateTime > 1"
            class="status status-0"
          >
            {{ fo.EstimateTime }} 分鐘
          </div>
          <div
            v-else-if="fo.StopStatus === 0 && fo.EstimateTime <= 1"
            class="status status-0 status-enter"
          >
            進站中
          </div>
          <div
            v-else-if="fo.StopStatus === 1"
            class="status status-1"
          >
            尚未發車
          </div>
          <div
            v-else-if="fo.StopStatus === 2"
            class="status status-2"
          >
            交管不停靠
          </div>
          <div
            v-else-if="fo.StopStatus === 3"
            class="status status-3"
          >
            末班車已過
          </div>
          <div
            v-else-if="fo.StopStatus === 4"
            class="status status-4"
          >
            今日未營運
          </div>
        </div>
        <div class="item-col stop-name">
          {{ fo.StopNameZh }}
        </div>
        {{ fo.VehicleStopStatus }}
      </div>
    </div>
    <!-- 若無資料，捲軸高度隱藏 -->
    <div
      v-else
      class="item-tbody"
      :class="{
        hidden: cityName === '' && routeName === ''
      }"
    >
      <div class="item-row">
        <div class="item-col">
          無去程資料
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'OutwardList',
  props: {
    map: {
      type: Object,
      required: true
    },
    cityName: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    filterOutwardStopsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    clickStops(data) {
      this.$emit('updateClickStops', data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_list.scss';
</style>
