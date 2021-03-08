<template>
  <div class="main">
    <div id="mainbox">
        <img src="../assets/home-bg.png" class="home-bg">
      <ul class="leftbt">
        <li><router-link to="/course_learning"><img src="../assets/home-learning.png" style="margin-top:99px;"></router-link></li>
        <li><router-link to="/personal"><img src="../assets/home-person.png"></router-link></li>
        <li><router-link to="/poetry_road"><img src="../assets/home-shilu.png"></router-link></li>
        <li><router-link to="/review"><img src="../assets/home-re.png"></router-link></li>
        <!-- <li><img src="../assets/home-person.png" style="margin-top:99px;" @click="gotolink()"></li>
        <li><img src="../assets/home-re.png" @click="review()"></li>
        <li><img src="../assets/home-shilu.png" @click="poetry_road()"></li> -->
      </ul>
        <div class="rightcontent">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  methods:{
    gotolink(){
      this.$router.push({path:'/personal'})
    },
    keqian(){
      this.$router.push({path:'/guide'})
    },
    kehou(){
      this.$router.push({path:'/kehoulist'})
    },
    keshang(){
      this.$router.push({path:'/ppt'})
    },
    poetry_road(){
      this.$router.push({path:'/poetry_road'})
    },
    review(){
      this.$router.push({path:'/review'})
    },
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height:960px;
  min-width: 1900px;
  background: rgba(226, 221, 213, 1);
}
.home-bg {
  width: 1842px;
  height: 952px;
  margin:0 auto 0 auto;
  position: absolute;
  top: -50px;
  left: -270px;
}
#mainbox{
  width: 1280px;
  height: 650px;
  position: absolute;
  left:50%;
  top:53px;
  margin-left:-640px;
}
.leftbt{
  width:220px;
  height:100%;
  list-style: none;
  padding:0;
  margin-top:-10px;
  margin-left: -262px;
  float: left;
  position: relative;
  top: 0;
  left: 0%;
}
.leftbt li {
  width: 160px;
  height: 44px;
  cursor: pointer;
  margin:0 0 20px 29px;
}
.leftbt li img{
  position: relative;
  width:120%;
  height:120%;
  display: block;
  margin: 0;
}
.mainbt{
  width: 1080px;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 50px 0 0 70px;
  float: left;
}
.mainbt li {
  width: 1000px;
  height: 476px;
  margin-top: 40px;
  margin-bottom:-600px;
  margin-left: 167px;
  /* margin:50px 258px -600px 110px; */
}
.mainbt li img{
  position: relative;
  width: 118px;
  height: 100%;
  display: block;
  float: left;
  cursor: pointer;
  margin-right: 200px;
  transition: all 0.75s;
}
.mainbt li img:hover{
  transform: scale(1.1);
}
.rightcontent{
  width: 1470px;
  height: 860px;
  /* background-color: blue; */
  position: relative;
  left: 0%;
}
</style>
