<template>
  <div class="xh_box">
    <div class="picture">
      <img src="../assets/personalbg.png" class="xhbox" />
      <img src="../assets/xhgif.gif" class="xhgif" />
      <div class="mask"></div>
      <span>
        《送友人寻越中山水》<br />
        李白<br />
        闻道稽山去，偏宜谢客才。<br />
        千岩泉洒落，万壑树萦回。<br />
        东海横秦望，西陵绕越台。<br />
        湖清霜镜晓，涛白雪山来。<br />
        八月枚乘笔，三吴张翰杯。<br />
        此中多逸兴，早晚向天台。<br />
      </span>
    </div>
    <div class="notes">
      <p>注释</p>
      <span>
        1.偏宜：最宜，特别合适。谢客：即谢灵运，乳名客儿，故称。南朝梁钟嵘《诗品》总论：“谢客为元嘉之雄。”此处借指友人。<br>
        2.西陵：春秋越国范蠡所筑固陵城遗址。<br>
        3.张翰杯：西晋名士张翰，字季鹰，纵酒任诞，时人号为“江东步兵”，自言“使我有身后名，不如即时一杯酒”（《世说新语·任诞》）。另《世说新语·识鉴》：“张季鹰辟齐王东曹掾，在洛，见秋风起，因思吴中菰菜、莼羹、鲈鱼脍，曰：‘人生贵得适意尔，何能羁宦数千里以要名爵？’遂命驾便归。”<br>
        4.逸兴：超逸豪放的意兴。《艺文类聚》卷一引晋湛方生《风赋》：“轩濠梁之逸兴，畅方外之冥适。”<br>
        5.早晚：何日，几时。<br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "xhpoem",
};
</script>

<style scoped>
.xh_box {
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
  width: 844px;
  height: 574px;
  position: absolute;
  left: 159px;
  top: 181px;
  z-index: 3;
  opacity: 0.8;
  color: rgba(130, 77, 82, 1);
  font-size: 35px;
  line-height: 150%;
  text-align: center;
  font-weight: bold;
}
.xhbox {
  width: 1163px;
  height: 120%;
}
.xhgif {
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
</style>