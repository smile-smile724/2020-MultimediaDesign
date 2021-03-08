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
      <div class="menu">
        <div class="menu1" @click="cur = 1,stop()" :class="{ active: cur == 1 }">
          <span>诗词赏析</span>
        </div>
        <div class="menu2" @click="cur = 2,temple_guide()" :class="{ active: cur == 2 }">
          江心寺
        </div>
        <div class="tab">
          <div v-show="cur == 1">
            <div><jxypoem></jxypoem></div>
            <div class="bar1"></div>
          </div>
          <div v-show="cur == 2">
            <div><temple></temple></div>
            <div class="bar2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jxypoem from "../../../components/jxypoem.vue";
import temple from "../../../components/temple";
export default {
  data() {
    return {
      cur: 1,
    };
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    temple_guide() {
      this.audio = document.querySelector("#temple_guide");
      if (this.audio.paused) {
        this.audio.play();
      } else if (this.audio.play()) {
        this.audio.pause();
      }
    },
    stop(){
      this.audio = document.querySelector("#temple_guide");
      if(this.audio.play())
      this.audio.pause()
    }
  },
  components: {
    jxypoem,
    temple,
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
  overflow-x: hidden;
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
.bar1 {
  width: 60px;
  height: 6px;
  position: absolute;
  left: 1041px;
  top: 55px;
  background-color: rgba(130, 77, 82, 1);
  border-radius: 16px;
}
.bar2 {
  width: 60px;
  height: 6px;
  position: absolute;
  left: 1161px;
  top: 55px;
  background-color: rgba(130, 77, 82, 1);
  border-radius: 16px;
}
.tab {
  position: absolute;
  left: -980px;
  top: -10px;
}
.menu .active {
  /* background-color: #194e84 !important; */
  color: rgba(80, 80, 80, 1);
}
.menu {
  position: absolute;
  left: 76%;
  top: 75px;
  z-index: 10;
}
.menu1 {
  width: 128px;
  height: 50px;
  position: relative;
  color: rgba(128, 128, 128, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
}
.menu2 {
  width: 184px;
  height: 50px;
  position: relative;
  margin-left: 150px;
  margin-top: -50px;
  color: rgba(128, 128, 128, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
}
</style>