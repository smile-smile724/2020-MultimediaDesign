<template>
    <div class="sns_box">
        <div class="picture">
            <img src="../assets/personalbg.png" class="snsbox">
            <img src="../assets/snsgif.gif" class="snsgif">
            <div class="mask"></div>
            <span>
                    《过始宁墅》<br>
                        谢灵运<br>
        束发怀耿介，逐物遂推迁。违志似如昨，二纪及兹年。<br>
        缁磷谢清旷，疲荥惭贞坚。拙疾相倚薄，还得静者便。<br>
        剖竹守沧海，枉帆过旧山。山行穷登顿，水涉尽洄沿。<br>
        岩峭岭稠叠，洲萦渚连绵。白云抱幽石，绿筱媚清涟。<br>
        葺宇临回江，筑观基曾巅。挥手告乡曲，三载期旋归，<br>
                且为树枌槚，无令孤愿言。<br>
            </span>
        </div>
        <div class="notes">
            <p>注释</p>
            <span>
                1.缁(zī)磷:语出《论语·阳货》:"不日坚乎，磨而不磷;不日白乎，涅而淄。"缁，黑色。磷，薄。此喻意志不坚贞。<br>
                2.疲荥(xíng):非常困倦的样子。语出《庄子·齐物论》:"荥然疲役而不知其所归。"<br>
                3.相倚薄:相互依附。<br>
                4.静者:化用《老子》"归根日静，是谓复命"之意，说明得便归故园。<br>
                5.剖竹:古代以竹为符信，剖而为二，命官时分一半与之，一半留中央。故剖竹为委任官职的意思。<br>
                6.守沧海:谢灵运被任为永嘉太守，永嘉郡临海，故曰守沧海。<br>
                7.枉帆:弯一下帆船的航线，即绕点路之意。旧山:犹故居，指始宁墅。
                8.登顿:指上山下山。<br>
                9.洄(huí)沿:逆流而上日洄，顺流而下日沿。<br>
                10.筱(xiǎo):细竹。涟:风吹起的细微波纹。<br>
                11.葺(qì):修治。<br>
                12."三载"句:古代地方官大都以三年为~任，所以说隔三年以后回来。<br>
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
.sns_box{
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
	top: 131px;
    z-index: 3;
	opacity: 0.8;
	color: rgba(130, 77, 82, 1);
	font-size: 35px;
	line-height: 150%;
	text-align: center;
	font-weight: bold;
}
.snsbox{
    width: 1163px;
    height: 120%;

}
.snsgif{
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