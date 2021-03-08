<template>
  <div class="main">
    <img src="../assets/home-bg.png" alt="" />
    <div id="mainbox">
      <div class="leftbt">
        <button class="leftbt1" @click="gotolink()"></button>
        <button class="leftbt2"></button>
        <button class="leftbt3"></button>
        <button class="leftbt4"></button>
      </div>
      <div class="mainbt">
        <button class="mainbt1"></button>
        <button class="mainbt2"></button>
        <button class="mainbt3"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods:{
    gotolink(){
      this.$router.push({path:'left/personal'})
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height:750px;
  background: rgba(226, 221, 213, 1);
}
.main img {
  width: 1280px;
  height: 650px;
  margin:53px auto 0 auto;
}
#mainbox{
  width: 1280px;
  height: 650px;
  position: absolute;
  left:50%;
  top:53px;
  margin-left:-640px;
}
.leftbt button {
  width: 160px;
  height: 44px;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  left: 140px;
}
.leftbt1 {
  background: url("../assets/home-person.png");
  background-size: 160px 44px;
  position: absolute;
  top: 150px;
}
.leftbt2 {
  background: url("../assets/home-re.png");
  background-size: 160px 44px;
  position: absolute;
  top: 220px;
}
.leftbt3 {
  background: url("../assets/home-shilu.png");
  background-size: 160px 44px;
  position: absolute;
  top: 290px;
}
.leftbt4 {
  background: url("../assets/home-list.png");
  background-size: 160px 44px;
  position: absolute;
  top: 360px;
}
.mainbt button {
  width: 118px;
  height: 476px;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 140px;
  transition: all 1s;
}
.mainbt1 {
  background: url("../assets/mainbt1.png");
  background-size: 118px 476px;
  position: absolute;
  left: 486px;
}
.mainbt2 {
  background: url("../assets/mainbt2.png");
  background-size: 118px 476px;
  position: absolute;
  left: 754px;
}
.mainbt3 {
  background: url("../assets/mainbt3.png");
  background-size: 118px 476px;
  position: absolute;
  left: 1024px;
}
.mainbt1:hover,
.mainbt2:hover,
.mainbt3:hover {
  transform: scale(1.1);
}
</style>
