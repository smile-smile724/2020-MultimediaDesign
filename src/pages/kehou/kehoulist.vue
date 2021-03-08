<template>
    <div class="main">
      <button class="btn" @click="re()" ></button>
      <div class="mainbox">
          <div class="leftbox">
            <span>答题练习</span>
            <div class="bar"></div>
            <el-tooltip class="item1" placement="right">
                <div slot="content">限时答题：学生在规定时间内答题<br/>无尽排位：学生可一直答题直到答错停止</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
            <div id="btn_list">
              <img src="../../assets/leftboxbg.png" id="btn_bg">
              <ul>
                <li><img src="../../assets/limit_answer.png" @click="Limitedtime()"></li>
                <li><img src="../../assets/endless_rank.png" @click="endlessrank()"></li>
              </ul>
            </div>
           </div>
          <div class="rightbox">
            <span>看画题诗</span>
            <div class="bar"></div>
            <el-tooltip class="item" effect="dark" placement="right">
              <div slot="content">房主可开始游戏，画图方根据题目在画板上画图，猜题方根据图<br/>和提示，规定时间内在发言区发送答案，正确答案将自动隐藏；<br>每轮游戏都由玩家轮流担任画图方，直至四轮游戏结束。</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
              <img src="../../assets/joinroom.png" class="join_room" @click="joinroom=true">
              <img src="../../assets/createroom.png" class="createroom" @click="createroom=true">
              <img src="../../assets/desk.png" class="desk">
              <!-- 加入房间 -->
              <div class="mask" v-if="joinroom" @click="joinroom=false"></div>
              <div class="mask-box" v-if="joinroom">
                <img src="../../assets/close.svg" @click="joinroom=false">
                <span class="title">加入房间</span>
                <ul>
                  <li><span>房间暗号：</span><el-input v-model="input1" placeholder="请输入房间暗号"></el-input></li>
                  <li><span style="left:0px;top:20px;font-size: 30px;" @click="paintGame">快速加入</span></li>
                </ul>
              </div>
              <!-- 创建房间 -->
              <div class="mask" v-if="createroom" @click="createroom=false"></div>
              <div class="mask-box" v-if="createroom">
                <img src="../../assets/close.svg" @click="createroom=false">
                <span class="title">创建房间</span>
                <ul>
                  <li><span>房间名称：</span><el-input v-model="input1" placeholder="请输入房间名称"></el-input></li>
                  <li><span>房间暗号：</span><el-input v-model="input2" placeholder="请输入房间暗号"></el-input></li>
                </ul>
                <button>完成创建</button>
              </div>
          </div>
          <!-- 图书拓展 -->
          <div class="bottombox">
            <img src="../../assets/book.png">
            <span @click="bookshelf()">图书拓展</span>
          </div>
       </div>
    </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      createroom:false,
      joinroom:false,
      input1: '',
      input2: ''
    };
  },
  methods:{
    re(){
      console.log(1)
      this.$router.push({path:'/home'})
    },
    Limitedtime(){
      this.$router.push({path:'/paiwei'})
    },
    endlessrank(){
      this.$router.push({path:'/endlessrank'})
    },
    bookshelf(){
      this.$router.push({path:'/bookshelf'})
    },
    paintGame(){
      this.$router.push({path:'/paintGame'})
    },
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-width: 1900px;
  min-height: 960px;
  background: rgba(226, 221, 213, 1);
  position: relative;
}
.mainbox {
  width: 100%;
  height: 100%;
  position: relative;
}
.btn{
  width: 253px;
  height: 69px;
  background: url('../../assets/return.png');
  position: absolute;
  top: 33px;
  left: 54px;
  outline: none;
  border: none;
  z-index: 99;
}
.leftbox{
	width: 50%;
	height: 804px;
  position: relative;
  top: 120px;
  left: 3%;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(229, 229, 229, 1);
	border-radius: 30px;
	font-size: 14px;
	line-height: 150%;
	box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
	text-align: center;
}
.leftbox span,.rightbox span{
	width: 242px;
	height: 50px;
  position: relative;
  left: -37%;
	top: 60px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
#btn_list{
    position: relative;
  width: 80%;
  height: 513px;
  margin: 160px auto 0 auto;
}
#btn_list ul{
  width:100%;
  position:absolute;
  top:30px;
  padding:0;
}
.leftbox i{
    position: relative;
    top: 60px;
    left: -37%;
}
.leftbox li{
  width: 370px;
  height: 46px;
  position: relative;
  padding-top: 51px;
  list-style: none;
  margin: 40px auto 40px auto;
}
#btn_bg{
  width: 100%;
  height: 513px;
}
.leftbox li img{
    width: 300px;
    position: relative;
    cursor: pointer;
}
.leftbox .bar{
	width: 60px;
	height: 6px;
  position: absolute;
  left: 6%;
	top: 105px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 16px;
}
.rightbox{
    width: 40%;
    height: 604px;
    position: relative;
    top: -690px;
    left: 55%;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(229, 229, 229, 1);
    border-radius: 30px;
    font-size: 14px;
    line-height: 150%;
    box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
    text-align: center;
    margin-bottom: 10px;
}

