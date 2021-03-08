<template>
  <div class="box">
    <!-- <img class="loginbox" src="../assets/login-box.png" alt="" />
    <img class="account" src="../assets/account.png" alt="" />
    <img class="password" src="../assets/password.png" alt="" />
    <button class="loginbt" @click="login()"></button>
    <div class="input-text">
        <input
          class="input1"
          placeholder="请输入账号"
          type="text"
          v-model="user.account"
        />
        <input
        class="input2"
        placeholder="请输入密码"
        type="password"
        v-model="user.password"
        />
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
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// export default {
//   name: "loginbox",
//   methods: {
//     changeImg: function() {
//       this.radio1 = !this.radio1;
//       this.radio2 = !this.radio2;
//     },
//     login(){
//       var that=this;
//       axios.post(this.$host+'/student_login',{
//         account: that.user.account,
//         password: that.user.password
//       })
//       .then(function(response){
//         var data=response.data;
//         console.log(data)
//         if(data.code==1){
//           that.$router.push({path:'/home'})
//         }
//         alert(data.message)
//       })
//       .catch(function(error){
//         console.log(error)
//         alert('111111');
//       })
//     }
//   },
//   data() {
//     return {
//       input1: "",
//       input2: "",
//       radio1: true,
//       radio2: false,
//       user:{
//         account:"",
//         password:""
//       }
//     };
//   }
// };
</script>

<style>
/* .box{
  width: 100%;
  height: 100%;
  position: absolute;
  top:144px;
  right:10%;
}
.loginbox {
  width: 500px;
  height: 500px;
  position: relative;
  right: 100px;
}
.account {
  width: 250px;
  height: 68px;
  position: absolute;
  top: 70px;
  left: 25px;
}
.password {
  width: 250px;
  height: 68px;
  position: absolute;
  top: 150px;
  left: 25px;
}
.loginbt {
  width: 110px;
  height: 59px;
  position: absolute;
  top: 290px;
  left: 100px;
  background: url("../assets/loginbt.png");
  background-size: 110px 59px;
  border: none;
  outline: none;
  cursor: pointer;
}
.loginradio1 img {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 250px;
  left: 90px;
}
.loginradio1 span {
  width: 28px;
  height: 21px;
  position: absolute;
  top: 247px;
  left: 110px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
.loginradio2 img {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 250px;
  left: 170px;
}
.loginradio2 span {
  width: 28px;
  height: 21px;
  position: absolute;
  top: 247px;
  left: 190px;
  color: rgba(80, 80, 80, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
.input-text {
position: relative;
top: -440px;
left: -25px;
position: absolute;
top: 65px;
left: -20px;
float: left;
margin-right: 100px;
}
.input-text input{
  height: 100%;
  width: 140px;
  margin: 32px;
  border: none;
  background: none;
  outline: none;
} */
</style>
