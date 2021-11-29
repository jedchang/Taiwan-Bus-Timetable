<template>
  <div class="wrapper">
    <div class="vld-parent">
      <loading :active.sync="isLoading">
        <template slot="default">
          <LoadingSvg />
        </template>
      </loading>
    </div>
    <MobileSideMenu />
    <section class="header">
      <Navbar />
      <MobileNavbar />
      <PageHeader
        :title-name-tw="titleTextTw"
        :title-name-en="titleTextEn"
      />
    </section>
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="main-content">
              <section class="bus-dynamics share-title">
                <div class="title">
                  <span class="line">Bus RouteName</span>
                  <h2>
                    查詢公車即時動態
                    <a
                      href="#"
                      class="remark"
                      title="備註說明"
                      @click.prevent="dialogVisible = true"
                    >
                      <span class="material-icons"> info </span>
                    </a>
                  </h2>
                  <p>
                    選擇相對應縣市後，再選擇要查詢公車路線，即可顯示相關停靠站序、公車到站時刻等。
                  </p>
                </div>
              </section>
              <el-dialog
                title="備註說明"
                :visible.sync="dialogVisible"
                :lock-scroll="false"
                :append-to-body="true"
                width="30%"
              >
                <span>部分縣市中，會有些許路線中會有多條<strong>附屬路線資料</strong>，例如：臺北市
                  [0東 臺北車站-內湖]、[綠1 臺北車站-新店] 路線等。</span>
                <span
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="dialogVisible = false"
                  >確 定</el-button>
                </span>
              </el-dialog>
              <section class="select-sidebar">
                <div class="select-item city-item">
                  <label
                    for="citySelect"
                    class="label"
                  >選擇地區</label>
                  <el-select
                    v-model="cityName"
                    placeholder="例如：臺北市"
                    @change="getRouteName"
                  >
                    <el-option
                      v-for="(c, i) in cityData"
                      :key="i"
                      :label="c.CityName"
                      :value="c.City"
                    />
                  </el-select>
                </div>
                <div class="select-item route-item">
                  <label
                    for="citySelect"
                    class="label"
                  >選擇公車路線</label>
                  <el-select
                    v-model="routeName"
                    filterable
                    placeholder="例如：0東、綠1、234"
                    no-data-text="請先選擇縣市"
                    no-match-text="沒有資料符合"
                    @change="getStopOfRoute"
                  >
                    <el-option
                      v-for="s in setAllRouteStopNameData"
                      :key="s.RouteID"
                      :label="s.displayRouteName"
                      :value="s.RouteName"
                    />
                  </el-select>
                </div>
              </section>
              <section class="route-content">
                <div
                  v-if="routeName"
                  class="display-name"
                >
                  <div class="name-wrapper">
                    <div class="route-name">
                      <p class="txt">
                        Route Name
                      </p>
                      <p class="route">
                        {{ routeName }}
                      </p>
                    </div>
                    <div class="outward-return">
                      <div class="txt">
                        Departure & Destination Stop Name
                      </div>
                      <div class="outward-return-name">
                        <div class="name-item">
                          {{ destinationStopNameZh }}
                        </div>
                        <span class="material-icons"> height </span>
                        <div class="name-item">
                          {{ departureStopNameZh }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="outwardStopOfRouteData.length > 1"
                    class="sub-name-wrapper"
                  >
                    <div class="sub-route-name">
                      <p class="txt">
                        附屬路線，共有
                      </p>
                      <p class="route">
                        {{ outwardStopOfRouteData.length }}
                      </p>
                      <p class="txt">
                        條
                      </p>
                    </div>
                    <div class="sub-route-list">
                      <a
                        v-for="(o, i) in outwardStopOfRouteData"
                        :key="o.SubRouteID"
                        href="#"
                        class="sub-route-item item"
                        :class="{
                          active: subRouteName === o.SubRouteName.Zh_tw
                        }"
                        @click.prevent="changeSubRouteStops(i)"
                      >
                        {{ o.SubRouteName.Zh_tw }}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="display-stops-map">
                  <section class="stops-content">
                    <el-tabs
                      v-if="routeName"
                      v-model="activeName"
                      type="card"
                      @tab-click="tabsToggle()"
                    >
                      <el-tab-pane name="outward">
                        <span
                          slot="label"
                          class="label"
                        >
                          去程
                          <span class="route">
                            {{ destinationStopNameZh }}
                          </span>
                        </span>
                        <div class="list outward-list">
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
                                  v-if="
                                    fo.StopStatus === 0 && fo.EstimateTime <= 1
                                  "
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
                                <div
                                  v-if="
                                    fo.StopStatus === 0 && fo.EstimateTime > 1
                                  "
                                  class="status status-0"
                                >
                                  {{ fo.EstimateTime }} 分鐘
                                </div>
                                <div
                                  v-else-if="
                                    fo.StopStatus === 0 && fo.EstimateTime <= 1
                                  "
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
                        </div>
                      </el-tab-pane>
                      <el-tab-pane name="return">
                        <span
                          slot="label"
                          class="label"
                        >
                          返程
                          <span class="route">
                            {{ departureStopNameZh }}
                          </span>
                        </span>
                        <div class="list return-list">
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
                      </el-tab-pane>
                    </el-tabs>
                    <div
                      v-else
                      class="no-data"
                    >
                      <div class="txt-info">
                        <span class="material-icons"> bus_alert </span>
                        <p class="txt">
                          <span>請先選擇地區</span>
                          <span>再選擇/搜尋公車路線</span>
                        </p>
                      </div>
                    </div>
                  </section>
                  <section class="map-content">
                    <div
                      v-if="isMapToggle"
                      class="btn-map-toggle"
                      @click="mapToggle"
                    >
                      顯示地圖
                    </div>
                    <div
                      v-if="!isMapToggle"
                      class="btn-map-toggle"
                      @click="mapToggle"
                    >
                      關閉地圖
                    </div>
                    <div id="map" />
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      v-if="busEstimatedTimeData.length > 0"
      href="#"
      class="timer-item"
      @click.prevent="clickUpdate"
    >
      <div class="info">
        <span class="txt">更新時間</span>
        <div class="timer">
          <span class="number"> {{ timer }} </span>
          <span>秒</span>
        </div>
      </div>
    </a>
    <MobileScrollTop />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
