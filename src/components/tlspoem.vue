<template>
    <div class="tls_box">
        <div class="picture">
            <img src="../assets/personalbg.png" class="tlsbox">
            <img src="../assets/tlsgif.gif" class="tlsgif">
            <div class="mask"></div>
            <span>
                《梦游天姥吟留别》<br>
                李白<br>
                海客谈瀛洲，烟涛微茫信难求；越人语天姥，云霞明灭或可睹。
                天姥连天向天横，势拔五岳掩赤城。天台四万八千丈，对此欲倒东南倾。
                我欲因之梦吴越，一夜飞度镜湖月。湖月照我影，送我至剡溪。
                谢公宿处今尚在，渌水荡漾清猿啼。脚著谢公屐，身登青云梯。
                半壁见海日，空中闻天鸡。
            </span>
        </div>
        <div class="notes">
            <p>注释</p>
            <span>
                1.”势拔“句：山势高过五岳，遮掩了赤城。拔，超出。五岳，指东岳泰山、西岳华（huà）山、中岳嵩山、北岳恒山、南岳衡山。赤城，和下文的“天台（tāi）”都是山名，在今浙江天台北部。<br>
                2.”对此“句：对着天姥这座山，天台山就好像要倒向它的东南一样。意思是天台山和天姥山相比，显得低多了<br>
                3.天鸡：古代传说，东南有桃都山，山上有棵大树叫桃都，树枝绵延三千里，树上栖有天鸡，每当太阳初升，照到这棵树上，天鸡就叫起来，天下的鸡也都跟着它叫。<br>
                4.”迷花“句：迷恋着花，依靠着石，不觉天色已经很晚了。暝（míng），日落，天黑。<br>
                5.”熊咆“句：熊在怒吼，龙在长鸣，岩中的泉水在震响。“殷岩泉”即“岩泉殷”。殷，这里用作动词，震响。<br>
                6.”栗深林“句：使深林战栗，使层巅震惊。栗、惊，使动用法。<br>
                7.失向来之烟霞：刚才梦中所见的烟雾云霞消失了。向来，原来。烟霞，指前面所写的仙境。<br>
                8.”且放“二句：暂且把白鹿放在青青的山崖间，等到要行走的时候就骑上它去访问名山。白鹿，传说神仙或隐士多骑白鹿。须，等待。<br>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'tlspoem'
}
</script>

<style scoped>
.tls_box{
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
	width: 900px;
	height: 520px;
    position: absolute;
	left: 159px;
	top: 111px;
    z-index: 3;
	color: rgba(130, 77, 82, 1);
	font-size: 40px;
	line-height: 150%;
	text-align: center;
	font-weight: bold;
}
.tlsbox{
    width: 1163px;
    height: 120%;

}
.tlsgif{
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