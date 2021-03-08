<template>
  <div class="main">
    <navigation style="z-index:99"></navigation>
    <!-- 头部 -->
    <div class="top_bar">
      <img src="../../assets/head.svg">
      <span
        id="uname"
        v-html="getCookie('username')"
      ></span>
    </div>
    <!-- 教师ppt部分 -->
    <div class="main_box">
      <el-dropdown trigger="click">
        <span class="online">
          <img
            src="../../assets/teacher_head.png"
            class="teacher_head"
          >
          <span>在线人数 {{people.currentNumbers}}/{{people.TotalNumbers}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          class="not_online"
        >
          <span>未在线成员</span>
          <img src="../../assets/touxiang.png">
          <p>张三</p>
        </el-dropdown-menu>
      </el-dropdown>
      <el-select
        v-model="ppt_path"
        placeholder="请选择课件"
        style="position: absolute;top:10px;right:30px;"
      >
        <el-option
          label="区域一"
          value="shanghai"
        ></el-option>
        <el-option
          label="区域二"
          value="beijing"
        ></el-option>
      </el-select>
      <iframe
        class="Iframe"
        id="my-iframe"
        src="http://ow365.cn/?i=22238&ssl=1&furl=https://www.uiofield.top/ppt_file/smile.pptx"
        target=""
        scrolling="no"
        frameborder="0"
      ></iframe>
      <div id="blue_btn">
        <MRecorder @handleStop="handelEndRecord" />
        <div @click="showflag=!showflag">
          <img src="../../assets/pen.svg">
          <span>选择画笔</span>
        </div>
      </div>
    </div>
    <!-- 讨论区 -->
    <div class="discussion">
      <img
        src="./../../assets/discussion.svg"
        id="head"
      >
      <span id="tit1">讨论区</span>
      <div id="chat">
        <div
          id="question_box"
          v-show="showQ!=''||responder!=''"
          v-html="(responder!=''?('抢答正确：'+responder):('当前抢答题：'+showQ))"
        ></div>
        <div
          :class="item.account==getCookie('account')?'me':'other'"
          v-for="(item,idx) in content"
          :key="idx"
        >
          <img :src="item.headImage">
          <span id="chat_name">{{item.username}}</span>
          <span id="chat_content">{{item.message}}</span>
        </div>
      </div>
      <div class="send">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
        <img
          src="../../assets/send.svg"
          @click="websocketChat"
        >
        <span
          class="send_text"
          @click="websocketChat"
        >发送</span>
      </div>
    </div>
    <!-- 抢答 -->
    <div class="answer">
      <img src="./../../assets/clock_teacher .svg">
      <span>课堂抢答</span>
      <el-input
        v-model="question"
        placeholder="请输入问题"
      ></el-input>
      <el-input
        v-model="answer"
        placeholder="请输入答案"
      ></el-input>
      <el-button
        type="primary"
        @click="websocketQuestion"
      >开始抢答</el-button>
    </div>
    <!-- 画板 -->
    <div
      class="wraper"
      ref="wraper"
    >
      <div class="canvas-wraper">
        <canvas
          id="canvas"
          ref="canvas"
        ></canvas>
      </div>
      <div
        class="controlPanel"
        v-show="showflag"
      >
        <div class="color_pick">
          <el-color-picker v-model="drawColor"></el-color-picker>
        </div>
        <div
          :class="[initIdx==idx ? 'contro-item_active' : 'contro-item']"
          v-for="(item,idx) in toolsArr"
          :key="idx"
          @click="handleTools(item, idx)"
        >
          <i :class="'iconfont' + item.icon"></i>
        </div>
      </div>
    </div>
    <!-- <audio :src="msource" controls="controls"></audio> -->
  </div>
</template>

<script>
import { fabric } from "fabric";
import html2canvas from "html2canvas";
import Navigation from "../../components/Navigation";
import MRecorder from "@/components/MRecorder";
export default {
  data() {
    return {
      currentTool: "",
      done: false,
      fabricObj: null,
      initIdx: 0,
      people: {
        currentNumbers: 0,
        TotalNumbers: 0,
      },
      showflag: false,
      toolsArr: [
        {
          name: "pencil",
          icon: " icon-pencil",
        },
        {
          name: "line",
          icon: " icon-line",
        },
        {
          name: "arrow",
          icon: " icon-arrow",
        },
        {
          name: "xuxian",
          icon: " icon-xuxian",
        },
        {
          name: "text",
          icon: " icon-ziti",
        },
        {
          name: "juxing",
          icon: " icon-juxing",
        },
        {
          name: "cricle",
          icon: " icon-yuanxing",
        },
        {
          name: "ellipse",
          icon: " icon-tuoyuanxing",
        },
        {
          name: "equilateral", //三角形
          icon: " icon-sanjiaoxing",
        },
        {
          name: "remove",
          icon: " icon-remove",
        },
        {
          name: "undo",
          icon: " icon-huitui",
        },
        {
          name: "redo",
          icon: " icon-xiangqian",
        },
        {
          name: "reset",
          icon: " icon-reset",
        },
      ],
      mouseFrom: {},
      mouseTo: {},
      moveCount: 1,
      doDrawing: false,
      fabricHistoryJson: [],
      mods: 0,
      drawingObject: null, //绘制对象
      drawColor: "#000000",
      drawWidth: 2,
      imageBase64: "",
      zoom: window.zoom ? window.zoom : 1,
      input: "",
      websock: null,
      content: [
        {
          username: "娄鑫浩",
          account: "180807226",
          message: "你好你好⼤家好",
          headImage: require("../../assets/touxiang.png"),
        },
        {
          username: "娄鑫浩",
          account: "123456",
          message: "你好你好⼤家好",
          headImage: require("../../assets/touxiang.png"),
        },
      ],
      ppt_path: "",
      timer: "",
      timer1: "",
      question: "",
      answer: "",
      msource: "",
      showQ: "",
      responder: "",
      websocket: {}
    };
  },
  components: {
    Navigation,
    MRecorder: MRecorder,
  },
  created() {
    this.initWebSocket();
    this.useWebSocket();
  },
  destroyed() {
    clearInterval(this.timer);
    this.websock.close(); //离开路由之后断开websocket连接
    this.websocket.close();
  },
  methods: {
    initCanvas() {
      let _this = this;
      this.fabricObj = new fabric.Canvas("canvas", {
        isDrawingMode: true,
        selectable: false,
        selection: false,
        devicePixelRatio: true, //Retina 高清屏 屏幕支持
      });
      this.fabricObj.freeDrawingBrush.width = 2;
      this.fabricObj.setWidth(1270);
      this.fabricObj.setHeight(702);
      //绑定画板事件
      this.fabricObjAddEvent();
    },
    //时间监听
    fabricObjAddEvent() {
      this.fabricObj.on({
        "mouse:down": (o) => {
          this.mouseFrom.x = o.pointer.x;
          this.mouseFrom.y = o.pointer.y;
          this.doDrawing = true;
          if (this.currentTool == "text") {
            this.drawText();
          }
        },
        "mouse:up": (o) => {
          this.mouseTo.x = o.pointer.x;
          this.mouseTo.y = o.pointer.y;
          this.drawingObject = null;
          this.moveCount = 1;
          this.doDrawing = false;
          this.updateModifications(true);
        },
        "mouse:move": (o) => {
          if (this.moveCount % 2 && !this.doDrawing) {
            //减少绘制频率
            return;
          }
          this.moveCount++;
          this.mouseTo.x = o.pointer.x;
          this.mouseTo.y = o.pointer.y;
          this.drawing();
        },
        //对象移动时间
        "object:moving": (e) => {
          e.target.opacity = 0.5;
        },
        //增加对象
        "object:added": (e) => {
          // debugger
        },
        "object:modified": (e) => {
          e.target.opacity = 1;
          let object = e.target;
          this.updateModifications(true);
        },
        "selection:created": (e) => {
          if (e.target._objects) {
            //多选删除
            var etCount = e.target._objects.length;
            for (var etindex = 0; etindex < etCount; etindex++) {
              this.fabricObj.remove(e.target._objects[etindex]);
            }
          } else {
            //单选删除
            this.fabricObj.remove(e.target);
          }
          this.fabricObj.discardActiveObject(); //清楚选中框
          this.updateModifications(true);
        },
      });
    },
    //储存历史记录
    updateModifications(savehistory) {
      if (savehistory == true) {
        this.fabricHistoryJson.push(JSON.stringify(this.fabricObj));
      }
    },
    //canvas 历史后退
    undo() {
      let state = this.fabricHistoryJson;
      if (this.mods < state.length) {
        this.fabricObj.clear().renderAll();
        this.fabricObj.loadFromJSON(state[state.length - 1 - this.mods - 1]);
        this.fabricObj.renderAll();
        this.mods += 1;
      }
    },
    //前进
    redo() {
      let state = this.fabricHistoryJson;
      if (this.mods > 0) {
        this.fabricObj.clear().renderAll();
        this.fabricObj.loadFromJSON(state[state.length - 1 - this.mods + 1]);
        this.fabricObj.renderAll();
        this.mods -= 1;
      }
    },
    transformMouse(mouseX, mouseY) {
      return { x: mouseX / this.zoom, y: mouseY / this.zoom };
    },
    resetObj() {
      this.fabricObj.selectable = false;
      this.fabricObj.selection = false;
      this.fabricObj.skipTargetFind = true;
      //清除文字对象
      if (this.textboxObj) {
        this.textboxObj.exitEditing();
        this.textboxObj = null;
      }
    },
    handleTools(tools, idx) {
      this.initIdx = idx;
      this.currentTool = tools.name;
      this.fabricObj.isDrawingMode = false;
      this.resetObj();
      switch (tools.name) {
        case "pencil":
          this.fabricObj.isDrawingMode = true;
          break;
        case "remove":
          this.fabricObj.selection = true;
          this.fabricObj.skipTargetFind = false;
          this.fabricObj.selectable = true;
          break;
        case "reset":
          this.fabricObj.clear();
          break;
        case "redo":
          this.redo();
          break;
        case "undo":
          this.undo();
          break;
        default:
          break;
      }
    },
    //绘制文字对象
    drawText() {
      this.textboxObj = new fabric.Textbox(" ", {
        left: this.mouseFrom.x,
        top: this.mouseFrom.y,
        width: 220,
        fontSize: 18,
        fill: this.drawColor,
        hasControls: true,
      });
      this.fabricObj.add(this.textboxObj);
      this.textboxObj.enterEditing();
      this.textboxObj.hiddenTextarea.focus();
      this.updateModifications(true);
    },
    drawing() {
      let _this = this;
      if (this.drawingObject) {
        this.fabricObj.remove(this.drawingObject);
      }
      let fabricObject = null;
      switch (this.currentTool) {
        case "pencil":
          this.fabricObj.isDrawingMode = true;
          break;
        case "line":
          fabricObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
            ],
            {
              stroke: this.drawColor,
              strokeWidth: this.drawWidth,
            }
          );
          break;
        case "arrow":
          fabricObject = new fabric.Path(
            this.drawArrow(
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
              17.5,
              17.5
            ),
            {
              stroke: this.drawColor,
              fill: "rgba(255,255,255,0)",
              strokeWidth: this.drawWidth,
            }
          );
          break;
        case "xuxian": //doshed line
          fabricObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
            ],
            {
              strokeDashArray: [10, 3],
              stroke: this.drawColor,
              strokeWidth: this.drawWidth,
            }
          );
          break;
        case "juxing": //矩形
          let path =
            "M " +
            this.mouseFrom.x +
            " " +
            this.mouseFrom.y +
            " L " +
            this.mouseTo.x +
            " " +
            this.mouseFrom.y +
            " L " +
            this.mouseTo.x +
            " " +
            this.mouseTo.y +
            " L " +
            this.mouseFrom.x +
            " " +
            this.mouseTo.y +
            " L " +
            this.mouseFrom.x +
            " " +
            this.mouseFrom.y +
            " z";
          fabricObject = new fabric.Path(path, {
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            stroke: this.drawColor,
            strokeWidth: this.drawWidth,
            fill: "rgba(255, 255, 255, 0)",
          });
          break;
        case "cricle": //正圆
          let radius =
            Math.sqrt(
              (this.mouseTo.x - this.mouseFrom.x) *
                (this.mouseTo.x - this.mouseFrom.x) +
                (this.mouseTo.y - this.mouseFrom.y) *
                  (this.mouseTo.y - this.mouseFrom.y)
            ) / 2;
          fabricObject = new fabric.Circle({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            stroke: this.drawColor,
            fill: "rgba(255, 255, 255, 0)",
            radius: radius,
            strokeWidth: this.drawWidth,
          });
          break;
        case "ellipse": //椭圆
          let left = this.mouseFrom.x;
          let top = this.mouseFrom.y;
          let ellipse =
            Math.sqrt(
              (this.mouseTo.x - left) * (this.mouseTo.x - left) +
                (this.mouseTo.y - top) * (this.mouseTo.y - top)
            ) / 2;
          fabricObject = new fabric.Ellipse({
            left: left,
            top: top,
            stroke: this.drawColor,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            rx: Math.abs(left - this.mouseTo.x),
            ry: Math.abs(top - this.mouseTo.y),
            strokeWidth: this.drawWidth,
          });
          break;
        case "equilateral": //等边三角形
          let height = this.mouseTo.y - this.mouseFrom.y;
          fabricObject = new fabric.Triangle({
            top: this.mouseFrom.y,
            left: this.mouseFrom.x,
            width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
            height: height,
            stroke: this.drawColor,
            strokeWidth: this.drawWidth,
            fill: "rgba(255,255,255,0)",
          });
          break;
        case "remove":
          break;
        default:
          // statements_def'
          break;
      }
      if (fabricObject) {
        this.fabricObj.add(fabricObject);
        this.drawingObject = fabricObject;
      }
    },
    //书写箭头的方法
    drawArrow(fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
      let arrowX = fromX - topX,
        arrowY = fromY - topY;
      let path = " M " + fromX + " " + fromY;
      path += " L " + toX + " " + toY;
      arrowX = toX + topX;
      arrowY = toY + topY;
      path += " M " + arrowX + " " + arrowY;
      path += " L " + toX + " " + toY;
      arrowX = toX + botX;
      arrowY = toY + botY;
      path += " L " + arrowX + " " + arrowY;
      return path;
    },
    downLoadImage() {
      this.done = true;
      //生成双倍像素比的图片
      //    一
      let base64URl = this.fabricObj.toDataURL({
        formart: "png",
        multiplier: 2,
      });
      this.imageBase64 = base64URl;
      let actions = {
        type: "direct",
        info: {
          type: "pic",
          img: this.imageBase64,
        },
      };
      this.websocketsend(JSON.stringify(actions));
      this.done = false;
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
      if (redata.type == "pong") {
        this.people = redata.info;
      } else if (redata.type == "chat") {
        this.content = this.content.concat(redata.info);
        if (redata.info.responder != undefined) {
          this.responder = redata.info.responder;
        }
      } else if (redata.type == "question") {
        this.showQ = redata.info;
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
    websocketQuestion() {
      let actions = {
        type: "question",
        info: {
          question: this.question,
          answer: this.answer,
        },
      };
      this.question = "";
      this.answer = "";
      this.websocketsend(JSON.stringify(actions));
    },
    handelEndRecord(param) {
      var that = this;
      this.msource = param.url;
      //将Blob 对象转换成 ArrayBuffer
      var reader = new FileReader();
      reader.readAsArrayBuffer(param.mblob);
      reader.onload = function (e) {
        that.websocket.send(reader.result);
      };
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
    },
    Videowebsocketsend(Data) {
      //数据发送
      this.websocket.send(Data);
    },
    Videowebsocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  },
  mounted() {
    //初始化canvas
    this.initCanvas();
    this.fabricObj.freeDrawingBrush.color = this.drawColor;
    this.timer = setInterval(this.websocketonopen, 3000);
    this.timer1 = setInterval(this.downLoadImage, 1000);
  },
  watch: {
    drawColor(newValue, oldValue) {
      this.fabricObj.freeDrawingBrush.color = newValue;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 960px;
  min-width: 1890px;
  position: relative;
  background: rgba(245, 241, 241, 1);
}
.top_bar {
  width: 100%;
  height: 88px;
  position: relative;
  top: -969px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.top_bar img {
  width: 45px;
  height: 45px;
  position: absolute;
  float: left;
  left: 90%;
  margin-top: 20px;
  font-size: 45px;
  color: rgba(42, 130, 228, 1);
}
.top_bar span {
  width: 60px;
  height: 30px;
  position: relative;
  top: 27px;
  left: 45%;
  color: rgba(42, 130, 228, 1);
  font-size: 20px;
  line-height: 150%;
  text-align: left;
}
.main_box {
  width: 1370px;
  height: 830px;
  position: absolute;
  left: 144px;
  top: 112px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.not_online {
  width: 130px;
  height: 264px;
  position: absolute;
  left: 236px;
  top: 193px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(241, 243, 245, 1);
  border-radius: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.not_online span {
  width: 75px;
  height: 22px;
  position: absolute;
  top: 18px;
  left: 28px;
  color: rgba(212, 48, 48, 1);
  font-size: 15px;
  text-align: left;
}
.not_online img {
  width: 30px;
  height: 30px;
  position: relative;
  left: -23px;
  top: 40px;
}
.not_online p {
  width: 45px;
  height: 22px;
  position: relative;
  left: 60px;
  top: -5px;
  color: rgba(80, 80, 80, 1);
  font-size: 15px;
}
.teacher_head {
  width: 35px;
  float: left;
  margin: 7.5px 10px 7.5px 30px;
}
.online span {
  height: 50px;
  float: left;
  line-height: 50px;
}
.online {
  line-height: 50px;
}
.main_box /deep/ .el-dropdown {
  height: 50px;
  float: left;
  position: relative;
}
.main /deep/ .el-dropdown-menu {
  width: 100%;
}
.discussion {
  width: 338px;
  height: 616px;
  position: absolute;
  left: 1539px;
  top: 112px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
#tit1 {
  height: 25px;
  width: 70px;
  float: left;
  margin: 45px 0 0 5px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  text-align: left;
  font-weight: bold;
}
#head {
  width: 25px;
  height: 25px;
  float: left;
  margin: 45px 0 0 39px;
}
.send {
  width: 100%;
  height: 60px;
  position: relative;
}
.send >>> .el-input__inner {
  width: 246px;
  height: 46px;
  margin: 7px 5px 7px 20px;
  float: left;
}
.send img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 280px;
  top: 0;
  -webkit-transform: rotate(-120deg);
  transform: rotate(-120deg);
  font-size: 30px;
  color: rgba(42, 130, 228, 1);
}
.send .send_text {
  width: 40px;
  height: 22px;
  position: absolute;
  left: 280px;
  top: 35px;
  color: rgba(42, 130, 228, 1);
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  display: block;
}
.answer {
  width: 338px;
  height: 200px;
  position: absolute;
  left: 1539px;
  top: 742px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.answer >>> .el-input__inner {
  width: 278px;
  height: 40px;
  margin-bottom: 10px;
}
.answer img {
  width: 24px;
  float: left;
  margin: 17px 0 5px 39px;
}
.answer span {
  height: 25px;
  width: 80px;
  float: left;
  margin: 18px 0 5px 5px;
  color: rgba(80, 80, 80, 1);
  font-size: 20px;
  text-align: left;
  font-weight: bold;
}
.answer .el-button {
  position: absolute;
  top: 150px;
  left: 120px;
}
.Iframe {
  position: absolute;
  left: 50px;
  top: 65px;
  width: 1270px;
  height: 732px;
}
#blue_btn {
  width: 263px;
  height: 88px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(42, 130, 228, 1);
  border-radius: 12px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  position: absolute;
  bottom: 70px;
  right: 60px;
  z-index: 99;
}
#blue_btn div {
  width: 130px;
  height: 50px;
  float: left;
  margin: 19px 0;
  font-size: 16px;
  color: white;
  line-height: 20px;
  text-align: center;
}
#blue_btn div img {
  width: 30px;
  height: 30px;
  margin: 0 50px;
  margin-bottom: 5px;
  display: block;
}
.wraper {
  width: 1270px;
  height: 702px;
  position: absolute;
  left: 195px;
  top: 175px;
  text-align: center;
}
.canvas-wraper {
  width: 100%;
  height: 100%;
  color: rgba(80, 80, 80, 1);
  border-radius: 5px;
  position: relative;
  text-align: center;
}
.controlPanel {
  width: 350px;
  position: absolute;
  text-align: center;
  padding: 10px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(241, 243, 245, 1);
  border: 2px solid rgba(80, 80, 80, 1);
  border-radius: 10px;
  font-size: 14px;
  right: 70px;
  bottom: 90px;
  z-index: 99;
}
.contro-item,
.contro-item_active {
  width: 50px;
  height: 50px;
  text-align: center;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}
.contro-item i {
  font-size: 38px;
  line-height: 50px;
}
.contro-item_active {
  background: #e34f51;
  color: #fff;
  border-radius: 3px;
}
.contro-item_active i {
  font-size: 42px;
}
.color_pick {
  width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  margin: 10px;
  float: left;
}
.wraper /deep/ .el-color-picker {
  width: 38px;
  height: 38px;
  margin: 6px 0;
  border-radius: 38px;
}
.wraper /deep/ .el-color-picker__trigger {
  height: 100%;
  width: 100%;
  padding: 0;
  position: relative;
  cursor: pointer;
}
.wraper /deep/ .el-color-picker__color-inner {
  border-radius: 38px;
}
.wraper /deep/ .el-color-picker__color,
.wraper /deep/ .el-color-picker__trigger {
  border: none;
}
#chat {
  width: 100%;
  height: 480px;
  display: block;
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
  width: 40px;
  position: absolute;
  text-align: center;
  top: 40px;
  right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  line-height: 16px;
  margin: 10px auto;
  font-size: 14px;
  font-weight: bold;
  color: rgba(42, 130, 228, 1);
  padding: 10px 0;
  border: 1px solid rgba(42, 130, 228, 1);
  border-radius: 10px;
}
</style>



