<template>
    <div>
        <video src="../assets/lyfd.mp4" class="video" controls width="870" height="613" id="lingyan"></video>
        <span class="note">
			灵岩飞渡表演于1916年，最早起源于农民上山采草药，在南北朝开山造陆之前，农民为了上山采得草药只能利用绳子沿着山壁上山，后来，这种传统的上山方式演化成高空飞渡表演。<br>
			灵岩飞渡表演位于雁荡山灵岩景区内，表演是在在天柱峰和展旗峰的峰顶拉上一条绳子，高达200米，宽亦200多米，人在绳子上表演翻跟斗、飞翔等动作，堪称一绝。
			灵岩飞渡采用乐清籍音乐界前辈詹成樊老师乐曲编排《对鸟》及《雁荡谣》等当地乐曲，飞渡人员根据配音再做相应的动作，使表演更加微妙惟肖，使整个表演达到了高潮。
		</span>
    </div>
</template>

<script>
export default {
    name:'lingyan'
}
</script>

<style scoped>
.video{
	width: 998px;
	height: 681px;
    position: absolute;
	left: -300px;
	top:0px;
}
.note{
	width: 607px;
	height: 597px;
    position: absolute;
	left: 750px;
	top: 97px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
}
</style>