<template>
  <div class="main">
    <button
      @click="re()"
      class="return"
    ></button>
    <video
      src="../../../assets/list-audio.mp4"
      style="position: absolute;"
      autoplay="autoplay"
      id="list_audio"
    ></video>
    <img
      src="../../../assets/yongjia-bg.png"
      id="yongjiabg"
    />
    <div class="box">
      <div class="tooltip1">
        <div class="yandangshan">
          <img
            src="../../../assets/yandangshan.png"
            id="icon"
            @click="yds()"
          />
          <img
            :src="info.yanDangShan?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <span class="tooltiptext1">{{ tooltipyds }}</span>
      </div>
      <img
        src="../../../assets/person1.png"
        class="person1"
      />

      <div class="tooltip2">
        <div class="yongjiaxian">
          <img
            src="../../../assets/yongjiaxian.png"
            id="icon"
            @click="yjx()"
          />

          <img
            :src="info.yongJiaXian?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <span class="tooltiptext2">{{ tooltipyjx }}</span>
      </div>
      <div class="tooltip3">
        <div class="nanxijiang">

          <img
            src="../../../assets/naxijiang.png"
            id="icon"
            @click="nxj()"
          />
          <img
            :src="info.nanXiJiang?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <span class="tooltiptext3">{{ tooltipnxj }}</span>
      </div>
      <div class="tooltip4">
        <div class="jiangxinyu">

          <img
            src="../../../assets/jiangxinyu.png"
            id="icon"
            @click="jxy()"
          />
          <img
            :src="info.jiangXinYu?require('../../../assets/map_get.png'):require('../../../assets/map_unGet.png')"
            id="point"
          >
        </div>
        <span class="tooltiptext4">{{ tooltipjxy }}</span>
      </div>
      <img
        src="../../../assets/house.png"
        class="house"
      />
      <img
        src="../../../assets/person2.png"
        class="person2"
      />
    </div>
    <div
      class="mask"
      v-show="close"
      @click="close = false"
    >
      <img src="../../../assets/mapmask.png" />
      <span class="guide">点击景点进入游览学习古诗文化 <br> 在名称上停留可以初步了解每个景点</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      close: true,
      tooltipyds:
        "雁荡山以山水奇秀文明，素有“海上名山、寰中决胜”之誉，又名雁宕、雁山。它开山凿胜始于南北朝，兴于唐，盛于宋，而这开山之举正是谢灵运所为：景平五年，乐清发生严重水灾，谢灵运来此视察灾情，关心民间疾苦，也就是在这期间，他登上了雁荡山，后人命名的“谢公岭”和建造的“落履亭”，也是纪念谢灵运历游雁荡山的史实。",
      tooltipnxj:
        "悠悠楠溪水，深深谢公情，谢灵运弥足珍贵的楠溪山水履迹与美丽的诗章颂词有力地推动了永嘉地方文化的发展。旧志称“谢灵运招士讲学，由是人知向学，民风变”。正是谢公纵情永嘉山水，使得楠溪风景名噪一时，“后，此邦山水遂闻于天下，凡天下之士行过是邦者，莫不俯仰留连，吟咏不辍，以诧其胜。”",
      tooltipyjx:
        "永嘉美景吸引着康乐公去探寻康乐公的山水诗也造就了永嘉的诗意。他开山而来，开辟了永嘉山水的第一条道路。在唐时，其所辟之路却吸引着无数诗人的行旅，即后世所谓唐诗之路。",
      tooltipjxy:
        "江心孤屿，古时为两个小岛，南朝宋初郡守谢灵运曾登上孤屿，写下“乱流趋正绝，孤屿媚中川。云日相辉映，空水共澄鲜”名句。它位于温州市区北面瓯江之中，列中国四大名胜孤屿之首。该屿风景秀丽、人文景观丰富，是瓯江上的一颗璀璨明珠，历来被称为“瓯江蓬莱”。",
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
    yjx() {
        var data={
            yongJiaXian:true
        }
        this.postInfo(data,"/yongjiaxian")
    },
    yds() {
        var data={
            yanDangShan:true
        }
        this.postInfo(data,"/yandangshan")
    },
    nxj() {
        var data={
            nanXiJiang:true
        }
        this.postInfo(data,"/nanxijiang")
    },
    jxy() {
        var data={
            jiangXinYu:true
        }
        this.postInfo(data,"/jiangxinyu")
    },
    re() {
      this.$router.push({ path: "/map" });
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
#yongjiabg {
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
.jiangxinyu .nanxijiang .yongjiaxian .yandangshan {
  width: 45px;
  height: 193px;
}
.jiangxinyu:hover {
  transform: scale(1.1);
}
.yandangshan:hover {
  transform: scale(1.1);
}
.yongjiaxian:hover {
  transform: scale(1.1);
}
.nanxijiang:hover {
  transform: scale(1.1);
}
.jiangxinyu {
  position: absolute;
  top: 61%;
  left: 80%;
  cursor: pointer;
  transition: all 0.75s;
}
.nanxijiang {
  position: absolute;
  top: 35%;
  left: 55%;
  cursor: pointer;
  transition: all 0.75s;
}
.yongjiaxian {
  position: absolute;
  left: 24%;
  top: 50%;
  cursor: pointer;
  transition: all 0.75s;
}
.yandangshan {
  position: absolute;
  left: 42%;
  top: 10%;
  cursor: pointer;
  transition: all 0.75s;
}
.draw_share_atooltip {
  background: #c99d27 !important;
}
.person1 {
  position: absolute;
  width: 3.1%;
  height: 10.5%;
  left: 37.5%;
  top: 12.5%;
}
.person2 {
  position: absolute;
  width: 3.6%;
  height: 11%;
  left: 89%;
  top: 77%;
  z-index: 100;
}
.house {
  width: 13%;
  height: 24%;
  position: absolute;
  left: 84%;
  top: 64%;
}
.tooltip1 {
  /* position: absolute; */
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
  padding-top: 20px;
  line-height: 170%;
  text-indent: 2em;
  opacity: 0;
  transition: opacity 2s;
  position: absolute;
  z-index: 10;
  left: 10%;
  top: 3.6%;
}

.tooltip1:hover .tooltiptext1 {
  visibility: visible;
  opacity: 0.8;
}
.tooltip2 {
  /* position: absolute; */
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip2 .tooltiptext2 {
  visibility: hidden;
  width: 332px;
  height: 176px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  text-align: left;
  border-radius: 16px;
  font-weight: bold;
  font-size: 20px;
  /* line-height: 150%; */
  padding-top: 20px;
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
  /* position: absolute; */
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
  line-height: 170%;
  padding-top: 20px;
  text-indent: 2em;
  opacity: 0;
  transition: opacity 2s;
  position: absolute;
  z-index: 1;
  left: 57.8%;
  top: 30%;
}

.tooltip3:hover .tooltiptext3 {
  visibility: visible;
  opacity: 0.8;
}
.tooltip4 {
  /* position: absolute; */
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
  line-height: 170%;
  padding-top: 20px;
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
}
.main .maptext {
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
  color: rgba(80, 80, 80, 1);
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
#icon {
  width: 100%;
  height: 100%;
}
#point {
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -15px;
}
</style>