<template>
    <div class="main">
        <navigation></navigation>
        <div class="top_bar">
            <img src="../../assets/head.svg">
            <span id="uname" v-html="getCookie('username')"></span>
            <span class="select_class">课时选择</span>
            <el-select v-model="value" placeholder="请选择" style="margin-left:100px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <button  @click="showbox=true"><img src="../../assets/upload.svg" class="upload">上传课件</button>
        </div>
        <div class="upload_box">
                <img src="../../assets/course.jpg">
                <span class="course_name">《楠溪江：美妙的自然景观》</span>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        第一课时<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="operation">
                        <el-dropdown-item>编辑</el-dropdown-item>
                        <el-dropdown-item>预览</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </div>
        <div class="mask" v-if="showbox" @click="showbox=false"></div>
        <div class="mask-box" v-if="showbox">
            <div class="right-box">
                <button>选择本地文件</button>
                <el-select v-model="value" placeholder="请选择" class="choose">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="left-box">
                <span>课件上传</span>
                <div class="course">
                    <img src="../../assets/course.jpg">
                    <span>楠溪江：美妙的自然景观.pptx</span>
                    <button><img src="../../assets/upload.svg">开始上传</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from "../../components/Navigation";
export default {
    data() {
        return {
            showbox:false,
            options: [{
                value: '选项1',
                label: '第一课时'
                }, {
                value: '选项2',
                label: '第二课时'
                }, {
                value: '选项3',
                label: '第三课时'
                }],
                value: '',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    },
    components:{
        Navigation,
    },
     methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
       handlePreview(file) {
        console.log(file);
      }
    }
}
</script>

<style scoped>
.main{
    width: 100%;
    height: 100%;
    min-height:960px;
    min-width: 1900px;
    background: rgba(245, 241, 241, 1);
}
.top_bar{
	width: 100%;
	height: 88px;
    position: absolute;
    top: 0;
    /* left: 108px; */
	color: rgba(80, 80, 80, 1);
	background-color: rgb(255, 255, 255);
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
.top_bar img{
	width: 45px;
	height: 45px;
    position: absolute;
    float: left;
    left: 90%;
    margin-top: 20px;
	font-size: 45px;
	color: rgba(42, 130, 228, 1);
}
.top_bar span{
	width: 60px;
	height: 30px;
    position: relative;
    top: 27px;
    left: 45%;
	color: rgba(42, 130, 228, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
}
.top_bar .el-select{
	width: 200px;
	height: 38px;
    position: absolute;
	left: 154px;
	top: 30px;
}
.top_bar .select_class{
	width: 80px;
	height: 30px;
    position: absolute;
	left: 142px;
	top: 34px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.top_bar button{
	width: 100px;
	height: 38px;
    position: absolute;
	left: 490px;
	top: 30px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(42, 130, 228, 1);
	border-radius: 12px;
	font-size: 14px;
	text-align: right;
    outline: none;
    border: none;
    cursor: pointer;
}
.top_bar button .upload{
    width: 24px;
    height: 24px;
    position: absolute;
    top: -12px;
    left: 6px;
}
.upload_box{
	width: 1742px;
	height: 820px;
    position: absolute;
	left: 144px;
	top: 112px;
	background-color: rgb(255, 255, 255);
	line-height: 150%;
	text-align: center;
}
.upload_box img{
    width: 292px;
    height: 222px;
    position: relative;
    top: 33px;
    left: -640px;
}
.course_name{
	width: 218px;
	height: 24px;
    position: absolute;
	left: 68px;
	top: 308px;
	color: rgba(128, 128, 128, 1);
	font-size: 16px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.el-dropdown{
	width: 66px;
	height: 24px;
    position: relative;
    top: 99px;
    left: -920px;
	color: rgba(166, 166, 166, 1);
	font-size: 16px;
	text-align: left;
	font-weight: bold;
}
.el-icon--right{
	width: 24px;
	height: 24px;
    position: relative;
	left: 226px;
	top: -25px;
	font-size: 24px;
	color: rgb(255, 255, 255);
    background-color:  rgba(42, 130, 228, 1);
    border-radius: 30px;
}
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  opacity: 0.5;
}
.mask-box{
	width: 1425px;
	height: 814px;
    position: absolute;
	left: 248px;
	top: 68px;
    z-index: 10;
	background-color: rgba(245, 241, 241, 1);
	box-shadow: 0px 15px 15px 0px rgba(166, 166, 166, 1);
	text-align: center;
}
.right-box{
	width: 262px;
	height: 814px;
	left: 248px;
	top: 68px;
	background-color: rgba(255, 255, 255, 1);
	text-align: center;
}
.right-box button{
	width: 178px;
	height: 46px;
    position: absolute;
	left: 42px;
	top: 79px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(42, 130, 228, 1);
	border-radius: 12px;
	font-size: 18px;
	line-height: 150%;
	text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
}
.main>>>.choose{
	width: 178px;
	height: 46px;
    position: absolute;
	left: 42px;
	top: 146px;
}
.left-box span{
	width: 80px;
	height: 30px;
    position: absolute;
	left: 318px;
	top: 42px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.course{
	width: 318px;
	height: 275px;
    position: absolute;
	left: 305px;
	top: 106px;
	background-color: rgba(255, 255, 255, 1);
	line-height: 150%;
	text-align: center;
}
.course img{
    width: 292px;
	height: 222px;
    position: relative;
	left: 0px;
	top: 10px;
}
.course span{
	width: 248px;
	height: 27px;
    position: absolute;
	left: 35px;
	top: 241px;
	color: rgba(128, 128, 128, 1);
	font-size: 18px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.course button{
	width: 122px;
	height: 56px;
    position: absolute;
	left: 902px;
	top: 624px;
	color: rgb(255, 255, 255);
	background-color: rgba(42, 130, 228, 1);
	border-radius: 12px;
	font-size: 14px;
	line-height: 250%;
	text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
}
.course button img{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 15px;
    left: 5px;
}
</style>