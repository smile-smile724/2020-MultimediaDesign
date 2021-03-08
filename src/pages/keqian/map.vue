<template>
  <div class="map">
    <button
      @click="re()"
      class="map-re"
    ></button>
    <video
      src="../../assets/map_audio.mp4"
      style="position: absolute;"
      autoplay="autoplay"
      id="map_audio"
    ></video>
    <img src="../../assets/map-bg.png" />
    <div id="main-map">
      <img
        src="../../assets/maptext.png"
        class="maptext"
      >
      <img
        src="../../assets/map.png"
        class="map-t"
      />
      <ul class="mapbt">
        <li>
          <div
            id="map_address"
            style="margin: 90px 0 -70px -100px"
          >
            <img
              src="../../assets/hangzhou.png"
              id="map_icon"
              @click="hangzhou()"
            />
            <img
              :src="flag[0]?require('../../assets/map_get.png'):require('../../assets/map_unGet.png')"
              id="point"
            >
          </div>

        </li>
        <li>
          <div id="map_address">

            <img
              src="../../assets/shaoxing.png"
              id="map_icon"
              @click="shaoxing()"
            />
            <img
              :src="flag[1]?require('../../assets/map_get.png'):require('../../assets/map_unGet.png')"
              id="point"
            >
          </div>
        </li>
        <li>
          <div
            id="map_address"
            style="margin: 90px 0 -70px 40px"
          >
            <img
              src="../../assets/wenzhou.png"
              id="map_icon"
              @click="wenzhou()"
            />
            <img
              :src="flag[2]?require('../../assets/map_get.png'):require('../../assets/map_unGet.png')"
              id="point"
            >
          </div>
        </li>
      </ul>
      <img
        src="../../assets/mapTip.png"
        id="mapTip"
      >
    </div>
    <div
      class="mask"
      v-show="close"
      @click="close=false"
    >
      <img src="../../assets/mapmask.png">
      <span class="guide">地图中的每个地点都包含相应的旅行学习打卡点<br>点击地点开始走进他们的山水诗吧！</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "map",
  data() {
    return {
      close: true,
      info: [],
      flag: [false, false, false],
    };
  },
  methods: {
    re() {
      this.$router.push({ path: "/course_learning" });
    },
    wenzhou() {
      this.$router.push({ path: "/wenzhoulist" });
    },
    shaoxing() {
      this.$router.push({ path: "/shaoxinglist" });
    },
    hangzhou() {
      this.$router.push({ path: "/hangzhoulist" });
    },
    audioPlay() {
      this.audio = document.querySelector("#map_audio");
      if (this.audio.paused) {
        this.audio.play();
      } else if (this.audio.play()) {
        this.audio.pause();
      }
    },
    getInfo() {
      var that = this;
      axios
        .get(this.$host + "/query_flag_history")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.info = data.info;
            if (
              that.info.xiangHu &&
              that.info.wuTongXian &&
              that.info.fuChunJiang
            ) {
              that.flag[0] = true;
            }
            if (
              that.info.shiNingShu &&
              that.info.tianMuShan &&
              that.info.jianHu
            ) {
              that.flag[1] = true;
            }
            if (
              that.info.yanDangShan &&
              that.info.yongJiaXian &&
              that.info.nanXiJiang &&
              that.info.jiangXinYu
            ) {
              that.flag[2] = true;
            }
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 960px;
  min-width: 1900px;
  background: rgba(226, 221, 213, 1);
}
.map img {
  width: 83%;
  height: 847px;
  position: absolute;
  top: 104px;
  left: 8.6%;
}
#main-map {
  width: 100%;
  height: 100%;
  position: absolute;
}
#main-map .map-t {
  width: 46%;
  height: 752px;
  display: block;
  position: absolute;
  top: 159px;
  left: 26%;
}
.mapbt {
  list-style: none;
}
#map_address {
  width: 66px;
  height: 155px;
  position: relative;
  left: 51%;
  top: 120px;
  display: block;
  cursor: pointer;
  transition: all 0.75s;
}
#map_icon {
  width: 100%;
  height: 100%;
}
.map li:hover img{
  transform: scale(1.1);
}
.map .map-re {
  width: 253px;
  height: 69px;
  background: url("../../assets/return.png");
  outline: none;
  border: none;
  position: absolute;
  top: 33px;
  left: 54px;
  z-index: 1;
  cursor: pointer;
}
#main-map .maptext {
  position: absolute;
  left: -28.1%;
  top: 140px;
  width: 78%;
  height: 793px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(229, 229, 229, 0.41);
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.guide {
  width: 39.2%;
  height: 104px;
  position: absolute;
  left: 30%;
  top: 488px;
  color: rgba(140, 83, 83, 1);
  font-size: 35px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
.mask img {
  width: 44.8%;
  height: 251px;
  position: absolute;
  top: 415px;
  left: 27.2%;
}
#mapTip {
  width: 200px;
  height: 196px;
  position: absolute;
  left: 1420px;
  top: 130px;
}
#point {
  width: 40px;
  height: 40px;
  margin-left:-20px;
}
</style>