<template>
  <div class="nxj_box">
    <div class="picture">
      <img src="../assets/personalbg.png" class="nxjbox" />
      <img src="../assets/nxjgif.gif" class="nxjgif" />
      <img src="../assets/play.svg" class="Play" @click="audioPlay" />
      <video
        src="../assets/nxjpoem.mp4"
        id="nxj_video"
        style="position: absolute; z-index: -1"
      ></video>
      <img src="../assets/video.png" class="video" @click="gameShow = true" />
      <div class="mask"></div>
      <div class="maskbox" v-if="gameShow" @click="gameShow = false"></div>
      <div class="maskbox-bg" v-if="gameShow">
        <div id="maskBox_main">
          <img src="../assets/pt_game/maskbox.png" id="mask_bg" />
          <div id="main_mask">
            <span id="mask_tip">根据诗的意境，完成拼图</span>
            <span id="mask_text">
              《石室山》<br />
              谢灵运<br />
              清旦索幽异，放舟越垌郊。<br />
              莓莓兰渚急，藐藐苔岭高。<br />
              石室冠林陬，飞泉发山椒。<br />
              虚泛径千载，峥嵘非一朝。<br />
            </span>
            <img src="../assets/pt_game/look_pic.png" id="look_pic" />
            <img src="../assets/pt_game/shiShiShan.png" id="pic_copy" />
            <iframe
              class="Iframe"
              id="my-iframe"
              :src="$fileUrl + '/pt_game/index.html'"
              target=""
              scrolling="no"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="poem">
        <span @mouseover="mouseover1" @mouseleave="mouseleave1" id="note_word">《石室山》<sup id="sup_num" style="margin-left:-20px">①</sup></span
        ><br />
        <span>谢灵运</span><br />
        <span>清旦</span
        ><span @mousemove="mouseover2" @mouseleave="mouseleave2" id="note_word">索幽异<sup id="sup_num">②</sup></span
        ><span>，</span><span>放舟越</span
        ><span @mousemove="mouseover3" @mouseleave="mouseleave3" id="note_word">垌<sup id="sup_num">③</sup></span>
        <span>郊。</span><br /><span
          @mousemove="mouseover4"
          @mouseleave="mouseleave4"
           id="note_word"
          >莓莓<sup id="sup_num">④</sup></span
        ><span @mousemove="mouseover5" @mouseleave="mouseleave5" id="note_word">兰渚<sup id="sup_num">⑤</sup></span
        ><span @mousemove="mouseover6" @mouseleave="mouseleave6" id="note_word">急<sup id="sup_num">⑥</sup></span
        ><span>，</span
        ><span @mousemove="mouseover7" @mouseleave="mouseleave7" id="note_word">藐藐<sup id="sup_num">⑦</sup></span
        ><span @mousemove="mouseover8" @mouseleave="mouseleave8" id="note_word">苔岭<sup id="sup_num">⑧</sup></span
        ><span>高。</span><br />
        <span>石室冠林陬，飞泉发山椒。</span><br>
        <span>虚泛径千载，峥嵘非一朝。</span>
      </div>
    </div>
    <div class="notes">
      <p>注释</p>
      <span v-show="show1">1.石室山：谢灵运生活过的永嘉和始宁都有石室山，黄节以为始宁之石室，而顾绍柏考证为永嘉郡郊外楠溪江畔的石室山，又名大箬岩。</span><br />
      <span v-show="show2">2.索幽异：探寻隐蔽特异的景点。</span><br />
      <span v-show="show3">3.垌（dòng）郊：泛指郊野。</span><br />
      <span v-show="show4">4.莓莓：水草茂盛。</span><br />
      <span v-show="show5">5.兰渚（zhǔ）：生有兰惠等香草的河洲。左思《魏都赋》有“兰渚莓莓”语，或即此句所本。</span><br />
      <span v-show="show6">6.急：既指水流湍急，也指舟行急速。</span><br />
      <span v-show="show7">7.藐藐（miǎo）：通“邈邈”，遥远的样子。</span><br />
      <span v-show="show8">8.苔岭：但见一片青翠，好像是覆盖苔衣的山岭。</span><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "nxjpoem",
  data() {
    return {
      gameShow: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
    };
  },
  methods: {
    audioPlay() {
      this.audio = document.querySelector("#nxj_video");
      if (this.audio.paused) {
        this.audio.play();
      } else if (this.audio.play()) {
        this.audio.pause();
      }
    },
    mouseover1() {
      this.show1 = true;
    },
    mouseleave1() {
      this.show1 = false;
    },
    mouseover2() {
      this.show2 = true;
    },
    mouseleave2() {
      this.show2 = false;
    },
    mouseover3() {
      this.show3 = true;
    },
    mouseleave3() {
      this.show3 = false;
    },
    mouseover4() {
      this.show4 = true;
    },
    mouseleave4() {
      this.show4 = false;
    },
    mouseover5() {
      this.show5 = true;
    },
    mouseleave5() {
      this.show5 = false;
    },
    mouseover6() {
      this.show6 = true;
    },
    mouseleave6() {
      this.show6 = false;
    },
    mouseover7() {
      this.show7 = true;
    },
    mouseleave7() {
      this.show7 = false;
    },
    mouseover8() {
      this.show8 = true;
    },
    mouseleave8() {
      this.show8 = false;
    },
  },
};
</script>

