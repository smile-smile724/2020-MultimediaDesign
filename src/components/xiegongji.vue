<template>
    <div>
        <img src="../assets/xiegongji.png" class="xiegongji">
        <img src="../assets/xiegong.png" class="xiegong">
		<video src="../assets/xgj.mp4" class="xgj" id="xgj_video" controls></video>
    </div>
</template>

<script>
export default {
    name:'xiegongji'
}
</script>

<style scoped>
.note{
	width: 607px;
	height: 642px;
    position: absolute;
	left: 800px;
	top: 137px;
	color: rgba(80, 80, 80, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
}
.xiegongji{
	width: 1133px;
	height: 883px;
    position: absolute;
    left: -397px;
    top: -133px;
}
.xiegong{
	width: 300px;
	height: 382px;
    position: absolute;
	left: 400px;
	top: 390px;
}
.xgj{
	position: absolute;
	top: 80px;
	left: 650px;
	width: 707px; 
	height: 545px;
}
</style>