<template>
  <div>
    <div id="echartContainer3"></div>
    <div class="select">
      <el-select
        v-model="value"
        placeholder="请选择课时"
        class="choose_class"
        @change="get_course()"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="detail">
      <el-button
        type="text"
        @click="table = true"
        style="position: absolute;z-index:10"
      >详情</el-button>
      <el-drawer
        :visible.sync="table"
        direction="rtl"
        size="50%"
      >
        <div class="title">
          <img
            src="../assets/data_manage.png"
            class="data_manage"
          >
          <span style="position:absolute;top:14px;left:45px">课上在线时长</span>
        </div>
        <el-tabs
          :tab-position="tabPosition"
          style="height: 1000px;"
        >
          <el-tab-pane
            v-for="(item,index) in timeInfo"
            :key="index"
            :label="title[index]"
          >
            <el-table
              :data="item"
              style="width: 100%"
            >
              <el-table-column
                prop="username"
                label="姓名"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="time"
                label="观看时间"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="percent"
                label="观看占比"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </div>
</template>
        
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
const echarts = require("echarts");
export default {
  name: "line-chart3",
  props: ["info1", "timeInfo1", "value1", "grade1"],
  data() {
    return {
      tabPosition: "left",
      table: false,
      options: [
        {
          value: 1,
          label: "第⼀章",
        },
        {
          value: 2,
          label: "第二章",
        },
        {
          value: 3,
          label: "第三章",
        },
        {
          value: 4,
          label: "第四章",
        },
        {
          value: 5,
          label: "第五章",
        },
        {
          value: 6,
          label: "第六章",
        },
        {
          value: 7,
          label: "第七章",
        },
        {
          value: 8,
          label: "第八章",
        },
        {
          value: 9,
          label: "第九章",
        },
        {
          value: 10,
          label: "第十章",
        },
      ],
      title: [
        "第一章",
        "第二章",
        "第三章",
        "第四章",
        "第五章",
        "第六章",
        "第七章",
        "第八章",
        "第九章",
        "第十章",
      ],
      showData: [
        { value: 0, name: "超过90%" },
        { value: 0, name: "80%~90%" },
        { value: 0, name: "70%~80%" },
        { value: 0, name: "60%~70%" },
        { value: 0, name: "不足60%" },
      ],
      timer: {},
      info: this.info1,
      timeInfo: this.timeInfo1,
      value: this.value1,
      grade: this.grade1
    };
  },
  methods: {
    get_course() {
      this.$emit("func", this.value);
      this.showChart();
    },
    showChart() {
      for (var i = 0; i < this.info[this.value - 1].courses.length; i++) {
        this.showData[i].value = this.info[this.value - 1].courses[i];
      }
      var that = this;
      let myChart = echarts.init(document.getElementById("echartContainer3"));
      myChart.setOption({
        title: {
          text: "课上在线时长",
          x: 44,
          y: 54,
          textStyle: {
            color: "rgba(80, 80, 80, 1)",
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          axisPointer: {
            type: "none",
          },
        },
        legend: {
          orient: "vertical",
          top: 152,
          left: 300,
          data: ["超过90%", "80%~90%", "70%~80%", "60%~70%", "不足60%"],
          padding: 10,
          itemGap: 30,
          formatter: function (name) {
            var index = 0;
            var clientlabels = [
              "超过90%",
              "80%~90%",
              "70%~80%",
              "60%~70%",
              "不足60%",
            ];
            var clientcounts = that.info[that.value - 1].courses;
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            return name + "  " + clientcounts[index];
          },
        },

        color: [
          "rgba(60, 144, 247, 1)",
          "rgba(85, 191, 192, 1)",
          "rgba(94, 190, 103, 1)",
          "rgba(244, 205, 73, 1)",
          "rgba(224, 86, 103, 1)",
        ],
        series: [
          {
            name: "在线时长",
            type: "pie",
            radius: "55%",
            center: ["30%", "65%"],
            data: that.showData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inner",
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
        ],
      });
    },
    showInfo() {
      this.timer = setInterval(() => {
        if (this.info.length == 10 &&this.timeInfo.length == 10&&this.$route.path=='/data_manage') {
          this.showChart();
          clearInterval(this.timer);
        }
      }, 500);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.showInfo();
    });
  },
  watch: {
    'value': function (val) {
      this.$nextTick(function () {
        this.showInfo();
      });
    },
    'grade': function (val) {
      this.$nextTick(function () {
        this.showInfo();
      });
    },
  },
};
</script>
        
<style scoped>
#echartContainer3 {
  width: 480px;
  height: 400px;
  position: relative;
  margin-left: 156px;
  margin-top: -900px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.choose_class {
  position: absolute;
  top: 55px;
  left: 350px;
}
.select >>> .el-input__inner {
  width: 140px;
  height: 23px;
}
.select >>> .el-input__icon {
  line-height: 20px;
}
.detail {
  position: absolute;
  top: 43px;
  left: 550px;
}
.data_manage {
  width: 35px;
  height: 35px;
}
.title {
  width: 200px;
  height: 22px;
  position: absolute;
  left: 30px;
  top: 20px;
  color: rgba(80, 80, 80, 1);
  font-size: 15px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.detail >>> .el-tabs--left .el-tabs__item.is-left {
  text-align: center;
}
.detail >>> .el-tabs__item.is-active {
  width: 200px;
  background-color: rgba(24, 144, 255, 0.2);
  color: rgba(24, 144, 255, 1);
}
.detail >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  height: 100%;
  margin-top: -100px;
}
.detail >>> .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}
.detail >>> .el-table th {
  text-align: center;
}
</style>