<style scoped>
.picture .poem span {
  position: relative;
  top: -50px;
  left: 0px;
}
.poem{
  position: relative;
  top: -500px;
}
.nxj_box {
  /* background: black; */
  height: 100%;
  width: 100%;
  position: absolute;
}
.picture {
  position: absolute;
  left: -300px;
  height: 600px;
}
.picture span,
#mask_text {
  width: 698px;
  height: 374px;
  position: absolute;
  left: 239px;
  top: 193px;
  z-index: 3;
  opacity: 0.8;
  color: rgba(130, 77, 82, 1);
  font-size: 35px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
.nxjbox {
  width: 1163px;
  height: 120%;
}
.nxjgif {
  width: 1048px;
  height: 589px;
  position: absolute;
  left: 64px;
  top: 74px;
  z-index: 1;
  border-radius: 30px;
}
.mask {
  width: 1048px;
  height: 589px;
  position: absolute;
  left: 64px;
  top: 74px;
  opacity: 0.68;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  text-align: center;
  z-index: 2;
}
.notes {
  width: 460px;
  height: 592px;
  position: absolute;
  top: 100px;
  left: 900px;
  color: rgba(80, 80, 80, 1);
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.notes p {
  width: 242px;
  height: 37px;
  position: relative;
  margin-top: 0;
  left: 109px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(157, 110, 108, 1);
  border-radius: 10px;
  font-size: 18px;
  line-height: 200%;
  text-align: center;
}
.notes span {
  width: 436px;
  height: 287px;
  text-align: left;
  float: left;
  font-size: 20px;
  line-height: 150%;
  position: absolute;
  top: 50px;
  left: 0;
  margin-left: 10px;
}
.video {
  position: absolute;
  left: 1000px;
  top: 545px;
  z-index: 3;
}
.Play {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 1030px;
  top: 100px;
  z-index: 3;
  cursor: pointer;
}
.maskbox {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255, 0.3);
}
#maskBox_main {
  position: absolute;
  top: -100px;
  left: 100px;
  z-index: 4;
  width: 1500px;
  height: 834px;
}
#mask_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
#main_mask {
  width: 100%;
  height: 100%;
}
#my-iframe {
  width: 702px;
  height: 702px;
  position: absolute;
  top: 65px;
  z-index: 99;
  right: 170px;
}
#pic_copy {
  width: 300px;
  height: 300px;
  position: absolute;
  right: -150px;
  bottom: 110px;
  z-index: 100;
  padding: 10px;
  background-color: rgb(12, 12, 12);
  display: none;
}
#mask_text {
  position: absolute;
  left: 0px;
  top: 300px;
  font-size: 30px;
}
#look_pic {
  width: 56px;
  height: 58px;
  bottom: 50px;
  right: 80px;
  position: absolute;
}
#look_pic:hover + #pic_copy {
  display: block;
}
#mask_tip {
  width: 400px;
  height: 100px;
  position: absolute;
  left: 135px;
  top: 100px;
  line-height: 100px;
  display: block;
  font-size: 25px;
  background-color: rgba(157, 110, 108, 1);
  border-radius: 20px;
  opacity: 0.8;
  color: white;
}
#note_word{
  cursor: pointer;
}
#sup_num{
  font-size: 20px;
  margin: auto;
  position: relative;
  top: -12px;
}
</style>