<template>
  <div class="main">
    <div class="btn">
      <button @click="re()" class="return"></button>
      <div class="allbtn">
        <img src="../../../assets/btn-bg.png" />
        <button class="btn-map" @click="btn_map()"></button>
        <button class="btn-main" @click="btn_main()"></button>
      </div>
    </div>
    <div class="box">
      <span class="title">永嘉太守——谢灵运</span>
      <div class="bar"></div>
      <span class="Introduction">
        永嘉有“水长而美”之意，它历史悠久，建县已有1800多年，历史上先有永嘉郡、后有温州府，是温州的历史之根、文化之源。<br /><br />
        永嘉，是中国山水诗的发源地，谢灵运遇到了永嘉山水，才有了炳耀千古的山水诗，才成为中国山水诗的开山鼻祖。任永嘉太守期间，他经常在永嘉界内探山泛水，并创作了《登江中孤屿》、《登池上楼》等二十多首山水诗篇。<br /><br />
        他的山水诗风格，典丽精深，声调生涩凝重，写境密实繁荣为特色。对后世山水诗的盛行有着不可磨灭的贡献。
      </span>
      <video
        src="../../../assets/yjx.mp4"
        controls
        width="870"
        height="613"
        class="vidio"
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    re() {
      this.$router.push({ path: "/wenzhoulist" });
    },
    btn_map() {
      this.$router.push({ path: "/map" });
    },
    btn_main() {
      this.$router.push({ path: "/course_learning" });
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 960px;
  min-width: 1900px;
  background-color: rgba(226, 221, 213, 1);
}
.return {
  width: 253px;
  height: 69px;
  position: absolute;
  top: 33px;
  left: 54px;
  background: url("../../../assets/return.png");
  outline: none;
  border: none;
  cursor: pointer;
}
.allbtn img {
  width: 180px;
  height: 100px;
  position: absolute;
  z-index: 10;
}
.btn .allbtn {
  visibility: hidden;
  position: absolute;
  left: 105px;
  top: 93px;
  transition-duration: 0.5s;
  opacity: 0;
}
.btn:hover .allbtn {
  visibility: visible;
  opacity: 1;
}
.btn-map {
  width: 176px;
  height: 45px;
  background: url("../../../assets/btn-map.png");
  background-size: 100%;
  position: absolute;
  margin: 4px 0 0 2px;
  z-index: 10;
  outline: none;
  border: none;
  cursor: pointer;
}
.btn-main {
  width: 176px;
  height: 45px;
  background: url("../../../assets/btn-main.png");
  background-size: 100%;
  position: absolute;
  margin: 51px 0 0 2px;
  z-index: 10;
  outline: none;
  border: none;
  cursor: pointer;
}
.box {
  width: 93%;
  height: 84%;
  position: relative;
  left: 3.4%;
  top: 123px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.bar {
  width: 60px;
  height: 6px;
  position: absolute;
  left: 65px;
  top: 111px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(130, 77, 82, 1);
  border-radius: 16px;
}
.title {
  width: 372px;
  height: 50px;
  position: absolute;
  left: 11px;
  top: 75px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  font-weight: bold;
}
.Introduction {
  /* background: black; */
  width: 731px;
  height: 502px;
  position: absolute;
  left: 61px;
  top: 140px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
}
.vidio {
  position: absolute;
  left: 839px;
  top: 75px;
  width: 870px;
  height: 613px;
}
</style>