<template>
  <div class="yds_box">
    <div class="picture">
      <img src="../assets/personalbg.png" class="ydsbox" />
      <img src="../assets/ydsgif.gif" class="ydsgif" />
      <img src="../assets/play.svg" class="Play" @click="yds" />
      <video
        src="../assets/ydspoem.mp4"
        id="yds_video"
        style="position: absolute; z-index: -1"
      ></video>
      <a
        href="http://cmp.wzyds.com/360tyy/index.jhtml"
        target="_blank"
        class="video"
        ><img src="../assets/video.png"
      /></a>
      <div class="mask"></div>
      <span>
        《从斤竹涧越岭溪行》<br />
        谢灵运<br />
        猿鸣诚知曙，谷幽光未显。岩下云方合，花上露犹泫。<br />
        逶迤傍隈隩，迢递陟陉岘。过涧既厉急，登栈亦陵缅。<br />
        川渚屡径复，乘流玩回转。苹萍泛沉深，菰蒲冒清浅。<br />
        <!-- 企石挹飞泉，攀林摘叶卷。想见山阿人，薜萝若在眼。<br>
        握兰勤徒结，折麻心莫展。情用赏为美，事昧竟谁辨？<br>
                    观此遗物虑，一悟得所遣。<br> -->
      </span>
    </div>
    <div class="notes">
      <p>注释</p>
      <span>
        1.谷幽：山谷深邃而阴暗。<br />
        2.泫：水珠欲滴的样子。<br />
        3.隈隩（wēi yù）：山崖转弯的地方。<br />
        4.迢递（tiáo dì）：遥远的样子。<br />
        5.陉岘（xíng xiàn）：山脉中断处叫陉，不太高的山岭叫岘。<br />
        6.厉急：渡过急流。厉，“濿”之省文，穿着衣服涉水。<br />
        7.陵缅（miǎn）：凌空面对着高深的山谷。<br />
        8.苹（pín）萍：都是水草，浮生水面。苹大萍小。<br />
        9.菰（gū）：即茭白。是生长在浅水中的植物。<br />
        10.企：同“跂”，举踵。<br />
        11.山阿人：指诗人所仰慕的高人隐士。<br />
        12.勤：企望。<br />
        13.麻：疏麻，又叫神麻，一种香草。出于《九歌·大司命》：“折疏麻兮瑶华，将以遗兮离居。”
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ydpoem",
  methods:{
    yds() {
      this.audio = document.querySelector("#yds_video");
      if (this.audio.paused) {
        this.audio.play();
      } else if (this.audio.play()) {
        this.audio.pause();
      }
    },
  }
};
</script>

<style scoped>
.yds_box {
  /* background: black; */
  height: 100%;
  width: 100%;
  position: absolute;
}
.picture {
  position: absolute;
  left: -300px;
}
.picture span {
  width: 882px;
  height: 331px;
  position: absolute;
  left: 140px;
  top: 209px;
  z-index: 3;
  color: rgba(130, 77, 82, 1);
  font-size: 36px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
.ydsbox {
  width: 1163px;
  height: 120%;
}
.ydsgif {
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
  margin-left: 12px;
  font-size: 20px;
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
</style>