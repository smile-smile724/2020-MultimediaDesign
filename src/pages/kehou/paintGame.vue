<template>
  <div
    class="wraper"
    ref="wraper"
  >
    <button
      class="re"
      @click="re()"
    ></button>
    <div class="canvas-wraper">
      <div class="top_box">
        <span
          style="margin-left:50px;float:left"
          v-show="startflag"
        >当前玩家：</span>
        <img
          :src="judge?getCookie('headUrl'):notice.headImage"
          id="head"
          v-show="startflag"
        >
        <span
          style="font-weight:normal"
          v-show="startflag"
        >{{judge?getCookie('username'):notice.username}}</span>
        <span
          style="position:absolute;width:100%;left:0;font-size:25px;display:block;top:0;text-align:center"
          v-show="startflag"
        >{{judge?'题目：《'+notice.title+'》':'提示：'+notice.hint}}</span>
        <span
          style="margin-right:30px;float:right"
          v-show="startflag"
        >倒计时：{{time}}秒</span>
        <img
          src="../../assets/nock.svg"
          id="nock"
          v-show="startflag"
        >
      </div>
      <canvas
        id="canvas"
        ref="canvas"
      ></canvas>
      <img
        :src="imgUrl"
        v-if="imgUrl!=''&&!judge"
        id="canvasImg"
      >
      <div class="bottom_box">
        <img
          src="../../assets/people.svg"
          id="people"
        >
        <span
          id="people_text"
          @click="websocketonopen"
        >房间成员：</span>
        <div
          id="attend"
          v-for="(item,index) in attend"
          :key="index"
        >
          <img :src="item.head">
          <span>{{item.name}}</span>
        </div>
        <span
          id="start_btn"
          @click="websocketStart"
          v-show="!startflag&&permission"
        >开始游戏</span>
      </div>
    </div>
    <div class="controlPanel">
      <div class="panel_box">
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
      <div class="chat">
        <span id="tit">聊天信息</span>
        <div id="chat_page">
          <div
            :class="item.username==getCookie('username')?'me':'other'"
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
      </div>
    </div>
  </div>
