<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  margin:0;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* .el-tooltip__popper{
	width: 340px;
	height: 195px;
	border-radius: 20px;
	font-size: 14px;
	line-height: 150%;
	text-align: center;
} */
/* .el-tooltip__popper.is-light{
  background-color: rgb(255, 255, 255);
  color: rgba(80, 80, 80, 1);
  border: none;
} */
/* .el-popper[x-placement^=bottom] .popper__arrow::after{
    top: 1px;
    border-top-width: 0;
    border-bottom-color: rgb(241 243 245);
} */
</style>
