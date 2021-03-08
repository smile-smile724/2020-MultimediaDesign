<template>
  <div class="main">
    <button
      class="re"
      @click="re()"
    ></button>
    <div class="box">
        <pdf
        :src="pdfSrc"
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"
        class="Iframe"
      >
      </pdf>
      <img
        :src="imgUrl"
        v-if="imgUrl!=''"
        id="canvas"
      >
      <div
        v-if="imgUrl==''"
        id="canvas"
      ></div>
      <div class="discussion">
        <img
          src="./../../assets/ppt-head.svg"
          class="discussion_logo"
        >
        <span id="tit1">在线人数{{people.currentNumbers}}/{{people.TotalNumbers}}</span>
        <p>讨论区</p>
        <div class="send">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            class="teacher_input"
          ></el-input>
          <img
            src="../../assets/ppt-send.svg"
            @click="websocketChat"
          >
          <span
            class="send_text"
            @click="websocketChat"
          >发送</span>
        </div>
        <div id="chat">
          <div
            id="question_box"
            v-show="question!=''||responder!=''"
            v-html="(responder!=''?('抢答正确：'+responder):('当前抢答题：'+question))"
          ></div>
          <audio
            :src="msource"
            controls="controls"
            preload="auto"
            hidden="true"
            autoplay="autoplay"
            crossOrigin="anonymous"
            id="audioOutput"
          ></audio>
          <div
            :class="item.account==getCookie('account')?'me':'other'"
            v-for="(item,idx) in chat"
            :key="idx"
          >
            <img :src="item.headImage">
            <span id="chat_name">{{item.username}}</span>
            <span id="chat_content">{{item.message}}</span>
          </div>
        </div>
        <div
          id="blue_btn"
          @click="AudioPlay"
        >
          <img :src="pic[index]">
          <span>连接语音</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pdf from "vue-pdf";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      input: "",
      websock: null,
      content: [],
      timer: "",
      imgUrl: "",
      people: {
        currentNumbers: 0,
        TotalNumbers: 0,
      },
      chat: [],
      question: "",
      websocket: {},
      responder: "",
      receive: [],
      msource: "",
      audio: {},
      audioList: [],
      AudioIndex: 0,
      audioFlag: true,
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      pic:[
        require('../../assets/grey_audio.png'),
        require('../../assets/voice.svg')
      ],
      index:0,
      pdfSrc:''
    };
  },
  components: {
    pdf: pdf,
  },
  created() {
    this.initWebSocket();
    this.pdfSrc = pdf.createLoadingTask(this.$fileUrl+'/ppt_file/smile.pdf');
    this.useWebSocket();
  },
  destroyed() {
    clearInterval(this.timer);
    this.websock.close(); //离开路由之后断开websocket连接
    this.websocket.close();
  },
  methods: {
    re() {
      this.$router.push({ path: "/course_learning" });
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri =
        this.$webSocket +
        "/websocket_course/" +
        this.getCookie("permission") +
        "/" +
        this.getCookie("username") +
        "/" +
        this.getCookie("account");
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      if (redata.type == "direct" && redata.info.type == "pic") {
        this.imgUrl = redata.info.img;
      } else if (redata.type == "direct" && redata.info.type == "page") {
        this.currentPage = redata.info.currentPage;
      } else if (redata.type == "direct" && redata.info.type == "pdf") {
        this.pdfSrc = pdf.createLoadingTask(redata.info.pdf);
      } else if (redata.type == "pong") {
        this.people = redata.info;
      } else if (redata.type == "chat") {
        this.chat = this.chat.concat(redata.info);
        console.log(redata.info)
        if (redata.info.responder != undefined) {
          this.responder = redata.info.responder;
        }
      } else if (redata.type == "question") {
        this.question = redata.info;
        this.responder = "";
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    websocketonopen() {
      let actions = {
        type: "ping",
        info: null,
      };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketChat() {
      let actions = {
        type: "chat",
        info: {
          message: this.input,
          headImage: this.getCookie("headUrl"),
        },
      };
      this.websocketsend(JSON.stringify(actions));
      this.input = "";
    },
    useWebSocket() {
      this.websocket = new WebSocket(this.$webSocket + "/binary_voice");
      this.websocket.binaryType = "arraybuffer"; //传输的是 ArrayBuffer 类型的数据
      this.websocket.onmessage = this.Videowebsocketonmessage;
      this.websocket.onopen = this.Videowebsocketonopen;
      this.websocket.onerror = this.Videowebsocketonerror;
      this.websocket.onclose = this.Videowebsocketclose;
    },
    Videowebsocketonerror() {
      //连接建立失败重连
      this.useWebSocket();
    },
    Videowebsocketonmessage(e) {
      //数据接收
      var that = this;
      var blob = new Blob([e.data], { type: "audio/wav" });
      var src = URL.createObjectURL(blob);
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function () {
        var recoveredBlob = xhr.response;
        var reader = new FileReader();
        reader.onload = function () {
          var blobAsDataUrl = reader.result;
          that.audioList = that.audioList.concat(blobAsDataUrl);
          that.audio = document.querySelector("#audioOutput");
          if (that.AudioIndex < that.audioList.length && !that.audioFlag) {
            that.audioFlag = true;
            that.msource = that.audioList[that.AudioIndex];
            that.AudioIndex++;
          }
        };
        reader.readAsDataURL(recoveredBlob);
      };

      xhr.open("GET", src);
      xhr.send();
    },
    Videowebsocketsend(Data) {
      //数据发送
      this.websocket.send(Data);
    },
    Videowebsocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    AudioPlay() {
      if (this.audioList.length != 0) {
        this.index=1;
        this.audio.play();
        var that = this;
        if (that.AudioIndex == 0) {
          that.msource = that.audioList[that.AudioIndex];
          that.AudioIndex++;
        }
        this.audio.addEventListener(
          "ended",
          function () {
            if (that.AudioIndex < that.audioList.length) {
              that.msource = that.audioList[that.AudioIndex];
              that.AudioIndex++;
            } else {
              that.audioFlag = false;
            }
          },
          false
        );
      }
    },
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    loadPdfHandler(e) {
      this.currentPage = 1; 
    },
  },
  mounted(){
    var that = this;
    this.timer = setInterval(this.websocketonopen, 3000);
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 960px;
  min-width: 1900px;
  position: relative;
  background: rgba(226, 221, 213, 1);
}
.box {
  width: 95%;
  height: 89%;
  position: relative;
  left: 48px;
  top: 80px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
}
.re {
  position: absolute;
  left: 54px;
  background: url("../../assets/return.png");
  width: 253px;
  height: 69px;
  outline: none;
  border: none;
  cursor: pointer;
}
.Iframe,
#canvas {
  position: absolute;
  left: 30px;
  top: 75px;
}
.Iframe {
  width: 1270px;
  height: 802px;
}
#canvas {
  width: 1270px;
  height: 782px;
}
.discussion {
  width: 470px;
  height: 802px;
  position: absolute;
  left: 1316px;
  top: 26px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.discussion p {
  width: 49.3%;
  height: 37px;
  position: relative;
  margin-left: 124px;
  margin-top: 0px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(157, 110, 108, 1);
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  line-height: 200%;
}
.discussion_logo {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 37px;
  top: 63px;
  color: rgba(157, 110, 108, 1);
}
#tit1 {
  width: 126px;
  height: 24px;
  position: absolute;
  left: 70px;
  top: 63px;
  color: rgba(157, 110, 108, 1);
  font-size: 16px;
  line-height: 150%;
  text-align: left;
  margin-bottom: 20px;
}
.send >>> .el-input__inner {
  width: 347px;
  height: 47px;
  position: absolute;
  top: 655px;
  left: 37px;
  border-color: rgba(172, 141, 104, 0.5);
}
.send .send_text {
  width: 30px;
  height: 22px;
  position: absolute;
  left: 417px;
  top: 94%;
  color: rgba(157, 110, 108, 1);
  font-size: 15px;
  line-height: 150%;
  text-align: left;
  cursor: pointer;
}
.send img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 410px;
  top: 90%;
  -webkit-transform: rotate(-120deg);
  transform: rotate(-120deg);
  color: rgba(157, 110, 108, 1);
  cursor: pointer;
}
#canvas {
  width: 1270px;
  height: 702px;
  padding-bottom: 78px;
  padding-top: 30px;
  position: absolute;
  left: 30px;
  top: 45px;
  z-index: 99;
}
#chat {
  height: 600px;
  overflow-y: auto;
  margin-top: 20px;
}
.me,
.other {
  width: 90%;
  min-height: 60px;
  margin: 15px auto;
  display: block;
  position: relative;
}
.other {
  text-align: left;
}
.me {
  text-align: right;
}
.me #chat_name {
  position: absolute;
  text-align: center;
  top: 40px;
  right: 0;
}
.other #chat_name {
  text-align: center;
  position: absolute;
  top: 40px;
  left: 0;
}
.me img,
.other img {
  width: 40px;
  height: 40px;
}
.me img {
  float: right;
}
.other img {
  float: left;
}
#chat_content {
  display: table;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  font-size: 14px;
  padding: 5px 10px;
  line-height: 30px;
  border: rgba(157, 110, 108, 1) solid 1px;
  box-shadow: 0px 4px 4px 0px rgba(210, 193, 180, 1);
  text-align: left;
  word-break: break-all;
}
.other #chat_content {
  margin-left: 50px;
}
.me #chat_content {
  margin-right: 10px;
  float: right;
}
#question_box {
  width: 90%;
  line-height: 20px;
  margin: 0 auto;
  font-size: 16px;
  font-weight: bold;
  color: rgba(157, 110, 108, 1);
  padding: 10px 0;
  border: 1px solid rgba(157, 110, 108, 1);
  border-radius: 10px;
}
#blue_btn {
  width: 130px;
  height: 80px;
  font-size: 16px;
  color: white;
  background-color: rgba(42, 130, 228, 1);
  border-radius: 12px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  position: absolute;
  bottom: 70px;
  right: 550px;
  z-index: 99;
  line-height: 20px;
  margin: 19px 0;
}
#blue_btn img {
  width: 30px;
  height: 30px;
  margin: 13px 50px;
  margin-bottom: 5px;
  display: block;
}
</style>