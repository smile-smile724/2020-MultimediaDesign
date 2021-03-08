<template>
    <div class="fcj_box">
        <div class="picture">
            <img src="../assets/personalbg.png" class="fcjbox">
            <img src="../assets/fcjgif.gif" class="fcjgif">
            <div class="mask"></div>
            <span>
                            《富春渚》<br>
                                谢灵运<br>
                宵济渔浦潭，旦及富春郭。定山缅云雾，赤亭无淹薄。<br>
                溯流触惊急，临圻阻参错。亮乏伯昏分，险过吕梁壑。<br>
                洊至宜便习，兼山贵止托。平生协幽期，沦踬困微弱。<br>
                久露干禄请，始果远游诺。宿心渐申写，万事俱零落。<br>
                            怀抱既昭旷，外物徒龙蠖。<br>
            </span>
        </div>
        <div class="notes">
            <p>注释</p>
            <span>
                1.宵：晚上。济：渡。渔浦：富春东三十里，其对岸即钱塘之六和塔。<br>
                2.旦及：早晨到达。郭：富春县城郭。<br>
                3.定山：亦名狮子山。缅，远。<br>
                4.赤亭：在定山东十余里。淹薄：停留。<br>
                5.圻（qí）：指曲折的崖岸。参错：参差交错，形容崖岸之奇险。<br>
                6.亮：坚贞。伯昏：即伯昏无人，春秋时郑国人。<br>
                7.吕梁：山名。<br>
                8.洊（jiàn）至：再至，相继而至。<br>
                9.沦：陷。踬（zhì）：跌倒，此指挫折。微弱：意志不坚强。<br>
                10.久露：久遇。干禄（lù）：求禄做官。<br>
                11.远游：枉道新安，故称远游。诺（nuò）：答应。<br>
                12.宿心：即宿愿，指隐居。申写：舒展。尘世的一切俗事从此完全抛却。<br>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'snspoem'
}
</script>

<style scoped>
.fcj_box{
    /* background: black; */
    height: 100%;
    width: 100%;
    position: absolute;
}
.picture{
    position: absolute;
    left: -300px;
}
.picture span{
	width: 844px;
	height: 574px;
    position: absolute;
	left: 159px;
	top: 151px;
    z-index: 3;
	opacity: 0.8;
	color: rgba(130, 77, 82, 1);
	font-size: 35px;
	line-height: 150%;
	text-align: center;
	font-weight: bold;
}
.fcjbox{
    width: 1163px;
    height: 120%;

}
.fcjgif{
    width: 1048px;
    height: 589px;
    position: absolute;
    left: 64px;
    top: 74px;
    z-index: 1;
    border-radius: 30px;
}
.mask{
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
.notes{
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
.notes p{
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
.notes span{
    width: 436px;
    height: 287px;
    text-align: left;
    float: left;
    margin-left: 12px;
    font-size: 20px;
}
</style>