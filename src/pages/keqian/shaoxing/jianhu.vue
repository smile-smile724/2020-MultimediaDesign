<template>
  <div class="main">
    <div class="btn">
      <button
        @click="re()"
        class="return"
      ></button>
      <div class="allbtn">
        <img src="../../../assets/btn-bg.png" />
        <button
          class="btn-map"
          @click="btn_map()"
        ></button>
        <button
          class="btn-main"
          @click="btn_main()"
        ></button>
      </div>
    </div>
    <div class="right-box">
      <span>引入介绍</span>
      <div class="bar"></div>
      <img src="../../../assets/jh-box.png" />
      <span class="introduce">
        “北方文人名士，为品尝绍兴黄酒，寻找制作秘方，纷纷南下来到稽山鉴水，斗酒百篇，形成了浙东唐诗之路。”··········
      </span>
    </div>
    <div class="museum">
      <img
        src="../../../assets/museum-bg.jpg"
        class="museum-bg"
      />
      <a
        :href="$fileUrl+'/swf/HuangJiu.html'"
        target="_blank"
      >
        <img
          src="../../../assets/museum.png"
          class="enter"
        >
      </a>
    </div>
    <div class="game">
      <img src="../../../assets/pot.png" />
      <span @click="potgame()">黄酒宴</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    re() {
      this.$router.push({ path: "/shaoxinglist" });
    },
    btn_map() {
      this.$router.push({ path: "/map" });
    },
    btn_main() {
      this.$router.push({ path: "/course_learning" });
    },
    potgame() {
      this.$router.push({ path: "/pot-game" });
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
  position: relative;
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
.bar {
  width: 60px;
  height: 6px;
  position: absolute;
  left: 61px;
  top: 125px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(130, 77, 82, 1);
  border-radius: 16px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.right-box {
  width: 950px;
  height: 804px;
  position: relative;
  left: 64px;
  top: 143px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.right-box img {
  width: 697px;
  height: 515px;
  position: absolute;
  left: 13%;
  top: 221px;
}
.right-box span {
  width: 242px;
  height: 50px;
  position: absolute;
  left: 61px;
  top: 75px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.right-box .introduce {
  width: 528px;
  height: 271px;
  position: absolute;
  left: 221px;
  top: 358px;
  color: rgba(130, 77, 82, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.museum {
  background-color: rgba(98, 53, 31, 1);
  width: 820px;
  height: 510px;
  position: relative;
  left: 1032px;
  top: -661px;
  border-radius: 30px;
}
.museum-bg {
  width: 820px;
  height: 510px;
  opacity: 0.4;
  border-radius: 30px;
}
.enter {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 260px;
  top: 105px;
  cursor: pointer;
}
.game {
  width: 820px;
  height: 271px;
  position: relative;
  left: 1032px;
  top: -638px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.game img {
  width: 80px;
  height: 111px;
  position: absolute;
  top: 80px;
  left: 260px;
}
.game span {
  width: 160px;
  height: 60px;
  position: absolute;
  left: 391px;
  top: 105px;
  color: rgba(140, 83, 83, 1);
  font-size: 40px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
}
</style>