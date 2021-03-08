<template>
  <div>
    <div id="echartContainer4"></div>
    <div class="detail">
      <el-button
        type="text"
        @click="table = true"
        style="position: absolute;z-index:10"
      >详情</el-button>
      <el-drawer
        :visible.sync="table"
        direction="rtl"
        size="40%"
      >
        <div class="title">
          <img
            src="../assets/data_manage.png"
            class="data_manage"
          >
          <span style="position:absolute;top:14px;left:45px">探访进度</span>
        </div>
        <el-tabs
          :tab-position="tabPosition"
          style="height: 1000px;"
        >
          <el-tab-pane 
            v-for="(item,index) in info"
            :key="index"
            :label="title[index]">
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
                prop="seekPercentage"
                label="探访进度"
              ></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </div>
</template>
        
<script>
const echarts = require("echarts");
export default {
  name: "line-chart3",
  data() {
    return {
      tabPosition: "left",
      table: false,
      showData: [
        { value: 0, name: "超过90%" },
        { value: 0, name: "80%~90%" },
        { value: 0, name: "70%~80%" },
        { value: 0, name: "60%~70%" },
        { value: 0, name: "不足60%" },
      ],
      title: [
        "全部",
        "90%以上",
        "80%~90%",
        "70%~80%",
        "60%~70%",
        "不足60%",
      ],
    };
  },
  props: ["info", "grade", "seek", "value"],
  methods: {
    showChart() {
      for (var i = 0; i < this.seek[this.value - 1].seeks.length; i++) {
        this.showData[i].value = this.seek[this.value - 1].seeks[i];
      }
      var that=this;
      let myChart = echarts.init(document.getElementById("echartContainer4"));
      myChart.setOption({
        title: {
          text: "探访进度",
          subtext: "总章节数：10",
          x: 44,
          y: 54,
          textStyle: {
            color: "rgba(80, 80, 80, 1)",
            fontSize: 20,
          },
          subtextStyle: {
            color: "rgba(128, 128, 128, 1)",
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: 152,
          left: 300,
          padding: 10,
          itemGap: 30,
          data: ["超过90%", "80%~90%", "70%~80%", "60%~70%", "不足60%"],
          formatter: function (name) {
            var index = 0;
            var clientlabels = [
              "超过90%",
              "80%~90%",
              "70%~80%",
              "60%~70%",
              "不足60%",
            ];
            var clientcounts = that.seek[that.value - 1].seeks;
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
            name: "访问来源",
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
        if (this.info.length == 6 &&this.seek.length== 10&&this.$route.path=='/data_manage') {
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
    value: function (val) {
      this.$nextTick(function () {
        this.showInfo();
      });
    },
    grade: function (val) {
      this.$nextTick(function () {
        this.showInfo();
      });
    },
  },
};
</script>
        
<style scoped>
#echartContainer4 {
  width: 480px;
  height: 400px;
  position: relative;
  margin-left: 156px;
  margin-top: 26px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.detail {
  position: absolute;
  top: 473px;
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
/* .detail>>>.el-table td, .el-table th.is-leaf{
    width: 300px;
    border-bottom: 1px solid #0844cf;
} */
</style>

