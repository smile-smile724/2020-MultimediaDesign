<template>
    <div class="main">
        <button class="re" @click="re()"></button>
        <div class="box"> 
            <span class="dati">我要出题</span>
            <div class="question">
                <span>请输入题目：</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="option">
                <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
                    <el-form-item label="输入正确选项:">
                        <el-input v-model="formLabelAlign.name"></el-input>
                        <el-divider></el-divider>
                    </el-form-item>
                    <el-form-item label="输入干扰项:">
                        <el-input v-model="formLabelAlign.region"></el-input>
                        <el-divider></el-divider>
                    </el-form-item>
                    <el-form-item label="输入干扰项:">
                        <el-input v-model="formLabelAlign.type"></el-input>
                        <el-divider></el-divider>
                    </el-form-item>
                    <el-form-item label="输入干扰项:">
                        <el-input v-model="formLabelAlign.type"></el-input>
                        <el-divider></el-divider>
                    </el-form-item>
                </el-form>
            </div>
            <button class="submit">提交</button>
        </div>
    </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  min-height:960px;
  min-width: 1900px;
  background: rgba(226, 221, 213, 1);
}
.box{
  width: 1262px;
  height: 788px;
  position: relative;
  top: 100px;
  left: 50%;
  margin-left: -631px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(229, 229, 229, 1);
  border-radius: 30px;
  box-shadow: 0px 15px 15px 0px rgba(210, 193, 180, 1);
}
.re{
  width: 253px;
  height: 69px;
  background: url('../../assets/return.png');
  position: absolute;
  top: 33px;
  left: 54px;
  outline: none;
  border: none;
}
.dati{
  width: 242px;
  height: 50px;
  position: relative;
  left: -500px;
  top: 34px;
  color: rgba(80, 80, 80, 1);
  font-size: 30px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.question{
	width: 1062px;
	height: 99px;
    position: relative;
	left: 50%;
    margin-left: -531px;
	top: 80px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(140, 83, 83, 0.8);
	border-radius: 40px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
.question span{
	width: 528px;
	height: 36px;
    position: relative;
	left: -410px;
	top: 29px;
	color: rgba(255, 255, 255, 1);
	font-size: 30px;
	line-height: 150%;
	text-align: left;
}
.question>>>.el-input__inner{
	width: 838px;
	height: 64px;
    position: relative;
    top: -27px;
    left: 90px;
	opacity: 0.5;
	color: rgb(0, 0, 0);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 8px;
	font-size: 25px;
	line-height: 150%;
	border: rgba(172, 141, 104, 1) solid 1px;
	text-align: left;
}
.option{
    width: 1062px;
    height: 432px;
    position: relative;
    left: 50%;
    margin-left: -531px;
	top: 108px;
	opacity: 0.8;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
.option .el-form{
    position: absolute;
    top: 20px;
    left: 35px;
    
}
.option>>>.el-form-item__label{
	width: 140px;
	height: 30px;
	color: rgba(158, 112, 112, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
    margin-top: 35px;
}
.option>>>.el-input__inner{
    width: 800px;
    margin-top: 30px;
    border-color: transparent;
    font-size: 20px;
}
.el-divider{
    margin: 0;
}
.submit{
    position: absolute;
    top: 708px;
    left: 1014px;
	width: 146px;
	height: 45px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(158, 112, 112, 1);
	border-radius: 11px;
	text-align: center;
    font-size: 20px;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>

<script>
export default {
  name: "paiwei",
  components:{

  },
  data() {
    return {
        radio:"",
        vercode:'',
        btnDisabled:false,
        input: '',
                labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
    }
  },
  methods:{
    re(){
      this.$router.push({path:'/kehoulist'})
    },
  },
};
</script>