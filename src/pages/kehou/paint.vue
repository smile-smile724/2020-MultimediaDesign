<template>
    <div class="wrapper">
        <canvas class="cavs" width="700" height="400"></canvas>
            <ul class="btn-list">
                <li><input type="color"  id='colorChange'></li>
                <li><input type="button" id='cleanBoard' value="清屏"></li>
                <li><input type="button" id='eraser' value="橡皮"></li>
                <li><input type="button" id='rescind' value="撤销"></li>
                <li><input type="range"  id='lineRuler'  value="线条" min="1" max="20"></li>
            </ul>
        </div>
</template>

<style scoped>
.wrapper{
	width: 700px;
	height: 410px;
}
.wrapper canvas{
	border: 1px solid royalblue;
	border-radius: 25px;
	margin-left: 50px;
	box-shadow: 10px 10px 5px #888888; /*水平位移 垂直位移 阴影半径*/
	margin-top: 20px;
}
.wrapper .btn-list{
	width:100%;
	text-align: center;
	border-radius: 25px;
	margin-top: 20px;
}
.wrapper ul li{
	display: inline-block;
	margin-left: 30px;
}
.wrapper ul li input{
	background-color:rgb(0, 136, 255);
	display: block;
	color: #fff;
	border: none;
	padding: 6px 15px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 25px;
	outline: none;
}
.wrapper .btn-list li input:hover{
	border:1px solid rebeccapurple;
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
}
</style>

// <script >
// import {painting} from '../../../config/index copy'
// export default {
// 	methods:{methods1:function(){
// 		painting();
// 	}
//   }
// }
// </script>
