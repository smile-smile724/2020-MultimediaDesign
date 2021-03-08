<template>
    <div class="main1">
        <div class="nxj_icon">
            <img src="../assets/nxj_icon2.png" @click='on1=true,on2=false'>
            <img src="../assets/nxj_icon1.png" @click='on2=true,on1=false'>
        </div>
        <img src="../assets/nxj_boat.png" class="nxj_boat">
        <div class="Side_panel">
            <button><img src="../assets/help.svg" style="height:24px;margin:0 5px -3px 0"><span>侧板</span></button>
            <span class="Side_paneltext">{{ Side_panel }}</span>
        </div>
        <div class="boat_botton">
            <button><img src="../assets/help.svg" style="height:24px;margin:0 5px -3px 0"><span>船底</span></button>
            <span class="boat_bottontext">{{ boat_botton }}</span>
        </div>
        <div class="bow">
            <button><img src="../assets/help.svg" style="height:24px;margin:0 5px -3px 0"><span>船头</span></button>
            <span class="bowtext">{{ bow }}</span>
        </div>
        <transition name="fade" mode="out-in">
            <p v-if="on2" @click="on2=false" class="intro2">
                舴艋舟虽小，但造舴艋舟的学问可大，造舴艋舟所用的铁钉有好几种，如有的钉脑呈四方形；
                舴艋舟制造时板与板之间的缝隙，需要桐油蛎灰辅之水竹衣予以填塞，以防漏水；油漆舴艋舟需用生桐油，而不是熟桐油。
                提起舴艋舟，还得说说罩在舴艋舟上用来挡雨防晒的篷，舴艋舟上的篷分三类，前头的小篾篷装卸货物时可掀开，中间的娘篷固定，后面的推篷可随时推开。
            </p>
            <p v-if="on1" @click="on1=false" class="intro1">
                永嘉花鼓是一门古老的曲艺，主要分布于以水秀、岩奇、瀑多、村古、滩林美而民闻遐迩的国家级旅游风景区楠溪江流域。
                一直很受人民群众的喜爱。在长期的演唱实践中，花鼓艺人吸收当地民歌精华，经长期的融合形成自己别具一格的演唱风格。
                永嘉花鼓经漫漫岁月而被传承下来，自然有其自身价值：
                花鼓用永嘉方言演唱，内容丰富，贴近生活，有着人民群众的广泛参与性；花鼓音乐简介明快，唱腔动听，曲调优美，演唱语音生动，具有较高的欣赏价值；
                永嘉花鼓演奏具有很强的地域特色，是我们民间传说与浙南风俗习惯的重要依据。
            </p>
        </transition>
    </div>
</template>

<script>
export default {
    name:'zemengzhou',
    data() {
        return {
                on1:false,
                on2:false,
                Side_panel:"侧面的飘板是杉木、肚板需用杉树、马腿板需用樟树。",
                boat_botton:"底部木料需用松树，松木质地较重适合放在底部，而且松木的材质长时间泡在水里也不会变烂。",
                bow:"前后船梁需用柏木，柏木硬度高，可以有效防止船只在碰撞过程中收到损害。",
        }
    },
}
</script>

<style scoped>
.main1{
    position: absolute;
    left: 900px;
    top: 100px;
}
.nxj_icon{
	width: 120px;
	height: 112px;
    position: absolute;
	left: -1101px;
	top: -20px;
    cursor: pointer;
}
.nxj_boat{
    width: 848px;
    height: 762px;
    position: absolute;
    left: -900px;
    top: -100px;
}
.nxj_icon img{
    position: relative;
    margin-left:-220px;
    margin-top: -70px;
    left: 50px;
}
.jiangxinyu{
    position: relative;
    top: 530px;
    left: 670px;
    cursor: pointer;
    transition: all 0.75s;
}
.Side_panel {
    position: absolute;
    left: -650px;
    top: 300px;
}
.bow{
    position: absolute;
    left: -270px;
    top: 100px;
}
.boat_botton{
    position: absolute;
    left: -450px;
    top: 350px;
}
.Side_panel .Side_paneltext {
    visibility: hidden;
    width: 332px;
    height: 116px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 50px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: -355px;
    top: -50px;
}
.bow .bowtext {
    visibility: hidden;
    width: 332px;
    height: 116px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 20px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: 150px;
    top: -40px;
}
.boat_botton .boat_bottontext {
    visibility: hidden;
    width: 332px;
    height: 116px;
    color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
    text-align: left;
    border-radius: 16px;
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    padding-top: 20px;
    text-indent: 2em;
    opacity: 0;
    transition: opacity 2s;
    position: absolute;
    z-index: 1;
    left: -100px;
    top: 80px;
}

.Side_panel:hover .Side_paneltext{
    visibility: visible;
    opacity: 0.8;
}
.bow:hover .bowtext {
    visibility: visible;
    opacity: 0.8;
}
.boat_botton:hover .boat_bottontext{
    visibility: visible;
    opacity: 0.8;
}
.Side_panel button{
	width: 115px;
	height: 60px;
	left: 1142px;
	top: 467px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 15px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
    border: none;
    outline: none;
}
.bow button{
	width: 115px;
	height: 60px;
	left: 1142px;
	top: 467px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 15px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
    border: none;
    outline: none;
}
.boat_botton button{
	width: 115px;
	height: 60px;
	left: 1142px;
	top: 467px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(130, 77, 82, 1);
	border-radius: 15px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
    border: none;
    outline: none;
}
.Side_panel span{
	width: 50px;
	height: 37px;
	left: 817px;
	top: 716px;
	color: rgba(255, 255, 255, 1);
	font-size: 25px;
	line-height: 150%;
	text-align: left;
}
.bow span{
	width: 50px;
	height: 37px;
	left: 817px;
	top: 716px;
	color: rgba(255, 255, 255, 1);
	font-size: 25px;
	line-height: 150%;
	text-align: left;
}
.boat_botton span{
	width: 50px;
	height: 37px;
	left: 817px;
	top: 716px;
	color: rgba(255, 255, 255, 1);
	font-size: 25px;
	line-height: 150%;
	text-align: left;
}
.fade-enter-active, .fade-leave-active {
    transition:  1.5s ease;
    /* transform: translateX(0); */
    transform: translateX(-31px);
}
.fade-enter, .fade-leave-to {
    opacity: 0;
    /* transform: translateX(50px); */
    transform: translateX(31px);
}
.intro2{
	width: 400px;
	height: 500px;
    position: absolute;
	left: -1200px;
	top: 20px;
	color: rgba(80, 80, 80, 1);
	font-size: 25px;
	line-height: 170%;
	text-align: left;
    cursor: pointer;
    background: white;
    border-radius: 16px;
    padding: 30px 30px 0 30px;
}
.intro1{
	width: 600px;
	height: 500px;
    position: absolute;
	left: -1200px;
	top: 20px;
	color: rgba(80, 80, 80, 1);
	font-size: 25px;
	line-height: 170%;
	text-align: left;
    cursor: pointer;
    background: white;
    border-radius: 16px;
    padding: 30px 30px 0 30px;
}
</style>