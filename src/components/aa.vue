<template>
    <div class="main">
        <div class="left-bar">
            <!-- <div v-for="item in goodsImg" :key="item.id" >
                <div class="goods_img"><img :src="item.src" :class="{active:currentIndex === index}" @click="liClick(index)"></div>
                <div class="good_name">{{item.goodsName}}</div>
            </div> -->
            <ul>
                <li >
                    <img src="../../assets/data management.png" @click="gaoliang()" :class="{active:cur==1}">
                    <p>数据管理</p>
                </li>
                <li >
                    <router-link to=""><img src="../../assets/classroom.png"></router-link>
                    <p>进入课堂</p>
                </li>
                <li >
                    <img src="../../assets/course management.png" >
                    <p>课件管理</p>
                </li>
            </ul>
            <span>教师端</span>
        </div>
        <div class="top-bar">
            <span>班级选择</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <img src="../../assets/head.svg" alt="">
                <span id="uname">王晓江</span>
        </div>
        <div class="echarts">
            <echarts1></echarts1>
            <echarts2></echarts2>
            <echarts3></echarts3>
            <echarts4></echarts4>
        </div>
        <div class="students">

        </div>
    </div>
</template>

<script>
import echarts1 from"../../components/echarts1";
import echarts2 from"../../components/echarts2";
import echarts3 from"../../components/echarts3";
import echarts4 from"../../components/echarts4"
export default {
    name:"index",
    data(){
        return{
                goodsImg: [
                    {src:require('../../assets/data management.png'),goodsName:'数据管理'} ,
                    {src:require('../../assets/classroom.png'),goodsName:'进入课堂'} ,
                    {src:require('../../assets/course management.png'),goodsName:'课件管理'},
            ],
            currentIndex:0,
            options: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, 
                    {
                        value: '选项2',
                        label: '双皮奶'
                    }, 
                    {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, 
                    {
                        value: '选项4',
                        label: '龙须面'
                    }, 
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                    value: ''
        }
    },
    methods:{
        courseVideoLi(goodsName) {
        this.active = goodsName;
            },
            liClick(index){
					this.currentIndex = index
				}
    },
    components: {
    echarts1,
    echarts2,
    echarts3,
    echarts4
  },
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  min-height:750px;
  background: rgba(245, 241, 241, 1);
}
.left-bar{
	width: 108px;
	height: 100%;
    position: absolute;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(42, 130, 228, 1);
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
.left-bar span{
	width: 60px;
	height: 30px;
    position: absolute;
	left: 24px;
	top: 34px;
	color: rgba(255, 255, 255, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
/* .goods_img img{
	width: 45px;
	height: 45px;
    position: relative;
    margin-top: 50px;
    margin-left: 30px;
    top: 200px;
    cursor: pointer;
    display:block;
}
.good_name{
	width: 60px;
	height: 22px;
    position: relative;
    margin-top: 50px;
    margin-left: 22px;
    top: 160px;
	color: rgba(255, 255, 255, 1);
	font-size: 15px;
	line-height: 150%;
	text-align: left;
} */
.left-bar ul li{
    list-style: none;
    /* margin-top: 100px; */
}
.left-bar ul li img{
	width: 45px;
	height: 45px;
    position: relative;
    margin-top: 72px;
    margin-left: -40px;
    top: 150px;
    cursor: pointer;
}
.left-bar ul li p{
	width: 60px;
	height: 26px;
    position: relative;
    margin-left: -16px;
    top: 140px;
	color: rgba(255, 255, 255, 1);
	font-size: 15px;
	line-height: 150%;
	text-align: left;
    cursor: pointer;
}
.top-bar{
	width: 100%;
	height: 88px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
.top-bar span{
	width: 800px;
	height: 30px;
    position:absolute ;
	left: 156px;
	top: 34px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.el-select{
	width: 200px;
	height: 38px;
    position: absolute;
	left: 262px;
	top: 30px;
}
.top-bar img{
	width: 45px;
	height: 45px;
    position: absolute;
	left: 1740px;
	top: 27px;
	font-size: 45px;
	color: rgba(42, 130, 228, 1);
}
#uname{
	width: 60px;
	height: 30px;
    position: absolute;
	left: 1808px;
	top: 34px;
	color: rgba(42, 130, 228, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
}
.students{
	width: 22%;
	height: 832px;
    position: relative;
    margin-top: -826px;
    margin-left: 1460px;
	color: rgba(80, 80, 80, 1);
	/* background-color: rgba(255, 255, 255, 1); */
    background-color: black;
	font-size: 14px;
	line-height: 150%;
	text-align: center
}
.active {
	width: 100px;
	height: 100px;
	opacity: 0.6;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(13, 73, 140, 1);
	border-radius: 10px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
</style>