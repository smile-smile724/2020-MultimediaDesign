<template>
    <div class="main">
		<img src="../../assets/background.png" style="width:1500px;height:810px;position:absolute;left:0;top:30px">
        <!-- <img src="../../assets/poetry_road.png"  >
        <button @click="re()" class="main_btn"></button> -->
        <div class="left-box">
            <poemchart1 :info="user.integral"></poemchart1>
            <span class="myintegral">我的积分</span>
            <span class="integral" >{{user.integral.integral}}</span>
            <button class="ranking_list" @click="getRank" >积分排行榜</button>
			<div class="mask" v-if="ranklist" @click="ranklist=false"></div>
			<div v-if="ranklist" class="mask_rank">
				<img src="../../assets/leftboxbg.png" class="rank_img1">
				<img src="../../assets/rank_list.png" class="rank_img2">
				<ul >
					<li v-for="(item,index) in arr" :key="index">
						<span class="rank1">{{index+1}}</span>
						<img :src="item[2]" class="rank_img3">
						<span class="rank2">{{item[0]}}</span>
						<span class="rank3">{{item[1]}}分</span>
					</li>
				</ul>
				</div>
            <el-tooltip placement="right" class="detail">
                <div slot="content">课前探访中每完成一个探访点的20分<br/>探访时长每达到一个小时得50分<br/>课堂抢答和课后练习中每答对一题的2分</div>
                <i class="el-icon-question"></i>
            </el-tooltip>
            <span class="total1" v-html="'累计答题：'+user.answerNumbers+'题'" ></span>
			<img src="../../assets/poemroad1.svg" class="total1_img">
        </div>
        <div class="right-box">
            <poemchart2 :info="user.seekTime"></poemchart2>
            <span class="visit">探访进度</span>
            <el-progress class="statistics" type="circle" :percentage="user.seekPercentage" :width="200" color="rgba(140, 83, 83, 1)"></el-progress>
            <span class="total2" v-html="'探访时间：'+user.seekTime.totalTime + '分钟'"></span>
			<img src="../../assets/poemroad2.svg"  class="total2_img">
            <span class="total3" v-html="'探访进度：'+user.seekPercentage + '/100'"></span>
			<img src="../../assets/poemroad3.svg" class="total3_img">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
import poemchart1 from "../../components/poemchart1";
import poemchart2 from "../../components/poemchart2";
export default {
	data() {
		return {
			ranklist:false,
			arr:[
				{rank:1,name:'张三',integral:317},
				{rank:2,name:'李四',integral:300},
				{rank:3,name:'王五',integral:288},
			],
			user:{
				answerNumbers:12,
				seekPercentage:10,
				integral:{
					classroomAnswer:10,
					limitTimeAnswer:30,
					endlessAnswer:10,
					drawingAnswer:20,
					integral:58
				},
				seekTime:{
					totalTime:110,
					day1:"8-1,10",
					day2:"8-2,30",
					day3:"8-3,40",
					day4:"8-4,50",
					day5:"8-5,60"
				}
			}
		}
	},
    methods:{
        re(){
            this.$router.push({path:'/home'})
		},
		getdata(){
			var that= this;
      		axios({
        		method: 'get',
        		url: this.$host+'/my_poem',
      		})
      		.then(response => {
        		var data=response.data;
        		if(data.code==12){
					this.user=data.info;
        		}else{
          			that.$message.error(data.message);
        		}
      		})
      		.catch(function (error) {
        		that.$message.error('连接失败，请检查网络');
      		});
		},
		getRank(){
			this.ranklist=true
			var that= this;
      		axios({
        		method: 'get',
        		url: this.$host+'/rank',
        		// data:{
          		// 		account:that.username,
          		// 		password:that.password
        		// }
      		})
      		.then(response => {
        		var data=response.data;
        		if(data.code==12){
          			this.arr=data.info
        		}else{
          			that.$message.error(data.message);
        		}
      		})
      		.catch(function (error) {
        		that.$message.error('连接失败，请检查网络');
      		});
		}
  },
  mounted(){
	  this.getdata()
  },
  components:{
      poemchart1,
      poemchart2
  }
}
</script>

