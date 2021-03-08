<template>
  <div class="main">
    <div id="login_bg">
      <img src="../assets/login-bg.jpg"  />
    </div>

    <div class="box">
        <img class="loginbox" src="../assets/login-box.png">
        <img class="shihua" src="../assets/shihua.png">
        <button class="loginbt" @click="login()"></button>
        <div class="account">
          <input class="input1" placeholder="请输入账号" type="text" v-model="user.account" />
        </div>
        <div class="password">
          <input class="input2" placeholder="请输入密码" type="password" v-model="user.password" />
        </div>

      <div class="loginradio1">
        <img src="../assets/loginRadio1.png" v-show="radio1" @click="changeImg" />
        <img
          src="../assets/loginRadio2.png"
          v-show="!radio1"
          @click="changeImg"
          />
          <span>教师</span>
      </div>

      <div class="loginradio2">
        <img src="../assets/loginRadio1.png" v-show="radio2" @click="changeImg" />
        <img
          src="../assets/loginRadio2.png"
          v-show="!radio2"
          @click="changeImg"
        />
        <span>学生</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
export default {
  name: "Login",
  methods: {
    changeImg: function() {
      this.radio1 = !this.radio1;
      this.radio2 = !this.radio2;
    },
    login(){
      if(this.radio1){
        this.StudentLogin()
      }else{
        this.TeacherLogin()
      }
    },
    StudentLogin(){
      var that=this;
      axios.post(this.$host+'/stu_login',{
        account: that.user.account,
        password: that.user.password
      })
      .then(function(response){
        var data=response.data;
        if(data.code==1){
          that.setCookie( 'permission' ,false,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'username' ,data.info.username,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'headUrl' ,data.info.headUrl,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'account' ,that.user.account,365 * 24 * 60 * 60 * 1000);
          that.$router.push({path:'/home'})
        }else{
          alert(data.message)
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    TeacherLogin(){
      var that=this;
      axios.post(this.$host+'/tea_login',{
        account: that.user.account,
        password: that.user.password
      })
      .then(function(response){
        var data=response.data;
        if(data.code==1){
          that.setCookie( 'permission' ,true,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'username' ,data.info.username,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'headUrl' ,data.info.headImage,365 * 24 * 60 * 60 * 1000);
          that.setCookie( 'account' ,that.user.account,365 * 24 * 60 * 60 * 1000);
          that.$router.push({path:'/data_manage'})
        }else{
          alert(data.message)
        }
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },
  data() {
    return {
      input1: "",
      input2: "",
      radio1: false,
      radio2: true,
      user:{
        account:"",
        password:""
      }
    };
  }
};
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1900px;
  min-height: 920px;
}
#login_bg{
  width:100%;
  height:100%;
  position: relative;
}
#login_bg img{
  width:100%;
  height:100%;
  display: block;
}
.shihua {
  width: 25%;
  height: 50%;
  position: absolute;
  top: 17.2%;
  left: 13%;
}
.box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loginbox {
  width: 612px;
  height: 612px;
  position: relative;
  left: 220px;
  top: 144px;
}
.account {
  background: url('../assets/account.png');
  background-size: 100%;
  width: 300px;
  height: 82px;
  position: relative;
  margin-bottom: 6px;
  left: 51%;
  top: -400px;
}
.password {
  background: url('../assets/password.png');
  background-size: 100%;
  width: 300px;
  height: 82px;
  position: relative;
  left: 51%;
  top: -400px;
}
.input1,.input2{
  margin: 25px 0 0 60px;
  height: 30px;
  width: 180px;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 20px;
}
.loginbt {
  width: 110px;
  height: 59px;
  position: relative;
  top: -50px;
  left: -150px;
  background: url("../assets/loginbt.png");
  background-size: 110px 59px;
  border: none;
  outline: none;
  cursor: pointer;
}
.loginradio1 img {
  width: 15px;
  height: 15px;
  position: relative;
  top: -350px;
  left: 120px;
}
.loginradio1 span {
  position: relative;
  top: -353px;
  left: 120px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
}
.loginradio2 img {
  width: 15px;
  height: 15px;
  position: relative;
  top: -369px;
  left: 200px;
}
.loginradio2 span {
  position: relative;
  top: -372px;
  left: 200px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
}
</style>
