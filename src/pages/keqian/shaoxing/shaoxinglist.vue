<template>
  <div class="main">
    <button
      @click="re()"
      class="return"
    ></button>
    <img
      src="../../../assets/shaoxing-gb.png"
      id="shaoxingbg"
    >
    <div class="box">
      <div class="tooltip1">
        <div class="shiningshu">
          <img
            src="../../../assets/shiningshu.png"
            id="icon"
            @click="sns()"
          >
          <img
            :src="info.shiNingShu?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <!-- <span class="tooltiptext1">{{ tooltipyds }}</span> -->
      </div>
      <img
        src="../../../assets/shaoxing-lake.png"
        class="lake"
      >

      <div class="tooltip2">
        <div class="tianlaoshan">
          <img
            src="../../../assets/tianlaoshan.png"
            @click="tls()"
            id="icon"
          >
          <img
            :src="info.tianMuShan?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <!-- <span class="tooltiptext2">{{ tooltipyjx }}</span> -->
      </div>
      <div class="tooltip3">
        <div class="jianhu">
          <img
            src="../../../assets/jianhu.png"
            @click="jh()"
            id="icon"
          >
          <img
            :src="info.jianHu?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <!-- <span class="tooltiptext3">{{ tooltipnxj }}</span> -->
      </div>
      <img
        src="../../../assets/shaoxing-house.png"
        class="house"
      >
      <img
        src="../../../assets/shaoxing-mt.png"
        class="mt"
      >
    </div>

  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      info: {
        id: null,
        yongJiaXian: false,
        nanXiJiang: false,
        tianMuShan: false,
        shiNingShu: false,
        jianHu: false,
        xiangHu: false,
        wuTongXian: false,
        fuChunJiang: false,
        yanDangShan: false,
        jiangXinYu: false,
      },
    };
  },
  methods: {
    sns() {
        var data={
            shiNingShu:true
        }
        this.postInfo(data,"/shiningshu")
    },
    tls() {
        var data={
            tianMuShan:true
        }
        this.postInfo(data,"/tianlaoshan")
    },
    jh() {
        var data={
            jianHu:true
        }
        this.postInfo(data,"/jianhu")
    },
    re() {
      this.$router.push({ path: "/map" });
    },
    getInfo() {
      var that = this;
      axios
        .get(this.$host + "/query_flag_history")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.info = data.info;
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    postInfo(redata, goToPath) {
      axios({
        method: "post",
        url: this.$host + "/flag_place",
        data: redata,
      })
        .then((response) => {
          var data = response.data;
          if (data.code != 12)  {
            this.$message.error(data.message);
          }
          this.$router.push({ path: goToPath });
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
.main {
  width: 100%;
  height: 100%;
  min-height: 600px;
  min-width: 800px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(226, 221, 213, 1);
  position: relative;
}
.return {
  width: 253px;
  height: 69px;
  position: absolute;
  top: 33px;
  left: 54px;
  z-index: 10;
  background: url("../../../assets/return.png");
  outline: none;
  border: none;
  cursor: pointer;
}
#shaoxingbg {
  width: 100%;
  height: 100%;
  display: block;
  /* position: relative; */
  /* left: 0px; */
}
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.jianhu .tianlaoshan .shiningshu {
  width: 51px;
  height: 217px;
}
.jiangxinyu:hover {
  transform: scale(1.1);
}
.shiningshu:hover {
  transform: scale(1.1);
}
.tianlaoshan:hover {
  transform: scale(1.1);
}
.jianhu:hover {
  transform: scale(1.1);
}
.jiangxinyu {
  position: absolute;
  top: 61%;
  left: 80%;
  cursor: pointer;
  transition: all 0.75s;
}
.jianhu {
  position: absolute;
  top: 42%;
  left: 48%;
  cursor: pointer;
  transition: all 0.75s;
}
.tianlaoshan {
  position: absolute;
  left: 63%;
  top: 15%;
  z-index: 1;
  cursor: pointer;
  transition: all 0.75s;
}
.shiningshu {
  position: absolute;
  left: 19.4%;
  top: 22%;
  cursor: pointer;
  transition: all 0.75s;
  z-index: 1;
}
.draw_share_atooltip {
  background: #c99d27 !important;
}
.lake {
  position: absolute;
  width: 23.2%;
  height: 32%;
  left: 33%;
  top: 39.2%;
}
.mt {
  position: absolute;
  width: 13%;
  height: 23.2%;
  left: 54%;
  top: 18.4%;
}
.house {
  width: 10.4%;
  height: 18.5%;
  position: absolute;
  left: 10.4%;
  top: 29.4%;
}
#icon {
  width: 100%;
  height: 100%;
}
#point {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left:-13px;
}
/* .tooltip1 {
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip1 .tooltiptext1 {
    visibility: hidden;
    width: 608px;
    height: 208px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 50px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: 10%;
    top: 3.6%;
}

.tooltip1:hover .tooltiptext1 {
    visibility: visible;
    opacity: 0.8;
}
.tooltip2 {
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip2 .tooltiptext2 {
    visibility: hidden;
    width:332px;
    height: 116px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 50px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: 6%;
    top: 42.7%;
}

.tooltip2:hover .tooltiptext2 {
    visibility: visible;
    opacity: 0.8;
}
.tooltip3 {
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip3 .tooltiptext3 {
    visibility: hidden;
    width: 608px;
    height: 208px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 50px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: 14.8%;
    top: 38%;
}

.tooltip3:hover .tooltiptext3 {
    visibility: visible;
    opacity: 0.8;
}
.tooltip4 {
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip4 .tooltiptext4 {
    visibility: hidden;
    width: 608px;
    height: 208px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 50px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: 47%;
    top: 55%;
}

.tooltip4:hover .tooltiptext4 {
    visibility: visible;
    opacity: 0.8;
} */
</style>