// @ is an alias to /src
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { antPath } from 'leaflet-ant-path'
import LoadingSvg from '@/components/LoadingSvg'
import Navbar from '@/components/Navbar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileSideMenu from '@/components/MobileSideMenu'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import MobileScrollTop from '@/components/MobileScrollTop'
import city from '../utils/city.json'
import jsSHA from 'jssha'
import Wkt from 'wicket'

const stopIcon = new L.icon({
  iconUrl: require('@/assets/images/icon-marker-stop.png'),
  iconSize: [26, 26],
  iconAnchor: [13, 0],
  popupAnchor: [1, 0]
})

const createPopup = function (options) {
  const popup = L.popup(options)
  return popup
}

const createMarker = function (coordinate, options = {}) {
  const marker = L.marker(coordinate, options)
  return marker
}

export default {
  name: 'BusDynamics',
  components: {
    LoadingSvg,
    Navbar,
    MobileNavbar,
    MobileSideMenu,
    PageHeader,
    Footer,
    ScrollTop,
    MobileScrollTop
  },
  props: {
    currentWidth: {
      type: Number,
      default: 1200
    }
  },
  data() {
    return {
      isLoading: false,
      titleTextTw: '公車動態',
      titleTextEn: 'Bus Dynamics',
      dialogVisible: false,
      activeName: 'outward',
      cityData: city,
      cityName: '',
      isMapToggle: false,
      routeName: '',
      subRouteName: '',
      setRouteStopNameData: [],
      setSubRouteStopNameData: [],
      setAllRouteStopNameData: [],
      routeData: [],
      subRouteData: [],
      busStopOfRouteData: [],
      outwardStopOfRouteData: [],
      outwardStopsArray: [],
      returnStopOfRouteData: [],
      returnStopsArray: [],
      busEstimatedTimeData: [],
      departureStopNameZh: '',
      destinationStopNameZh: '',
      filterOutwardStopsData: [],
      filterReturnStopsData: [],
      busGeometryData: [],
      geojsonFeature: null,
      subRouteIndex: 0,
      timeOutRefresh: '',
      timer: 30,
      map: null,
      mapOptions: {
        center: [23.92275, 120.98979],
        zoom: 8,
        zoomControl: true
      }
    }
  },
  created() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1200)
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new L.map('map', this.mapOptions).setView(
        this.mapOptions.center,
        this.mapOptions.zoom
      )
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.VUE_APP_ACCESSTOKEN
        }
      ).addTo(this.map)
    },
    clickStops(item) {
      const popup = createPopup({
        minWidth: 220,
        className: 'leaflet-popup'
      })
      const tempLongitude = item.StopPosition.PositionLon
      const tempLatitude = item.StopPosition.PositionLat
      popup
        .setLatLng([tempLatitude, tempLongitude])
        .setContent(this.popupContent(item))
      this.map.openPopup(popup)
      this.map.panTo([tempLatitude, tempLongitude], 18)
      this.map.setView([tempLatitude, tempLongitude], 18)
    },
    popupContent(item) {
      return `
        <div class="station-popup">
          <div class="info">
            <div class="sequence">${item.StopSequence}</div>
            <h2>${item.StopName.Zh_tw}</h2>
          </div>
        </div>
      `
    },
    setMarkers(data) {
      const tempPosition = data.map(position => {
        return [
          position.StopPosition.PositionLat,
          position.StopPosition.PositionLon
        ]
      })
      const tempIndex = Math.round(tempPosition.length / 2)
      const tempCenterPosition = tempPosition[tempIndex]
      this.mapOptions.center = tempCenterPosition
      this.mapOptions.zoom = 15
      this.map.setView(this.mapOptions.center, this.mapOptions.zoom)
      data.forEach(item => {
        const marker = createMarker(
          [item.StopPosition.PositionLat, item.StopPosition.PositionLon],
          { icon: stopIcon }
        )
        this.map.addLayer(marker)
        const popup = createPopup({
          minWidth: 220,
          className: 'leaflet-popup'
        })
        popup.setContent(this.popupContent(item))
        marker.bindPopup(popup)
      })
    },
    removeMarkers() {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer)
        }
      })
    },
    removeExistingLayers() {
      this.map.removeLayer(this.myLayer)
      this.map.removeLayer(this.setMarkers)
    },
    mapToggle() {
      this.isMapToggle = !this.isMapToggle
      const mapContent = document.querySelector('.map-content')
      const StopsContent = document.querySelector('.stops-content')
      mapContent.classList.toggle('active')
      StopsContent.classList.toggle('active')
    },
    tabsToggle() {
      if (this.myLayer) {
        this.removeExistingLayers()
      }
      this.map.closePopup()
      this.getEstimatedTimeOfArrival()
      this.clearCountDownUpdate(this.timeOutRefresh)
      this.countDownUpdate()
      this.getGeometry()
    },
    clickUpdate() {
      this.getEstimatedTimeOfArrival()
      this.clearCountDownUpdate(this.timeOutRefresh)
      this.countDownUpdate()
      if (this.currentWidth > 577 && this.currentWidth <= 766) {
        window.scrollTo(0, 820)
      } else if (this.currentWidth < 576) {
        window.scrollTo(0, 820)
      }
    },
    countDownUpdate() {
      this.timeOutRefresh = window.setInterval(() => {
        this.timer--
        if (this.timer < 0) {
          this.getEstimatedTimeOfArrival()
          this.clearCountDownUpdate(this.timeOutRefresh)
          this.countDownUpdate()
        }
      }, 1000)
    },
    clearCountDownUpdate(item) {
      this.timer = 30
      this.timeOutRefresh = ''
      window.clearInterval(item)
    },
    changeSubRouteStops(index) {
      this.subRouteIndex = index
      this.subRouteName =
        this.outwardStopOfRouteData[`${this.subRouteIndex}`].SubRouteName.Zh_tw
      this.outwardStopsArray =
        this.outwardStopOfRouteData[`${this.subRouteIndex}`].Stops
      this.returnStopsArray =
        this.returnStopOfRouteData[`${this.subRouteIndex}`].Stops
      this.getEstimatedTimeOfArrival()
    },
    setAllRouteName() {
      this.setRouteName()
      this.setSubRouteName()
      this.setAllRouteStopNameData = this.setRouteStopNameData.concat(
        this.setSubRouteStopNameData
      )
    },
    setRouteName() {
      this.routeData.forEach(item => {
        this.setRouteStopNameData.push({
          RouteID: item.RouteID,
          RouteName: item.RouteName.Zh_tw,
          DepartureStopNameZh: item.DepartureStopNameZh,
          DestinationStopNameZh: item.DestinationStopNameZh,
          SubRoutes: item.SubRoutes,
          displayRouteName: `[${item.RouteName.Zh_tw}] ${item.DestinationStopNameZh} - ${item.DepartureStopNameZh}`
        })
      })
      this.setRouteStopNameData.sort(function (a, b) {
        return a.RouteName.localeCompare(b.RouteName)
      })
    },
    setSubRouteName() {
      this.subRouteData.forEach(item => {
        this.setSubRouteStopNameData.push({
          RouteID: item.RouteID,
          RouteName: item.RouteName.Zh_tw,
          DepartureStopNameZh: item.DepartureStopNameZh,
          DestinationStopNameZh: item.DestinationStopNameZh,
          SubRoutes: item.SubRoutes,
          displayRouteName: `[${item.RouteName.Zh_tw}] ${item.DestinationStopNameZh} - ${item.DepartureStopNameZh}`
        })
      })
      this.setSubRouteStopNameData.sort(function (a, b) {
        return a.RouteName.localeCompare(b.RouteName)
      })
    },
    setRouteStopName() {
      this.setAllRouteStopNameData.forEach(item => {
        if (item.RouteName === this.routeName) {
          this.departureStopNameZh = item.DepartureStopNameZh
          this.destinationStopNameZh = item.DestinationStopNameZh
        }
      })
    },
    createPolyLine() {
      if (this.myLayer) {
        this.removeExistingLayers()
      }
      const tempGeometry = this.busGeometryData.filter(item => {
        return item.RouteName.Zh_tw === this.routeName
      })
      const wkt = new Wkt.Wkt()
      this.geojsonFeature = wkt.read(tempGeometry[0].Geometry).toJson()
      const reverseLatLng = this.geojsonFeature.coordinates
      reverseLatLng.forEach(item => item.reverse())
      const options = {
        paused: false,
        reverse: false,
        delay: 2000,
        dashArray: [10, 20],
        weight: 6,
        color: '#ff4c29',
        opacity: 0.7
      }
      this.myLayer = antPath(reverseLatLng, options).addTo(this.map)
      this.map.fitBounds(this.myLayer.getBounds())
    },
    getGeometry() {
      this.isLoading = true
      this.axios({
        methods: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/${this.cityName}/${this.routeName}?$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.busGeometryData = []
          this.busGeometryData = res.data
          this.createPolyLine()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getRouteName() {
      this.isLoading = true
      if (
        this.setRouteStopNameData.length > 0 ||
        this.busStopOfRouteData.length > 0
      ) {
        this.routeName = ''
        this.setRouteStopNameData = []
        this.setSubRouteStopNameData = []
        this.setAllRouteStopNameData = []
        this.busEstimatedTimeData = []
        this.removeMarkers()
        this.activeName = 'outward'
      }
      if (this.myLayer) {
        this.removeExistingLayers()
        this.mapOptions.zoom = 8
        this.mapOptions.center = [23.92275, 120.98979]
        this.map.setView(this.mapOptions.center, this.mapOptions.zoom)
      }
      this.axios({
        methods: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.cityName}?$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          const tempData = res.data
          if (this.timer !== 30) {
            this.clearCountDownUpdate(this.timeOutRefresh)
          }
          this.routeData = tempData.filter(item => {
            return item.SubRoutes.length <= 2
          })
          this.subRouteData = tempData.filter(item => {
            return item.SubRoutes.length > 2
          })
          this.setAllRouteName()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getEstimatedTimeOfArrival() {
      this.isLoading = true
      if (this.busStopOfRouteData.length > 0) {
        this.filterOutwardStopsData = []
        this.filterReturnStopsData = []
        this.removeMarkers()
      }
      this.axios({
        methods: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.cityName}/${this.routeName}?$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.setRouteStopName()
          this.busEstimatedTimeData = res.data
          const tempOutwardEstimatedTime = this.busEstimatedTimeData.filter(
            item => item.Direction === 0 || item.Direction === 255
          )
          const tempReturnEstimatedTime = this.busEstimatedTimeData.filter(
            item => item.Direction === 1 || item.Direction === 255
          )
          const tempOutwardStops = this.outwardStopOfRouteData.map(item => {
            return item.Stops
          })
          const tempReturnStops = this.returnStopOfRouteData.map(item => {
            return item.Stops
          })
          this.outwardStopsArray = [].concat(...tempOutwardStops)
          this.returnStopsArray = [].concat(...tempReturnStops)
          if (this.outwardStopOfRouteData.length > 1) {
            this.subRouteName = this.outwardStopOfRouteData[`${this.subRouteIndex}`].SubRouteName.Zh_tw
            this.outwardStopsArray =
              this.outwardStopOfRouteData[`${this.subRouteIndex}`].Stops
            tempOutwardEstimatedTime.forEach(estimatedTimeItem => {
              if (estimatedTimeItem.RouteName.Zh_tw === this.routeName) {
                this.outwardStopsArray.forEach(item => {
                  if (item.StopUID === estimatedTimeItem.StopUID) {
                    this.filterOutwardStopsData.push({
                      RouteID: estimatedTimeItem.RouteID,
                      RouteUID: estimatedTimeItem.RouteUID,
                      StopID: estimatedTimeItem.StopID,
                      StopStatus: estimatedTimeItem.StopStatus,
                      StopNameZh: estimatedTimeItem.StopName.Zh_tw,
                      Stops: item,
                      StopSequence: item.StopSequence,
                      EstimateTime: Math.floor(
                        estimatedTimeItem.EstimateTime / 60
                      )
                    })
                  }
                })
              }
            })
          } else {
            tempOutwardEstimatedTime.forEach(estimatedTimeItem => {
              if (estimatedTimeItem.RouteName.Zh_tw === this.routeName) {
                this.outwardStopsArray.forEach(item => {
                  if (item.StopUID === estimatedTimeItem.StopUID) {
                    this.filterOutwardStopsData.push({
                      RouteID: estimatedTimeItem.RouteID,
                      RouteUID: estimatedTimeItem.RouteUID,
                      StopID: estimatedTimeItem.StopID,
                      StopStatus: estimatedTimeItem.StopStatus,
                      StopNameZh: estimatedTimeItem.StopName.Zh_tw,
                      Stops: item,
                      StopSequence: item.StopSequence,
                      EstimateTime: Math.floor(
                        estimatedTimeItem.EstimateTime / 60
                      )
                    })
                  }
                })
              }
            })
          }
          if (this.returnStopOfRouteData.length > 1) {
            this.returnStopsArray =
              this.returnStopOfRouteData[`${this.subRouteIndex}`].Stops
            tempReturnEstimatedTime.forEach(estimatedTimeItem => {
              if (estimatedTimeItem.RouteName.Zh_tw === this.routeName) {
                this.returnStopsArray.forEach(item => {
                  if (item.StopUID === estimatedTimeItem.StopUID) {
                    this.filterReturnStopsData.push({
                      RouteID: estimatedTimeItem.RouteID,
                      RouteUID: estimatedTimeItem.RouteUID,
                      StopID: estimatedTimeItem.StopID,
                      StopStatus: estimatedTimeItem.StopStatus,
                      StopNameZh: estimatedTimeItem.StopName.Zh_tw,
                      Stops: item,
                      StopSequence: item.StopSequence,
                      EstimateTime: Math.floor(
                        estimatedTimeItem.EstimateTime / 60
                      )
                    })
                  }
                })
              }
            })
          } else {
            tempReturnEstimatedTime.forEach(estimatedTimeItem => {
              if (estimatedTimeItem.RouteName.Zh_tw === this.routeName) {
                this.returnStopsArray.forEach(item => {
                  if (item.StopUID === estimatedTimeItem.StopUID) {
                    this.filterReturnStopsData.push({
                      RouteID: estimatedTimeItem.RouteID,
                      RouteUID: estimatedTimeItem.RouteUID,
                      StopID: estimatedTimeItem.StopID,
                      StopStatus: estimatedTimeItem.StopStatus,
                      StopNameZh: estimatedTimeItem.StopName.Zh_tw,
                      Stops: item,
                      StopSequence: item.StopSequence,
                      EstimateTime: Math.floor(
                        estimatedTimeItem.EstimateTime / 60
                      )
                    })
                  }
                })
              }
            })
          }
          this.filterOutwardStopsData.sort(function (a, b) {
            return a.StopSequence - b.StopSequence
          })
          this.filterReturnStopsData.sort(function (a, b) {
            return a.StopSequence - b.StopSequence
          })
          this.isLoading = false
          if (this.activeName === 'outward') {
            this.map.addLayer(this.setMarkers(this.outwardStopsArray))
          } else {
            this.map.addLayer(this.setMarkers(this.returnStopsArray))
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getStopOfRoute() {
      this.isLoading = true
      this.axios({
        methods: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.cityName}/${this.routeName}?$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          if (this.currentWidth > 992) {
            window.scrollTo(0, 800)
          } else if (this.currentWidth > 769 && this.currentWidth <= 991) {
            window.scrollTo(0, 690)
          } else if (this.currentWidth > 577 && this.currentWidth <= 766) {
            window.scrollTo(0, 820)
          } else if (this.currentWidth < 576) {
            window.scrollTo(0, 820)
          }
          this.busStopOfRouteData = res.data
          if (this.timer !== 30) {
            this.clearCountDownUpdate(this.timeOutRefresh)
          }
          this.countDownUpdate()
          if (this.busStopOfRouteData.length > 0) {
            this.filterOutwardStopsData = []
            this.filterReturnStopsData = []
            this.removeMarkers()
            this.activeName = 'outward'
          }
          const matchStopOfRoute = this.busStopOfRouteData.filter(item => {
            if (item.RouteName.Zh_tw === this.routeName) {
              return item
            }
          })
          this.outwardStopOfRouteData = matchStopOfRoute.filter(
            item => item.Direction === 0 || item.Direction === 255
          )
          this.returnStopOfRouteData = matchStopOfRoute.filter(
            item => item.Direction === 1 || item.Direction === 255
          )
          this.getEstimatedTimeOfArrival()
          this.getGeometry()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getAuthorizationHeader() {
      const AppID = process.env.VUE_APP_APPID
      const AppKey = process.env.VUE_APP_APPKEY
      const GMTString = new Date().toGMTString()
      const ShaObj = new jsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"'
      return { Authorization: Authorization, 'X-Date': GMTString }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/shared/_selectSidebar.scss';
@import '@/assets/scss/shared/_mainContent.scss';
@import '@/assets/scss/page/_busDynamics.scss';
</style>
