<template>
  <div>
    <div class="guide">
      <video
        :src="msource[index]"
        id="guide"
        hidden="true"
        controls="controls"
        style="position: relative; z-index: 100"
      ></video>      <!-- <button @click="audioPlay()"  style="position: absolute;z-index:100">111</button> -->
      <img class="guidebg" src="../../assets/guidebg.jpg" />
      <img src="../../assets/play.svg">
      <button class="guidenext" @click="add()" v-if="count < 3"></button>
      <button class="guidestart" @click="map()" v-if="count > 2"></button>
      <div class="guidetext">
        <span v-if="count === 0" class="text"
          >诗画浙江，山水江南。浙江自古便是钟灵毓秀之地，古今多少心怀梦想的人在这里寄情山水、涤荡心灵，用才情才思留下隽永的诗画。</span
        >
        <span v-else-if="count === 1" class="text"
          >南北朝诗人谢灵运也被浙江的魅力山水吸引，他在这里凿山开路，从温州、绍兴到杭州，一路旅行畅游，并在此敲开了山水诗的大门，谢灵运的山水诗成为了后世诗人的写作范本。</span
        >
        <span v-else-if="count === 2" class="text"
          >在唐代以李白为首的众多诗迷更是追随着谢灵运的脚步，来到浙江按照相同的路线旅行，一路赏景吟诗，完成着他们的追星之旅，他们写下的诗篇也让中国的山水诗流派逐步发展并走向成熟。</span
        >
        <span v-else class="text"
          >现在让我们一起跟着谢灵运和李白，一起去到他们热爱的山水，在如画的美景中，打卡同款旅行地，在景色中探寻山水诗的奥秘。</span
        >
        <button @click="AudioPlay" class="audioplay"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      show: true,
      index:0,
      msource:[
        require('../../assets/guide1.mp4'),
        require('../../assets/guide2.mp4'),
        require('../../assets/guide3.mp4'),
        require('../../assets/guide4.mp4')
      ]
    };
  },
  methods: {
    map() {
      this.$router.push({ path: "/map" });
    },
    add() {
      this.count++;
      this.index++;
      console.log("count:" + this.index);
      this.audio = document.querySelector("#guide");
      if (this.audio.play()) {
        this.audio.pause();
      }
    },
    AudioPlay(){
      this.audio = document.querySelector("#guide");
      if (this.audio.paused) {
        this.audio.play();
      } else if (this.audio.play) {
        this.audio.pause();
      }
    }
  },
};
</script>

<style scoped>
.guide .guidebg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  /* opacity: 0.5; */
}
.guide .guidestart {
  width: 404px;
  height: 143px;
  background: url("../../assets/guidestart.png");
  background-size: 100%;
  position: absolute;
  left: 39.4%;
  top: 76.2%;
  z-index: 10;
  outline: none;
  border: none;
  cursor: pointer;
}
.guide .guidenext {
  width: 200px;
  height: 27px;
  background: url("../../assets/guidenext.png");
  background-size: 100%;
  position: absolute;
  left: 76.7%;
  top: 54.3%;
  z-index: 11;
  outline: none;
  border: none;
  cursor: pointer;
}
.guide .guidetext {
  /* width: 1539px; */
  /* height: 477px; */
  width: 80.1%;
  height: 49.1%;
  position: absolute;
  top: 15.7%;
  left: 10.9%;
  z-index: 10;
  background: url("../../assets/guidetext.png");
  background-size: 100%;
}
.guidetext .text {
  width: 1411px;
  height: 160px;
  position: absolute;
  left: 64px;
  top: 162px;
  color: rgba(24, 24, 24, 1);
  font-size: 35px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.audioplay{
  background: url('../../assets/guide_play.svg');
  background-size: 100%;
  width: 45px;
  height: 45px;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 77%;
  /* left: 0; */
}
</style>