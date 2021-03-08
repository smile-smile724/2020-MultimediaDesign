<template>
    <div class="main">
        <button @click="re()" class="main_btn"></button>
        <div class="box">
			<span>图书拓展</span>
			<div class="bar"></div>
			<el-table :data="tableData" :header-cell-style="cellStyle" style="width: 1360px">
				<el-table-column prop="name" label="书名" width="331"></el-table-column>
				<el-table-column prop="intro" label="简介" width="892"></el-table-column>
				<el-table-column prop="download" label="操作"><button class="download">下载</button></el-table-column>
			</el-table>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [{
            name: '《戴望舒诗全编》',
            intro: '作者: 戴望舒 出版社: 浙江文艺出版社 出版年: 1989-05',
          }, {
            name: '《胡风诗全编》',
            intro: '作者: 胡风 / 绿原等编 出版社: 浙江文艺出版社 出版年: 1992-07-01',
          }, {
            name: '《朱彝尊诗词选 : 浙江历代名家诗选丛书》',
            intro: '胡才甫 选注 / 浙江古籍出版社 / 1987-11',
          }, {
            name: '《罗隐诗选 : 浙江历代名家诗选丛书》',
            intro: '蒋祖怡 选注 / 浙江古籍出版社 / 1987-11',
          }]
		}
	},
    methods:{
        re(){
            this.$router.push({path:'/kehoulist'})
		},
		cellStyle({row, column, rowIndex, columnIndex}){
			if(columnIndex === 2 && rowIndex === 0){
				return`padding-left:27px`
			}else if(columnIndex === 0 && rowIndex === 0){
				return'padding-left:5px'
			}else{
				return''
			}
		},
  },
}
</script>

<style scoped>
.main{
	width: 100%;
	height: 100%;
	min-width: 1900px;
	min-height: 960px;
    position: relative;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(226, 221, 213, 1);
}
.main_btn{
  width: 253px;
  height: 69px;
  background: url('../../assets/return.png');
  position: absolute;
  top: 33px;
  left: 54px;
  outline: none;
  border: none;
}
.box{
	width: 93.3%;
	height: 74.4%;
    position: relative;
	left: 3.3%;
	top: 16.9%;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(229, 229, 229, 1);
	border-radius: 30px;
	box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
}
.box span{
	width: 242px;
	height: 50px;
	position: absolute;
	left: 61px;
	top: 75px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	font-weight: bold;
}
.bar{
	width: 60px;
	height: 6px;
	position: absolute;
	left: 125px;
	top: 125px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 16px;
}
.el-table{
	position: absolute;
	left: 110px;
	top: 161px;
}
.main>>>.el-table th>.cell{
	color: rgba(142, 87, 86, 1);
	font-size: 20px;
	font-weight: bold;
}
.main>>>.el-table tr{
	background-color: transparent;
}
.main>>>.el-table, .el-table__expanded-cell{
	background-color: transparent;
}
.main>>>.el-table td, .el-table th.is-leaf{
	background-color: transparent;
}
.main>>>.el-table th, .el-table tr{
	background-color: transparent;
}
.main>>>.el-table td, .el-table th.is-leaf{
	background-color: transparent;
}
.main>>>.el-table--border::after, .el-table--group::after, .el-table::before{
	background-color: transparent;
}
.download{
	width: 100px;
	height: 30px;
	/* margin-left: -20px; */
	padding-left: -20px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(158, 112, 112, 1);
	border-radius: 11px;
	font-size: 14px;
	text-align: center;
	outline: none;
	border: none;
}
</style>