<style scoped>
.main{
	width: 100%;
	height: 100%;
	min-height: 100%;
	min-width: 100%;
    position: relative;
  	left: 0%;
	color: rgba(80, 80, 80, 1);
	/* background: url('../../assets/background.png'); */
	background: none;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
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
  cursor: pointer;
}
.main img{
  width: 400px;
  height: 55px;
  position: relative;
  left: 70px;
  top: 50px;
}
.left-box{
	width: 50%;
	height: 764px;
    position: absolute;
	left: 2%;
	top: 30px;
	color: rgba(80, 80, 80, 1);
	/* background-color: rgba(229, 229, 229, 1); */
	border-radius: 30px;
	font-size: 14px;
	line-height: 150%;
	/* box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1); */
	text-align: center;
}
.myintegral{
	width: 242px;
	height: 50px;
    position: absolute;
	left: 30px;
	top: 572px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.integral{
	width: 148px;
	height: 120px;
    position: absolute;
	left: 243px;
	top: 612px;
	color: rgba(140, 83, 83, 1);
	font-size: 80px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.ranking_list{
	width: 120px;
	height: 30px;
    position: absolute;
	left: 400px;
	top: 652px;
	color: rgba(140, 83, 83, 1);
	background-color: transparent;
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	text-decoration: underline;
	border: none;
	outline: none;
	cursor: pointer;
}
.detail{
	width: 24px;
	height: 24px;
    position: absolute;
	left: 510px;
	top: 655px;
	font-size: 24px;
}
.right-box{
	width: 47.3%;
	height: 764px;
    position: absolute;
	left: 52%;
	top: 30px;
	color: rgba(80, 80, 80, 1);
	/* background-color: rgba(229, 229, 229, 1); */
	border-radius: 30px;
	font-size: 14px;
	line-height: 150%;
	/* box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1); */
	text-align: center;
}
.el-progress{
    position: absolute;
    top: 506px;
    left: 263px;
}
.visit{
	width: 242px;
	height: 50px;
    position: absolute;
	left: 27px;
	top: 456px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.main>>>.el-progress__text{
    color: rgba(140, 83, 83, 1);
    font-size: 30px;
    font-weight: bold;
}
.total1,.total2,.total3{
	width: 205px;
	height: 30px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
}
.left-box .total1_img{
    width: 30px;
    height: 30px;
    position: absolute;
    left:510px;
    top: 545px;
}
.right-box .total2_img{
    width: 30px;
    height: 30px;
    position: absolute;
    left:455px;
    top: 413px;
}
.right-box .total3_img{
    width: 30px;
    height: 30px;
    position: absolute;
    left:455px;
    top: 696px;
}
.total1{
	position: absolute;
	top: 544px;
	left: 547px;
}
.total2{
	position: absolute;
	top: 412px;
	left: 494px;
}
.total3{
	position: absolute;
	top: 697px;
	left: 494px;
}
.mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	background-color: white;
	opacity: 0.5;
}
.mask_rank .rank_img1{
	position: absolute;
	top: -30px;
	left: -40px;
	width: 1351px;
	height: 855px;
}
.mask_rank .rank_img2{
	width: 280px;
	height: 62px;
	position: absolute;
	left: 490px;
	top: 0px;
}
.mask_rank{
	position: absolute;
	z-index: 20;
}
.mask_rank ul{
	list-style: none;
	position: relative;
	margin-left: 50px;
	margin-top: 100px;
}
.rank1{
	width: 36px;
	height: 75px;
	left: 355px;
	top: 254px;
	color: rgba(140, 83, 83, 1);
	font-size: 50px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
	font-style: italic;
}
.rank2{
	width: 60px;
	height: 30px;
	position: relative;
	top: -23px;
	left: 67px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
}
.rank3{
	width: 36px;
	height: 21px;
	position: relative;
	top: 0;
	left: 23px;
	color: rgba(140, 83, 83, 1);
	font-size: 14px;
	line-height: 150%;
	text-align: left;
}
.mask_rank .rank_img3{
	width: 50px;
	height: 50px;
	position: relative;
	top: 6px;
	left: 30px;
}
.statistics{
	position: absolute;
	left: 220px;
}
</style>