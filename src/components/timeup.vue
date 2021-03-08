<template>
  <div class="detail">
    <el-button type="text" @click="table = true" style="position: absolute;z-index:10">详情</el-button>
    <el-drawer
      :visible.sync="table"
      direction="rtl"
      size="50%">
      <div class="title">
        <img src="../assets/data_manage.png" class="data_manage">
        <span style="position:absolute;top:14px;left:45px">课上在线时长</span>
      </div>
      <el-tabs :tab-position="tabPosition" style="height: 1000px;">
        <el-tab-pane label="第一课时">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="time" label="观看时间" width="180"></el-table-column>
            <el-table-column prop="watch" label="观看占比"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="第二课时">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="time" label="观看时间" width="180"></el-table-column>
            <el-table-column prop="watch" label="观看占比"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="第三课时">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="time" label="观看时间" width="180"></el-table-column>
            <el-table-column prop="watch" label="观看占比"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="第四课时">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="time" label="观看时间" width="180"></el-table-column>
            <el-table-column prop="watch" label="观看占比"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name:'xiangqing',
  data() {
    return {
      tabPosition: 'left',
      table: false,
          tableData: [
            {
              name: '王小虎',
              time: '02:38:50',
              watch: '92%'
            }, 
            {
              name: '王小虎',
              time: '02:38:50',
              watch: '92%'
            }, 
            {
              name: '王小虎',
              time: '02:38:50',
              watch: '92%'
            }, 
            {
              name: '王小虎',
              time: '02:38:50',
              watch: '92%'
            },
          ],
    };
  },
}
</script>

<style scoped>
.detail{
  position: absolute;
  top: 150px;
  left: 550px;
}
.data_manage{
  width: 35px;
  height: 35px;
}
.title{
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
.main>>>.el-tabs--left .el-tabs__item.is-left{
  text-align: center;
}
.main>>>.el-tabs__item.is-active{
  width: 200px;
  background-color: rgba(24, 144, 255, 0.2) ;
  color: rgba(24, 144, 255, 1);
}
.main>>>.el-tabs--left .el-tabs__nav-wrap.is-left::after, .el-tabs--left .el-tabs__nav-wrap.is-right::after, .el-tabs--right .el-tabs__nav-wrap.is-left::after, .el-tabs--right .el-tabs__nav-wrap.is-right::after{
  height: 100%;
  margin-top: -100px;
}
</style>