<template>
<div id="navigation">
        <ul>
                <span class="teacher">教师端</span>
                <li  class="nav-item" v-for="(item,index) in nav" @click="routerLink(index, item.path)" :key="index">
                    <div class="imgbtn">
                      <img :src="item.src" class="image">
                      <div :class="item.path === $route.path ? ' item-cn-active ' : 'item-cn'" ></div>
                      <span id="btnname">{{ item.title }}</span>
                    </div>
                </li>
        </ul>
</div>
</template>
<script>
export default{
name:"Navigation",
data(){
  return{
    nav: [
          {title: '数据管理', path: '/data_manage', src:require('../assets/data management.png')},
          {title: '进入课堂', path: '/teacher_pdf', src:require('../assets/classroom.png')},
          {title: '课件管理', path: '/course_manage', src:require('../assets/course management.png')}
        ],
    navIndex: 0
    }
  },
    methods:{
    routerLink(index, path) {
        // 点击哪个路由就赋值给自定义的下标
        this.navIndex = index;
        // 路由跳转
        this.$router.push(path)
        }
    },
    mounted(){
      console.log(this.$route.path)
    }
}
</script>

<style scoped> 
#navigation{
  width:108px;
  height:100%;
  position: relative;
  z-index:1;
}
#navigation ul{
    justify-content: space-around;
    background: rgba(42, 130, 228, 1);
    height: 100%;
    width: 108px;
    position: relative;
    margin: 0;
    padding: 0;
}
#navigation ul li{
  display: block;
  height:73px;
  width: 73px;
  position: relative;
  top: 150px;
  left: 18px;
  /* padding-top: 74px; */
  margin-top: 74px;
  cursor: pointer;
}
.teacher{
	width: 60px;
	height: 30px;
	left: 24px;
	top: 34px;
	color: rgba(255, 255, 255, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
.nav-item {
  text-align: center;
  position: relative;
  font-size: 14px;
  line-height: 5px;
  width: 100%;
  display: block;
}
.item-cn {
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
}
.item-cn-active {
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
	width: 73px;
	height: 73px;
	opacity: 0.6;
	background-color: rgba(13, 73, 140, 1);
	border-radius: 10px;
  position: relative;
  top: 26px;
  z-index:0;
}
.image{
  width: 45px;
  height: 45px;
  position: absolute;
  z-index:99;
  top:30px;
  left: 14px;
}
#btnname{
  position: absolute;
  top: 85px;
  left: -15px;
  width: 100px;
  color: rgba(255, 255, 255, 1);
  z-index:1;
}
</style>