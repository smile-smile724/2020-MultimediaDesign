import Vue from 'vue'
import Router from 'vue-router'
import login from "@/pages/Login.vue";
import home from "@/pages/Home.vue";
//左侧栏
import personal from "@/pages/left/personal";
import poetry_road from "@/pages/left/poetry_road";
import review from "@/pages/left/review";
import course_learning from "@/pages/left/course_learning";
// import timeup from '@/components/timeup';
// 课后
import paint from "@/pages/kehou/paint.vue";
import kehoulist from "@/pages/kehou/kehoulist";
import paiwei from "@/pages/kehou/paiwei";
import endlessrank from "@/pages/kehou/endlessrank";
import set_question from "@/pages/kehou/set_question";
import bookshelf from "@/pages/kehou/bookshelf";
import paintGame from "@/pages/kehou/paintGame";
// 课前
import map from "@/pages/keqian/map.vue";
import guide from "@/pages/keqian/guide";
//温州
import wenzhoulist from "@/pages/keqian/wenzhou/wenzhoulist"
import yongjiaxian from "@/pages/keqian/wenzhou/yongjiaxian"
import yandangshan from "@/pages/keqian/wenzhou/yandangshan"
import nanxijiang from "@/pages/keqian/wenzhou/nanxijiang"
import jiangxinyu from "@/pages/keqian/wenzhou/jiangxinyu"
//绍兴
import shaoxinglist from "@/pages/keqian/shaoxing/shaoxinglist"
import shiningshu from "@/pages/keqian/shaoxing/shiningshu"
import jianhu from "@/pages/keqian/shaoxing/jianhu"
import tianlaoshan from "@/pages/keqian/shaoxing/tianlaoshan"
import potgame from "@/pages/keqian/shaoxing/pot-game"
//杭州
import hangzhoulist from "@/pages/keqian/hangzhou/hangzhoulist"
import xianghu from "@/pages/keqian/hangzhou/xianghu"
import tongluxian from "@/pages/keqian/hangzhou/tongluxian"
import fuchunjiang from "@/pages/keqian/hangzhou/fuchunjiang"
//课上
import ppt from "@/pages/keshang/ppt.vue"
import pdf from "@/pages/keshang/pdf.vue"
//教师端
import data_manage from "@/pages/teacher/data_manage.vue"
import teacher_class from "@/pages/teacher/teacher_class"
import course_manage from "@/pages/teacher/course_manage"
import lianxi from "@/pages/teacher/lianxi.vue"
import teacher_pdf from "@/pages/teacher/teacher_pdf.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", component: login },
    { 
      path: "/home", 
      name:'home',
      component: home, 
      redirect:{name:"course_learning"},
      children:[
        {
          path:"/course_learning",
          name:"course_learning",
          component:course_learning
        },
        {
          path:"/personal",
          name:"personal",
          component:personal,
        },
        {
          path:"/review",
          name:"review",
          component:review,
        },
        {
          path:"/poetry_road",
          name:"poetry_road",
          component:poetry_road,
        }
      ]
    },
    { path: "/personal", component: personal },
    { path: "/review", component: review },
    { path: "/poetry_road", component: poetry_road },
    { path: "/map", component: map },
    { path: "/guide", component: guide },
    { path: "/kehoulist", component: kehoulist },
    { path: "/paint", component: paint },
    { path: "/paiwei", component: paiwei },
    { path: "/endlessrank", component: endlessrank },
    { path: "/set_question", component: set_question },
    { path: "/bookshelf", component: bookshelf },
    { path: "/ppt", component: ppt },
    { path: "/data_manage", component: data_manage },
    { path: "/teacher_class", component: teacher_class },
    { path: "/course_manage", component: course_manage },
    { path: "/lianxi", component: lianxi },
    { path: "/wenzhoulist", component: wenzhoulist },
    { path: "/yongjiaxian", component: yongjiaxian },
    { path: "/yandangshan", component: yandangshan },
    { path: "/nanxijiang", component: nanxijiang },
    { path: "/jiangxinyu", component: jiangxinyu },
    { path: "/shaoxinglist", component: shaoxinglist },
    { path: "/shiningshu", component: shiningshu },
    { path: "/jianhu", component: jianhu },
    { path: "/tianlaoshan", component: tianlaoshan },
    { path: "/pot-game", component: potgame },
    { path: "/hangzhoulist", component: hangzhoulist },
    { path: "/xianghu", component: xianghu },
    { path: "/tongluxian", component: tongluxian },
    { path: "/fuchunjiang", component: fuchunjiang },
    { path: "/paintGame", component: paintGame },
    { path: "/pdf", component: pdf },
    { path: "/teacher_pdf", component: teacher_pdf }
    // { path: "/", component: timeup },
  ]
})
