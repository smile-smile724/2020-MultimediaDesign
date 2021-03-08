<template>
  <div class="main">
    <button
      class="re"
      @click="re()"
    ></button>
    <div class="box">
      <span class="dati">限时答题</span>
      <img
        src="../../assets/clock.svg"
        class="clock"
        v-if="startflag"
      >
      <div
        class="buttonItem"
        v-if="startflag"
      >
        <div class="redsendCode">{{'倒计时：'+time+'s'}}</div>
      </div>
      <div
        class="question"
        v-if="startflag"
      >
        <span>{{question.question}}</span>
      </div>
      <div
        class="option"
        v-if="startflag"
      >
        <el-radio-group v-model="radio">
          <el-radio
            :label="1"
            @change="submit(1)"
          >{{question.answer1}}</el-radio>
          <el-radio
            :label="2"
            @change="submit(2)"
          >{{question.answer2}}</el-radio>
          <el-radio
            :label="3"
            @change="submit(3)"
          >{{question.answer3}}</el-radio>
          <el-radio
            :label="4"
            @change="submit(4)"
          >{{question.answer4}}</el-radio>
        </el-radio-group>
      </div>

      <div
        id="startGame"
        v-if="!startflag"
      >
        <span @click="StartGame">开始答题</span>
      </div>
    </div>
    <div
      class="mask"
      :style="'display:'+showflag"
      v-if="showModal"
    ></div>
    <div
      class="mask_box"
      v-if="showModal"
    >
      <span>{{(questionflag?'恭喜你回答正确':'回答错误，请继续努力')}}</span>
      <span style="top:286px">获得积分:{{questionflag?'2':'0'}}</span>
      <button
        class="determine"
        @click="nextQ"
      >下一题</button>
    </div>

  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-width: 1900px;
  min-height: 900px;
  background: rgba(226, 221, 213, 1);
}
.box {
  width: 1262px;
  height: 788px;
  position: relative;
  top: 100px;
  left: 50%;
  margin-left: -631px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.re {
  width: 253px;
  height: 69px;
  background: url("../../assets/return.png");
  position: absolute;
  top: 33px;
  left: 54px;
  outline: none;
  border: none;
}
.dati {
  width: 242px;
  height: 50px;
  position: relative;
  left: -500px;
  top: 60px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.question {
  width: 1062px;
  height: 99px;
  position: relative;
  left: 50%;
  margin-left: -531px;
  top: 80px;
  opacity: 0.8;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(140, 83, 83, 1);
  border-radius: 40px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.question span {
  width: 528px;
  height: 36px;
  position: relative;
  left: 10px;
  top: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
}
.option {
  width: 1062px;
  height: 432px;
  position: relative;
  left: 50%;
  margin-left: -531px;
  top: 108px;
  opacity: 0.8;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.el-radio-group {
  width: 10px;
  height: 250px;
  position: absolute;
  top: 10px;
  left: 100px;
}
.main >>> .el-radio__label {
  width: 150px;
  height: 45px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
}
.el-radio {
  margin-top: 45px;
}
.main >>> .el-radio {
  width: 150px;
  height: 45px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  border-color: rgba(158, 112, 112, 1) !important;
}
.main >>> .el-radio__inner:hover {
  border-color: rgba(158, 112, 112, 1) !important;
}
.main >>> .el-radio__inner {
  width: 40px;
  height: 40px;
  border: 5px solid rgba(158, 112, 112, 1);
  background: transparent;
}
.main >>> .el-radio__input.is-checked + .el-radio__label {
  color: rgba(158, 112, 112, 1) !important;
}
.main >>> .el-radio__input.is-checked .el-radio__inner {
  /* background: rgb(218, 213, 213) !important; */
  background: url("../../assets/method-draw-image.svg");
  background-size: 100%;
}
.buttonItem {
  width: 500px;
  position: absolute;
  left: 1020px;
  top: 63px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
}
.buttonItem input {
  height: 45px;
  font-size: 1rem;
  padding-left: 10px;
  border: 0;
  outline: none;
}
.redsendCode {
  border: 0;
  outline: none;
  cursor: pointer;
  margin-right: 0px;
  width: 200px;
}
.clock {
  width: 35px;
  height: 35px;
  position: relative;
  left: 300px;
  top: 60px;
  font-size: 35px;
  color: rgba(140, 83, 83, 1);
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  opacity: 0.3;
}
.determine {
  width: 146px;
  height: 45px;
  position: relative;
  top: 400px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(158, 112, 112, 1);
  border-radius: 11px;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
}
.mask_box {
  width: 846px;
  height: 552px;
  position: relative;
  left: 50%;
  margin-left: -420px;
  top: -600px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.mask_box span {
  width: 651px;
  height: 60px;
  position: absolute;
  left: 10%;
  top: 200px;
  color: rgba(80, 80, 80, 1);
  font-size: 40px;
  line-height: 150%;
  text-align: center;
}
.time-up {
  width: 450px;
  height: 390px;
  position: absolute;
  left: 22%;
  top: -70px;
}
#startGame {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
}
#startGame span {
  width: 200px;
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -30px 0 0 -100px;
  background-color: rgba(140, 83, 83, 1);
  border-radius: 20px;
  color: white;
  cursor: pointer;
}
</style>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "paiwei",
  components: {
    // timeup
  },
  data() {
    return {
      radio: "",
      vercode: "",
      btnDisabled: false,
      showModal: false,
      startflag: false,
      question: {
        id: 1,
        question: "问题1",
        answer1: "A",
        answer2: "B",
        answer3: "C",
        answer4: "D",
        correct: null,
      },
      timer: {},
      time: 120,
      questionflag:false
    };
  },
  methods: {
    re() {
      this.$router.push({ path: "/kehoulist" });
    },
    StartGame() {
      this.startflag = true;
      this.getQuestion();
    },
    getQuestion() {
      var that = this;
      axios
        .get(this.$host + "/get_que")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.question = data.info;
            that.timer = setInterval(() => {
              //设置延迟执行
              that.time--;
              if (that.time == 0) {
                that.time = 120;
                this.submit(null)
              }
            }, 1000);
          } else {
            that.$message({
              message: data.message,
              type: "warning",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submit(num) {
      var that = this;
      clearInterval(that.timer);
      axios
        .post(this.$host + "/judge_que", {
          type: 1,
          subject: {
            id: this.question.id,
            correct: num,
          },
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.showModal=true;
            that.questionflag=data.info;
            that.radio=''
          } else {
            that.$message({
              message: data.message,
              type: "warning",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    nextQ(){
      this.showModal=false;
      this.getQuestion();
    }
  },
};
</script>