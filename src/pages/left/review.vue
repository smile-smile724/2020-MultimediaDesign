<template>
  <div class="main">
    <img
      src="../../assets/background.png"
      style="width:1500px;height:810px;position:absolute;left:0;top:30px"
    >
    <!-- <img src="../../assets/review.png"  >
        <button @click="re()" class="main_btn"></button> -->
    <div class="box">
      <div class="courseware">
        <img src="../../assets/courseware.jpg">
        <span class="courseware_name">《楠溪江：美妙的自然景观》</span>
        <span class="name">李晓明</span>
        <span class="date">2020/7/14</span>
		<a :href="ppt_path">
        	<span class="download"><img src="../../assets/download.svg">课件下载</span>
		</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
		pdfList:[],
		ppt_path:''
	};
  },
  methods: {
    re() {
      this.$router.push({ path: "/home" });
    },
    getInfo() {
      var that = this;
      axios
        .get(this.$host + "/get_all_course_ware")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.pdfList = data.info;
            that.ppt_path = that.pdfList[0].fileUrl;
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
  mounted(){
	  this.getInfo()
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: relative;
  color: rgba(80, 80, 80, 1);
  background-color: transparent;
  font-size: 14px;
  text-align: center;
}
.main_btn {
  width: 253px;
  height: 69px;
  background: url("../../assets/return.png");
  position: absolute;
  top: 33px;
  left: 54px;
  outline: none;
  border: none;
  cursor: pointer;
}
.main img {
  width: 400px;
  height: 55px;
  position: relative;
  left: 70px;
  top: 50px;
}
.box {
  width: 90.6%;
  height: 97%;
  position: relative;
  left: 5%;
  top: 0px;
  /* margin-top: 70px; */
  color: rgba(80, 80, 80, 1);
  /* background: url('../../assets/background.png'); */
  background-size: 100%;
  /* border-radius: 30px; */
  font-size: 14px;
  line-height: 150%;
  /* box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1); */
  text-align: center;
}
.courseware {
  width: 300px;
  height: 452px;
  position: relative;
  top: 85px;
  margin-left: 0px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 251, 243, 1);
  font-size: 14px;
  line-height: 150%;
  border: rgba(140, 83, 83, 1) solid 2px;
  text-align: center;
}
.courseware img {
  width: 270px;
  height: 206px;
  position: absolute;
  left: 14px;
  top: 14px;
}
.courseware_name {
  width: 260px;
  height: 30px;
  position: absolute;
  top: 234px;
  left: 15px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.name {
  width: 42px;
  height: 21px;
  position: absolute;
  left: 25px;
  top: 330px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
.date {
  width: 69px;
  height: 21px;
  position: absolute;
  left: 25px;
  top: 351px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
.download {
  width: 56px;
  height: 21px;
  position: relative;
  top: 375px;
  left: -97px;
  color: rgba(140, 83, 83, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
  cursor: pointer;
}
.download img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 4px;
  margin-right: 20px;
  cursor: pointer;
}
</style>