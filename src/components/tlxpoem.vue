<template>
  <div class="tlx_box">
    <div class="picture">
      <img src="../assets/personalbg.png" class="tlxbox" />
      <img src="../assets/tlxgif.gif" class="tlxgif" />
      <div class="mask"></div>
      <span>
        《七里濑》<br />
        谢灵运<br />
        羁心积秋晨，晨积展游眺。孤客伤逝湍，徒旅苦奔峭。<br />
        石浅水潺湲，日落山照曜。荒林纷沃若，哀禽相叫啸。<br />
        遭物悼迁斥，存期得要妙。既秉上皇心，岂屑末代诮。<br />
        目睹严子濑，想属任公钓。谁谓古今殊，异代可同调。<br />
      </span>
    </div>
    <div class="notes">
      <p>注释</p>
      <span>
        1.七里濑（lài）：亦名七里滩，在今浙江桐庐县严陵山迤西。两岸高山耸立，水急驶如箭。旧时有谚云：“有风七里，无风七十里。”指舟行急湍中进度极难掌握，惟视风之大小来决定迟速。濑，沙石上流过的急水。<br>
        2.逝湍（tuān）：急流不停的江水。湍，急流。徒旅：游客。孤客、徒旅皆诗人自指。奔峭：崩落断裂的陡峭江岸。<br>
        3.遭物：看到客观景物，即面对着流水、日光、荒林和哀禽。悼：感伤。迁斥：被贬谪、斥逐。<br>
        4.存期：期望，想要。存，想。要妙：精微玄妙的道理，这里指老庄的哲理。<br>
        5.秉：掌握，把持。上皇心：上古时代人们淳朴的思想感情。上皇，即羲皇，伏羲氏，历史传说中的上古时帝王。岂屑（xiè）：哪顾，不管。末代：衰乱之世，这里指诗人所处的社会。诮（qiào）：责备，讥诮。<br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tlxpoem",
};
</script>

<style scoped>
.tlx_box {
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
.tlxbox {
  width: 1163px;
  height: 120%;
}
.tlxgif {
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