.rightbox i{
    position: relative;
    left: -37%;
    top: 60px;
}
.rightbox .bar{
	width: 60px;
	height: 6px;
  position: absolute;
	left: 37px;
	top: 108px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 16px;
}
.join_room{
  width: 130px;
  height: 260px;
  position: absolute;
  left: 25%;
  top: 162px;
}
.createroom{
  width: 130px;
  height: 260px;
  position: absolute;
  left: 55%;
  top: 162px;
  cursor: pointer;
}
.desk{
	width: 472px;
	height: 129px;
  position: absolute;
  top: 481px;
  left: 18%;
}
.bottombox{
	width: 40%;
	height: 175px;
  position: relative;
  top: -670px;
  left: 55%;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(229, 229, 229, 1);
	border-radius: 30px;
	font-size: 14px;
	line-height: 150%;
	box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
	text-align: center;
}
.bottombox span{
	width: 200px;
	height: 50px;
  position: absolute;
	left: 345px;
	top: 57px;
	color: rgba(140, 83, 83, 1);
	font-size: 40px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
  cursor: pointer;
}
.bottombox img{
	width: 50px;
	height: 77px;
  position: absolute;
	top: 44px;
  left: 259px;
	-webkit-transform: rotate(-10deg);
	transform: rotate(-10deg);
}
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  opacity: 0.5;
}
.mask-box{
	width: 846px;
	height: 552px;
  position: absolute;
  z-index: 11;
	left: -70%;
	top: 124px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 30px;
	box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
	text-align: center;
}
.mask-box ul li{
  list-style: none;
	width: 600px;
	height: 88px;
  position: relative;
  left: 90px;
  top: 124px;
  margin-top: 41px;
	opacity: 0.8;
  color: rgba(255, 255, 255, 1);
	background-color: rgba(140, 83, 83, 1);
	border-radius: 40px;
	font-size: 20px;
	line-height: 150%;
	text-align: center;
}
.mask-box ul li span{
	width: 100px;
	height: 30px;
  position: relative;
  top: 30px;
	color: rgb(255, 255, 255);
	font-size: 20px;
	text-align: left;
	font-weight: bold;
}
.mask-box>>>.el-input__inner{
	width: 438px;
	height: 64px;
  position: relative;
  top: -18px;
  left: 50px;
	color: rgb(255, 255, 255);
	background-color: transparent;
	border-radius: 8px;
	font-size: 25px;
	line-height: 150%;
	border: none;
	text-align: left;
}
.mask-box .title{
  position: absolute;
  top: 48px;
  left: 48px;
}
.mask-box button{
	width: 146px;
	height: 45px;
  position: absolute;
	left: 350px;
	top: 438px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(158, 112, 112, 1);
	border-radius: 11px;
	font-size: 20px;
	line-height: 150%;
	text-align: center;
  outline: none;
  border: none;
}
.mask-box img{
	width: 40px;
	height: 40px;
  position: absolute;
  top: 48px;
  left: 752px;
}
</style>