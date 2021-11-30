<template>
  <div class="return-list list">
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
        v-for="(fr, i) in filterReturnStopsData"
        :key="i"
        class="item-row"
        @click="clickStops(fr.Stops)"
      >
        <div class="item-col stop-sequence">
          <div
            v-if="
              fr.StopStatus === 0 && fr.EstimateTime <= 1
            "
            class="number number-enter"
          >
            {{ fr.StopSequence }}
            <span class="round" />
          </div>
          <div
            v-else
            class="number"
          >
            {{ fr.StopSequence }}
            <span class="round" />
          </div>
        </div>
        <div class="item-col stop-status">
          <!-- 一分鐘內表示進站中 -->
          <div
            v-if="
              fr.StopStatus === 0 && fr.EstimateTime > 1
            "
            class="status status-0"
          >
            {{ fr.EstimateTime }} 分鐘
          </div>
          <div
            v-else-if="
              fr.StopStatus === 0 && fr.EstimateTime <= 1
            "
            class="status status-0 status-enter"
          >
            進站中
          </div>
          <div
            v-else-if="fr.StopStatus === 1"
            class="status status-1"
          >
            尚未發車
          </div>
          <div
            v-else-if="fr.StopStatus === 2"
            class="status status-2"
          >
            交管不停靠
          </div>
          <div
            v-else-if="fr.StopStatus === 3"
            class="status status-3"
          >
            末班車已過
          </div>
          <div
            v-else-if="fr.StopStatus === 4"
            class="status status-4"
          >
            今日未營運
          </div>
        </div>
        <div class="item-col stop-name">
          {{ fr.StopNameZh }}
        </div>
        {{ fr.VehicleStopStatus }}
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
          無返程資料
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ReturnList',
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
    filterReturnStopsData: {
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
