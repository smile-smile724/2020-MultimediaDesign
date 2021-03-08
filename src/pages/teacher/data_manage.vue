<template>
  <div class="main">
    <navigation></navigation>
    <div class="top_bar">
      <img src="../../assets/head.svg">
      <span id="uname">{{getCookie('username')}}</span>
      <span class="select_class">班级选择</span>
      <el-select
        v-model="value"
        placeholder="请选择"
        @change="getInfo"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="student_list">
      <span v-if="firstChart.length==10"><img src="../../assets/student-list.png">{{'学生名单（'+firstChart[course-1].userList.length+'人）'}}</span>
      <ul style="list-style: none;" v-if="firstChart.length==10">
        <li
          v-for="(item,index) in firstChart[course-1].userList"
          :key="index"
        >
          <img
            :src="item.headUrl"
            class="head"
          >
          <span class="name">{{item.username}}</span>
        </li>
      </ul>
    </div>
    <div class="echarts">
      <echarts1
        :info1="firstChart"
        :timeInfo1="firstTime"
        :value1="course"
        :grade1="value"
        @func="get_course"
      ></echarts1>
      <echarts2
        :info="thirdChart"
        :seek="firstChart"
        :value="course"
        :grade="value"
      ></echarts2>
      <echarts3 
        :info="firstChart"
        :answer="secondChart"
        :value="course"
        :grade="value"
      ></echarts3>
      <echarts4
        :info="firstChart"
        :point="fouthChart"
        :value="course"
        :grade="value"
      ></echarts4>
      <echarts5
        :info="firstChart"
        :address="fifthChart"
        :value="course"
        :grade="value"
      ></echarts5>
    </div>

  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import Navigation from "../../components/Navigation";
import echarts1 from "../../components/echarts1";
import echarts2 from "../../components/echarts2";
import echarts3 from "../../components/echarts3";
import echarts4 from "../../components/echarts4";
import echarts5 from "../../components/echarts5";
export default {
  data() {
    return {
      arr: [
        { name: "张三", src: require("../../assets/touxiang.png") },
        { name: "李四", src: require("../../assets/touxiang.png") },
        { name: "王五", src: require("../../assets/touxiang.png") },
        { name: "赵六", src: require("../../assets/touxiang.png") },
      ],
      options: [],
      value: "",
      firstChart: [],
      firstTime: [],
      secondChart:[],
      thirdChart:[],
      fouthChart:[],
      fifthChart:[],
      course: 1,
      answer:[0,200,150,100,50,49],
      seek:[0,9,8,7,6,5],
      integral:[0,500,400,300,200,199],
      place:[0,9,8,6,4,2]
    };
  },
  methods: {
    choice_grade() {
      var that = this;
      axios
        .get(this.$host + "/choice_grade")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.options = data.info;
            that.value = that.options[0];
            that.getInfo();
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    getInfo() {
      for (var i = 1; i <= 10; i++) {
        this.tec_stat(i);
        this.course_time_stat(i);
      }
      this.answer_subject_stat(0)
      this.seek_stat(0)
      this.integral_stat(0)
      this.place_sign_stat(0)
    },
    tec_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/tec_stat", {
          grade: that.value,
          course: num,
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.firstChart[num - 1] = data.info;
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    course_time_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/course_time_stat", {
          grade: that.value,
          course: num,
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.firstTime[num - 1] = data.info;
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    answer_subject_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/answer_subject_stat", {
          grade: that.value,
          scope: that.answer[num],
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            if(num==0){
              that.secondChart=[]
            }
            if(num<5){
              num++;
              that.answer_subject_stat(num)
            }
            that.secondChart.push(data.info);
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    seek_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/seek_stat", {
          grade: that.value,
          scope: that.seek[num],
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            if(num==0){
              that.thirdChart=[]
            }
            if(num<5){
              num++;
              that.seek_stat(num)
            }
            that.thirdChart.push(data.info);
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    integral_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/integral_stat", {
          grade: that.value,
          scope: that.integral[num],
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            if(num==0){
              that.fouthChart=[]
            }
            if(num<5){
              num++;
              that.integral_stat(num)
            }
            that.fouthChart.push(data.info);
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    place_sign_stat(num) {
      var that = this;
      axios
        .post(this.$host + "/place_sign_stat", {
          grade: that.value,
          scope: that.place[num],
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            if(num==0){
              that.fifthChart=[]
            }
            if(num<5){
              num++;
              that.place_sign_stat(num)
            }
            that.fifthChart.push(data.info);
          } else {
            that.$message.error(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          that.$message.error("连接失败，请检查网络");
        });
    },
    get_course(msg){
      this.course=msg
    }
  },
  created() {
    this.choice_grade();
  },
  components: {
    Navigation,
    echarts1,
    echarts2,
    echarts3,
    echarts4,
    echarts5,
  },
};
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  min-height: 960px;
  min-width: 1900px;
  position: relative;
  background: rgba(245, 241, 241, 1);
}
.echarts {
  position: relative;
  top: 40px;
  width: 0px;
}
.top_bar {
  width: 100%;
  height: 88px;
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  z-index:0;
}
.top_bar img {
  width: 45px;
  height: 45px;
  position: absolute;
  float: left;
  left: 90%;
  margin-top: 20px;
  font-size: 45px;
  color: rgba(42, 130, 228, 1);
}
.top_bar span {
  width: 60px;
  height: 30px;
  position: relative;
  top: 27px;
  left: 45%;
  color: rgba(42, 130, 228, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
}
.top_bar .el-select {
  width: 200px;
  height: 38px;
  position: absolute;
  left: 254px;
  top: 30px;
}
.top_bar .select_class {
  width: 80px;
  height: 30px;
  position: absolute;
  left: 148px;
  top: 34px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.main >>> .el-tabs--left .el-tabs__item.is-left {
  text-align: center;
}
.main >>> .el-tabs__item.is-active {
  width: 200px;
  background-color: rgba(24, 144, 255, 0.2);
  color: rgba(24, 144, 255, 1);
}
.main >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  height: 100%;
  margin-top: -100px;
}
.student_list {
  width: 374px;
  height: 543px;
  position: absolute;
  left: 1497px;
  top: 110px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
}
.student_list span {
  width: 80px;
  height: 30px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.student_list span img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 9px;
  margin-top: 57px;
}
.head {
  position: relative;
  left: -100px;
  top: 0px;
  margin-top: 25px;
  width: 30px;
}
.student_list .name {
  position: relative;
  left: -70px;
  top: -20px;
  width: 100px;
  color: rgba(56, 56, 56, 1);
  font-size: 18px;
  line-height: 150%;
  text-align: left;
  font-weight: inherit;
}
.student_list ul li img {
  width: 50px;
  height: 50px;
}
</style>



