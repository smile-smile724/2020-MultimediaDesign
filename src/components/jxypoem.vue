<template>
    <div class="jxy_box">
        <div class="picture">
            <img src="../assets/personalbg.png" class="jxybox">
            <img src="../assets/jxygif.gif" class="jxygif">
            <a href="http://www.taagoo.com/com/case/wz_jxy/index.html"  target="_blank" class="video"><img src="../assets/video.png"></a>
            <div class="mask"></div>
            <span>
                登江中孤屿<br>
                    谢灵运<br>
            江南倦历览，江北旷周旋。<br>
            怀新道转迥，寻异景不延。<br>
            乱流趋孤屿，孤屿媚中川。<br>
            云日相晖映，空水共澄鲜。<br>
            表灵物莫赏，蕴真谁为传。<br>
            想象昆山姿，缅邈区中缘。<br>
            始信安期术，得尽养生年。<br>
            </span>
        </div>

        <div class="notes">
            <p>注释</p>
            <span>
                1.江中：指永嘉江，在浙江东南境，又称瓯江、温江、蜃江、永宁江。孤屿，即孤屿山，在今温州市附近永嘉江中。<br>
                2.旷周旋：久不游览。旷，荒废，耽搁。周旋，应酬，打交道，这里指前去游赏。<br>
                3.迥：迂回。<br>
                5.媚：优美悦人。中川：江水中间。<br>
                4.表灵：指孤屿山极其神奇的景象。表，明显。  <br>
                6.灵，灵秀、神奇。物：指世人。<br>
                7.蕴真：蕴藏的仙人。真，真人、神仙。<br>
                8.昆山姿：指神仙的姿容。昆山，昆仑山的简称，是古代传说中西王母的住处。<br>
                9.缅（miǎn）邈（miǎo）：悠远。区中缘：人世间的相互关系。<br>
                10.安期术：安期生的长生之术。安期，即安期生，古代传说中的神仙，传说他是琅琊阜乡人，因得长生不老之术而活过了一千岁。
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'jxypoem'
}
</script>

<style scoped>
.jxy_box{
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
	width: 882px;
	height: 486px;
    position: absolute;
	left: 140px;
	top: 117px;
    z-index: 3;
	color: rgba(130, 77, 82, 1);
	font-size: 36px;
	line-height: 150%;
	text-align: center;
	font-weight: bold;
}
.jxybox{
    width: 1163px;
    height: 120%;
}
.jxygif{
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
.video{
    position: absolute;
    left: 1000px;
    top: 545px;
    z-index: 3;
}
</style>