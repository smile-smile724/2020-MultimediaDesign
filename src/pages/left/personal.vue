<template>
  <div class="main">
		<img src="../../assets/background.png" style="width:1500px;height:810px;position:absolute;left:0;top:30px">
    <!-- <img src="../../assets/personal-title.png" >
    <button @click="re()" class="return"></button> -->
      <div class="personal-detail">
        <span>个人资料</span>
        <ul class="title">
          <li>头像:</li>
          <li style="margin-top:55px" >账号:</li>
          <li>密码:</li>
          <li>昵称:</li>
          <li>班级:</li>
          <li>简介:</li>
        </ul>
        <ul class="content">
          <li><img :src="user.headUrl"></li>
          <li><el-input v-model="user.account" :disabled="true"></el-input></li>
          <li><el-input v-model="user.password" show-password></el-input></li>
          <li><el-input v-model="user.username"></el-input></li>
          <li><el-input v-model="user.grade" :disabled="true"></el-input></li>
          <li class="introduction">
            <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" placeholder="请输入内容" v-model="user.intro" maxlength="500" :show-word-limit="true"></el-input>
          </li>
        </ul>
        <button class="save">保存</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
export default {
  name: "personal",
  data() {
    return {
        user:{
          account: '123123',
          password:'123123',
          username:'111',
          grade:'321',
          intro:'123123123',
          headUrl:'https://www.uiofield.top/multimedia_file/p1'
      },
    };
  },
  methods:{
    re(){
      this.$router.push({path:'/home'})
    },
    information(){
      var that=this;
      axios.get(this.$host+'/get_information')
      .then(function(response){
        var data=response.data;
        console.log(data)
        if(data.code==12){
          that.user=data.info
        }else{
          that.$message.error(data.message);
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
		update_msg(){
      var that= this;
      axios.post(this.$host+'/update_msg', {

      })
      .then(function (response) {
        console.log(response)
        var data=response.data;
        if(data.code==12){
          
        }else{
        	that.$message.error(data.message);
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('连接失败，请检查网络');
      });	
		},
		change_picture(){
      var that= this;
      axios.post(this.$host+'/change_picture', {

      })
      .then(function (response) {
        console.log(response)
        var data=response.data;
        if(data.code==12){
          
        }else{
        	that.$message.error(data.message);
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('连接失败，请检查网络');
      });	
		},
  },
  mounted(){
    this.information()
  }
};
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  min-height: 860px;
  min-width: 1020px;
  /* background-color: transparent; */
  /* background: url('../../assets/leftboxbg.png'); */
  /* background-size: 100%; */
  background-color: transparent;
  position: relative;
  left: 0%;
}
.return{
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
.personal-detail{
	width: 1262px;
	height: 788px;
  position: absolute;
	left: 7%;
	top: 20px;
  /* background: url('../../assets/background.png');
  background-size: 100%; */
	border-radius: 30px;
	/* box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1); */
	text-align: center;
}
.personal-detail span{
	width: 242px;
	height: 50px;
  position: absolute;
	left: 78px;
	top: 54px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.title li{
  list-style: none;
	width: 80px;
	height: 27px;
  position: relative;
	left: 100px;
	top: 150px;
	color: rgba(142, 87, 86, 1);
	font-size: 18px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
  margin-top: 27px;
}
.content li{
  list-style: none;
  position: relative;
  left: 170px;
  top: -163px;
  width: 188px;
  height: 53px;
}
.content li img{
	width: 70px;
	height: 70px;
  position: relative;
  left: -60px;
  top: -50px;
}
.content>>>.el-input__inner{
	width: 190px;
	height: 35px;
	left: 622px;
	top: 374px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 8px;
	font-size: 14px;
	line-height: 150%;
	border: rgba(172, 141, 104, 1) solid 1px;
}
.introduction>>>.el-textarea__inner{
  width: 457%;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 8px;
	font-size: 20px;
	line-height: 150%;
	border: rgba(172, 141, 104, 1) solid 1px;
  resize: none;
}
.introduction>>>.el-textarea .el-input__count{
  position: absolute;
  top: 200px;
  left: 800px;
}
.main .save{
	width: 120px;
	height: 45px;
  position: absolute;
	left: 949px;
	top: 710px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(142, 87, 86, 1);
	border-radius: 11px;
	font-size: 18px;
	text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
