<template>
  <div>
    <div id="echartContainer5"></div>
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
          <span style="position:absolute;top:14px;left:45px">打卡数目</span>
        </div>
        <el-tabs
          :tab-position="tabPosition"
          style="height: 1000px;"
        >
          <el-tab-pane
            v-for="(item,index) in address"
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
                prop="totalPlace"
                label="打卡数目"
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
  props: ["info", "value", "address", "grade"],
  data() {
    return {
      tabPosition: "left",
      table: false,
      title: ["全部", "8个以上", "6-8个", "4-6个", "2-4个", "2个以下"],
    };
  },
  methods: {
    showChart() {
      var that = this;
      let myChart = echarts.init(document.getElementById("echartContainer5"));
      myChart.setOption({
        title: {
          text: "打卡地点数",
          top: 25,
          left: 20,
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
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: [
            "9个",
            "8个",
            "7个",
            "6个",
            "5个",
            "4个",
            "3个",
            "2个",
            "1个",
            "0个",
          ],
        },
        grid: {
          x: 40,
          y: 80,
          // x2:100,
          y2: 28,
        },
        series: [
          {
            name: "打卡地点数",
            data: that.info[that.value - 1].signs,
            type: "bar",
            showBackground: true,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "rgba(42, 130, 228, 1)",
              },
            },
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0)",
            },
          },
        ],
      });
    },
    showInfo() {
      this.timer = setInterval(() => {
        if (this.info.length == 10 && this.address.length == 6&&this.$route.path=='/data_manage') {
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
#echartContainer5 {
  position: relative;
  margin-top: -269px;
  margin-left: 1497px;
  width: 374px;
  height: 269px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.detail {
  position: absolute;
  top: 575px;
  left: 1791px;
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