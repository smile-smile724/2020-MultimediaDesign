<template>
  <div class="main1">
    <video
      src="../assets/temple_guide.mp4"
      style="position: absolute"
      @click="temple_guide()"
      id="temple_guide"
    ></video>
    <video
      src="../assets/left.mp4"
      style="position: absolute"
      id="left_audio"
    ></video>
    <video
      src="../assets/right.mp4"
      style="position: absolute"
      id="right_audio"
    ></video>
    <img src="../assets/temple1.png" class="temple" />
    <img
      src="../assets/speaker.svg"
      class="speaker"
      @click="left_audioPlay()"
    />
    <img
      src="../assets/speaker.svg"
      class="speaker"
      @click="right_audioPlay()"
    />
    <div class="couplet">
      <img src="../assets/lcouplet.png" />
      <img src="../assets/rcouplet.png" style="margin-left: -340px" />
    </div>
    <div
      class="group"
      :class="{
        'left-top-container': gindex === 0,
        'right-top-container': gindex === 1,
        'bottom-container': gindex === 2,
        'top-container': gindex < 2,
      }"
      v-for="(group, gindex) in data"
      :key="gindex"
    >
      <div
        class="cls-default"
        v-for="(item, cindex) in group.children"
        :key="cindex"
        :data_id="gindex + '-' + cindex"
        draggable="true"
        @dragstart="onDragstart($event)"
        @dragend="onDragend($event)"
        @dragover="onDragover($event)"
        @drop="onDrop($event)"
      >
        <div
          class="content"
          :class="
            (gindex != 2 && item.id == answer[gindex][cindex]) || gindex == 2
              ? ' correct '
              : 'error'
          "
        >
          {{ item.color ? item.color : "" }}
        </div>
      </div>
    </div>
    <div class="mask" v-show="close" @click="close = false"></div>
    <div class="guide" v-show="close">
      <ul>
        <li><img src="../assets/guidehead.png" /></li>
        <li>
          <img src="../assets/guidehead2.png" style="margin-left: 1200px" />
        </li>
        <li><img src="../assets/guidehead.png" /></li>
        <li>
          <img src="../assets/guidehead2.png" style="margin-left: 1200px" />
        </li>
        <li><img src="../assets/guidehead.png" /></li>
        <li><img src="../assets/guidehead.png" /></li>
      </ul>
      <ul>
        <li><p>江心寺是江心屿上著名的古寺</p></li>
        <li>
          <p style="margin-left: -60px; width: 700px">
            要说这寺庙里最有趣的还是那门口王十朋的那副对联
          </p>
        </li>
        <li><p>这副对联有很多种读音</p></li>
        <li><p style="margin-left: 230px">其实更被人理解的读音有两种</p></li>
        <li><p>你觉得读音是怎样的呢</p></li>
        <li><p>拖动拼音到你认为正确的框内</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "temple",
  data() {
    return {
      close: true,
      stargindex: "",
      endIndex: "",
      answer: [
        [0, 2, 0, 0, 2, 0, 2, 0],
        [1, 3, 1, 1, 3, 1, 3, 1],
      ],
      checkFlag: false,
      data: [
        {
          group: "left-show",
          children: [{}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          group: "right-show",
          children: [{}, {}, {}, {}, {}, {}, {}, {}],
        },
        {
          group: "source",
          title: "视频资源区",
          children: [
            {
              id: 0,
              color: "cháng",
            },
            {
              id: 1,
              color: "zhāo",
            },
            {
              id: 2,
              color: "zhǎng",
            },
            {
              id: 3,
              color: "cháo",
            },
          ],
        },
      ],
      leftaudio:'',
      rightaudio:'',
      guideaudio:''
    };
  },
  methods: {
    left_audioPlay() {
      this.rightaudio.pause()
      this.guideaudio.pause()
      if (this.leftaudio.paused) {
        this.leftaudio.play();
      } else if (this.leftaudio.play) {
        this.leftaudio.pause();
      }
    },
    right_audioPlay() {
      this.leftaudio.pause()
      this.guideaudio.pause()
      if (this.rightaudio.paused) {
        this.rightaudio.play();
      } else if (this.audio.play) {
        this.rightaudio.pause();
      }
    },
    onDragstart(event) {
      this.stargindex = event.target.getAttribute("data_id");
    },
    onDragend(event) {
      let startGroupIndex = this.stargindex.split("-")[0];
      let startChildIndex = this.stargindex.split("-")[1];
      let endGroupIndex = this.endIndex.split("-")[0];
      let endChildIndex = this.endIndex.split("-")[1];
      let endObj = this.data[endGroupIndex].children[endChildIndex];
      let startObj = this.data[startGroupIndex].children[startChildIndex];
      if (this.data[endGroupIndex].group === "source") {
        //往资源区拖拽时  不做任何替换操作
        return;
      }
      this.data[endGroupIndex].children.splice(endChildIndex, 1, startObj);
      if (this.data[startGroupIndex].group !== "source") {
        //拖拽起始区域不是 source时  把起始区域替换成拖拽后区域的数据
        this.data[startGroupIndex].children.splice(startChildIndex, 1, endObj);
      }
    },
    onDrop(event) {
      if (event.target.className.indexOf("cls-default") > -1) {
        this.endIndex = event.target.getAttribute("data_id");
        let startGroupIndex = this.stargindex.split("-")[0];
        let startChildIndex = this.stargindex.split("-")[1];
        let endGroupIndex = this.endIndex.split("-")[0];
        let endChildIndex = this.endIndex.split("-")[1];
      } else {
        this.endIndex = event.target.parentElement.getAttribute("data_id");
      }
    },
    onDragover(event) {
      event.preventDefault();
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.leftaudio = document.querySelector("#left_audio");
      this.guideaudio = document.querySelector("#temple_guide");
      this.rightaudio = document.querySelector("#right_audio");
    });
  },
};
</script>

