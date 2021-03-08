<template>
    <div>
      <ul class="mainbt">
        <li><img src="../../assets/mainbt1.png" @click="keqian()"></li>
        <li><img src="../../assets/mainbt2.png" @click="keshang()"></li>
        <li><img src="../../assets/mainbt3.png" @click="kehou()"></li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  methods:{
    gotolink(){
      this.$router.push({path:'/personal'})
    },
    keqian(){
      this.$router.push({path:'/guide'})
    },
    kehou(){
      this.$router.push({path:'/kehoulist'})
    },
    keshang(){
      this.$router.push({path:'/pdf'})
    },
    poetry_road(){
      this.$router.push({path:'/poetry_road'})
    },
    review(){
      this.$router.push({path:'/review'})
    },
  }
};
</script>

<style scoped>
.mainbt{
  width: 1080px;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 70px 0 0 120px;
  float: left;
}
.mainbt li {
  width: 1200px;
  height: 476px;
  margin-top: 40px;
  margin-bottom:-600px;
  margin-left: 190px;
  /* margin:50px 258px -600px 110px; */
}
.mainbt li img{
  position: relative;
  width: 141px;
  height: 120%;
  display: block;
  float: left;
  cursor: pointer;
  margin-right: 200px;
  transition: all 0.75s;
}
.mainbt li img:hover{
  transform: scale(1.1);
}
</style>