</template>
<script>
import { fabric } from "fabric";
import html2canvas from "html2canvas";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      currentTool: "",
      done: false,
      fabricObj: null,
      initIdx: 0,
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
      websock: null,
      content: [],
      notice: {},
      attend: [],
      send_content: "",
      input: "",
      startflag: false,
      time: 120,
      timer: {},
      roomId: -1,
      permission: false,
      judge: false,
      timer1: {},
      imgUrl: "",
      permissionFlag: false,
    };
  },
  mounted() {
    //初始化canvas
    this.initCanvas();
    this.fabricObj.freeDrawingBrush.color = this.drawColor;
  },
  created() {
    this.getRoomId();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    re() {
      this.$router.push({ path: "/kehoulist" });
    },
    initCanvas() {
      let _this = this;
      this.fabricObj = new fabric.Canvas("canvas", {
        isDrawingMode: true,
        selectable: false,
        selection: false,
        devicePixelRatio: true, //Retina 高清屏 屏幕支持
      });
      this.fabricObj.freeDrawingBrush.width = 2;
      this.fabricObj.setWidth(1332);
      this.fabricObj.setHeight(672);
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
      this.done = false;
    },
    initWebSocket(num) {
      //初始化weosocket
      const wsuri =
        this.$webSocket +
        "/paint/" +
        this.getCookie("username") +
        "/" +
        this.getCookie("account") +
        "/" +
        num;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket(this.roomId);
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      if (redata.type == "into") {
        for (var i = 0; i < redata.info.roomNumbers.length; i++) {
          var data;
          for (var key in redata.info.roomNumbers[i]) {
            data = key;
          }
          this.attend[i] = {
            name: data,
            head: redata.info.roomNumbers[i][data],
          };
        }
        if (!this.permissionFlag) {
          this.permissionFlag = true;
          this.permission = redata.info.permission;
        }
        if (this.roomId != redata.info.roomId) {
          this.roomId = redata.info.roomId;
          this.initWebSocket(this.roomId);
        }
      } else if (redata.type == "chat") {
        this.content = this.content.concat(redata.info);
        if (this.judge && redata.info.next) {
          clearInterval(this.timer);
          clearInterval(this.timer1);
          this.websocketEnd();
        }
      } else if (redata.type == "start") {
        this.imgUrl = "";
        this.fabricObj.clear();
        this.startflag = true;
        this.judge = redata.info.judge;
        this.notice = redata.info;
        if (this.judge) {
          this.timer1 = setInterval(this.downLoadImage, 1000);
        }
        this.timer = setInterval(() => {
          //设置延迟执行
          this.time--;
          if (this.time == 0) {
            this.time = 120;
            this.websocketEnd();
            clearInterval(this.timer);
          }
        }, 1000);
      } else if (redata.type == "end") {
        this.imgUrl = "";
        this.fabricObj.clear();
        this.time = 120;
        if (redata.info.end) {
          this.startflag = false;
          this.getPoint();
        } else {
          this.judge = redata.info.judge;
          if (this.judge) {
            this.timer1 = setInterval(this.downLoadImage, 1000);
          }else{
            this.timer = setInterval(() => {
              //设置延迟执行
              this.time--;
              if (this.time == 0) {
                this.time = 120;
                this.websocketEnd();
                clearInterval(this.timer);
              }
            }, 1000);
          }
          this.notice = redata.info;
        }
      } else if (redata.type == "direct" && redata.info.type == "pic") {
        this.imgUrl = redata.info.img;
        if (!this.judge) {
          this.fabricObj.clear();
        }
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
        type: "into",
        info: this.getCookie("headUrl"),
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
    websocketEnd() {
      let actions = {
        type: "end",
      };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketStart() {
      let actions = {
        type: "start",
      };
      this.websocketsend(JSON.stringify(actions));
    },
    getRoomId() {
      var that = this;
      axios
        .get(this.$host + "/paint_room")
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            that.roomId = data.info;
            that.initWebSocket(that.roomId);
          } else {
            alert(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPoint() {
      var that = this;
      axios
        .post(this.$host + "/paint_score", {
          account: this.getCookie("account"),
        })
        .then(function (response) {
          var data = response.data;
          if (data.code == 12) {
            alert("您获得的分数为：" + data.info);
          } else {
            alert(data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
  },
  watch: {
    drawColor(newValue, oldValue) {
      this.fabricObj.freeDrawingBrush.color = newValue;
    },
  },
};
</script>

<style scoped>
.wraper {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1900px;
  min-height: 900px;
  text-align: center;
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
.canvas-wraper {
  width: 70%;
  height: 90%;
  float: left;
  margin: 70px 2.5%;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 5px;
  line-height: 150%;
  position: relative;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
  text-align: center;
}
.controlPanel {
  width: 22.5%;
  height: 90%;
  background: rgba(229, 229, 229, 1);
  float: right;
  position: relative;
  text-align: center;
  margin: 70px 2.5% 2.5% 0;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
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
  line-height: 50px;
}
.panel_box {
  width: 82%;
  margin: 5% auto;
  padding: 3%;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  position: relative;
}
.chat {
  width: 82%;
  margin: 5% auto;
  height: 480px;
  padding: 3%;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  font-size: 14px;
  text-align: center;
}
.top_box {
  width: 100%;
  height: 70px;
  opacity: 0.8;
  background-color: rgba(140, 83, 83, 1);
  border-radius: 5px 5px 0 0;
  color: rgba(229, 229, 229, 1);
  font-size: 20px;
  line-height: 70px;
  text-align: left;
  font-weight: bold;
  position: relative;
}
.top_box span {
  display: inline-block;
}
#head {
  width: 40px;
  height: 40px;
  float: left;
  margin: 15px 10px;
}
#nock {
  width: 30px;
  height: 30px;
  float: left;
  margin: 20px 10px;
  float: right;
}
.bottom_box {
  width: 100%;
  height: 67px;
  position: absolute;
  left: 0;
  border-top: 3px solid rgba(140, 83, 83, 1);
  bottom: 0;
}
.wraper {
  background-color: rgba(226, 221, 213, 1);
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
#tit {
  width: 242px;
  height: 37px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  background-color: rgba(157, 110, 108, 1);
  border-radius: 10px;
  line-height: 37px;
  display: block;
  text-align: center;
  margin: 0 auto;
}
#people {
  width: 40px;
  height: 40px;
  float: left;
  margin: 13.5px 10px 13.5px 25px;
}
#people_text {
  height: 67px;
  color: rgba(157, 110, 108, 1);
  font-size: 18px;
  line-height: 67px;
  float: left;
  text-align: left;
  font-weight: bold;
}
#attend {
  height: 67px;
  line-height: 67px;
  color: rgba(157, 110, 108, 1);
  font-size: 15px;
  line-height: 67px;
  float: left;
  text-align: left;
}
#attend img {
  width: 37px;
  height: 37px;
  margin: 15px 10px;
  float: left;
}
#attend span {
  height: 67px;
  line-height: 67px;
  float: left;
}
#chat_page {
  width: 100%;
  height: 380px;
  overflow-y: auto;
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
  top: 40px;
  right: 0;
}
.other #chat_name {
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
.send {
  width: 100%;
  height: 47px;
  position: relative;
}
.send >>> .el-input__inner {
  width: 290px;
  height: 47px;
  position: absolute;
  top: 0;
  left: 7px;
  border-color: rgba(172, 141, 104, 0.5);
}
.send .send_text {
  width: 30px;
  height: 22px;
  position: absolute;
  left: 315px;
  top: 40px;
  color: rgba(157, 110, 108, 1);
  font-size: 15px;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
}
.send img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 310px;
  top: 10px;
  -webkit-transform: rotate(-120deg);
  transform: rotate(-120deg);
  color: rgba(157, 110, 108, 1);
  cursor: pointer;
}
#start_btn {
  width: 88px;
  height: 36px;
  float: right;
  margin: 12px 30px;
  background-color: rgba(157, 110, 108, 1);
  border-radius: 10px;
  font-size: 14px;
  line-height: 37px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  transition: all 3s;
}
#canvasImg {
  width: 1332px;
  height: 672px;
  position: absolute;
  top: 70px;
  left: 0;
}
</style>