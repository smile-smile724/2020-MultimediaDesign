<template>
  <div>
    <div id="echartContainer2"></div>
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
          <span style="position:absolute;top:14px;left:45px">课上积分</span>
        </div>
        <el-tabs
          :tab-position="tabPosition"
          style="height: 1000px;"
        >
          <el-tab-pane
            v-for="(item,index) in point"
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
                prop="integral"
                label="课堂积分"
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
  name: "line-chart1",
  props: ["info", "value", "point", "grade"],
  data() {
    return {
      tabPosition: "left",
      table: false,
      title: [
        "全部",
        "500分以上",
        "400-500分",
        "300-400分",
        "200-300分",
        "200分以下",
      ],
    };
  },
  methods: {
    showChart() {
      var that = this;
      //基于准备好的dom, 初始化echarts实例
      let myChart = echarts.init(document.getElementById("echartContainer2"));
      myChart.setOption({
        title: {
          text: "课堂积分",
          top: 54,
          left: 53,
          textStyle: {
            color: "rgba(80, 80, 80, 1)",
            fontSize: 20,
          },
        },
        titleStyle: {
          color: "rgba(80, 80, 80, 1)",
          fontSize: 14,
        },
        tooltip: {
          show: true,
        },
        grid: {
          x: 140,
          y: 100,
        },
        yAxis: {
          data: ["500分以上", "300分以上", "150分以上", "其余"],
          name: "",
          itemStyle: {
            barGap: "20",
          },
        },
        xAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: that.info[that.value - 1].integral,
            barWidth: 40,
            itemStyle: {
              normal: {
                color: "rgba(42, 130, 228, 1)",
              },
              show: false,
            },
          },
        ],
      });
    },
    showInfo() {
      this.timer = setInterval(() => {
        if (this.info.length == 10 && this.point.length == 6&&this.$route.path=='/data_manage') {
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
#echartContainer2 {
  position: relative;
  margin-top: 26px;
  margin-left: 678px;
  width: 802px;
  height: 400px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.detail {
  position: absolute;
  top: 473px;
  left: 1391px;
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