<style scoped>
.main1 {
  position: absolute;
  left: 868px;
  top: 80px;
}
.temple {
  width: 1500px;
  height: 700px;
  position: absolute;
  left: -1147px;
  top: -50px;
}
.couplet img {
  width: 100px;
  height: 419px;
  position: absolute;
  left: -279px;
  top: 150px;
}
.group {
  float: left;
  overflow: hidden;
  box-sizing: border-box;
}
.group-title {
  height: 40px;
  line-height: 40px;
}
.cls-default {
  float: left;
  margin: 0 0 4.7px 0;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #999;
}
.cls-default .content {
  text-align: center;
  font-size: 28px !important;
  margin: 7px 0 0 0;
}
.top-container {
  width: 80px;
  position: relative;
  left: -699px;
  top: 160px;
}
.left-top-container {
  margin: 0 0 20px 3px;
}
.right-top-container {
  margin: -335px 0px 0px 520px;
}
.top-container .cls-default {
  width: 80px;
  height: 35px;
  margin-top: 0px;
  background-color: rgb(255, 255, 255);
  border: none;
}
.bottom-container {
  width: 386px;
  height: 244px;
  color: rgba(140, 83, 83, 1);
  font-weight: bold;
  line-height: 100%;
  background: url("../assets/personalbg.png");
  background-size: 100%;
  position: relative;
  left: -1217px;
  top: -450px;
}
.bottom-container .cls-default {
  width: 85px;
  height: 38px;
  margin: 60px 0 0 70px;
  border: none;
  font-size: 18px;
}
.correct {
  color: black;
  font-size: 10px !important;
}
.error {
  color: red;
  font-size: 10px !important;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(229, 229, 229, 0.41);
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.guide {
  width: 966px;
  height: 756px;
  position: fixed;
  top: 91px;
  left: 24%;
  background: rgba(226, 221, 213, 1);
  border-radius: 20px;
  border: rgb(130, 77, 82) solid 1px;
  z-index: 10;
}
.guide ul {
  list-style: none;
}
.guide ul li img {
  width: 89px;
  height: 89px;
  position: relative;
  left: -400px;
  top: 40px;
  border-radius: 45px;
  margin-top: 10px;
}
.guide ul li p {
  width: 409px;
  height: 58px;
  position: relative;
  left: 138px;
  top: -607px;
  color: rgba(130, 77, 82, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 14px;
  font-size: 27px;
  line-height: 200%;
  text-align: center;
  margin-top: 48px;
}
.guide ul li p img {
  position: absolute;
  left: 10px;
  margin-top: -15px;
  cursor: pointer;
}
.speaker {
  width: 35px;
  height: 35px;
  position: relative;
  left: 120px;
  top: 600px;
  font-size: 35px;
  color: rgba(153, 153, 153, 1);
  cursor: pointer;
}
</style>