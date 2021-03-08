<template>          
    <div>
        <div id="poemchart2"></div>
    </div>
</template>
        
<script>
    const echarts = require('echarts');
    export default {
        name: 'poemchart1',
        data () {
            return {
                
            }
        },
        props:['info'],
        mounted() {
            //基于准备好的dom, 初始化echarts实例
            var dateArr=[];
            var numArr=[];
            for(var i=1;i<=5;i++){
                var arr=this.info['day'+i].split(",");
                dateArr[i-1]=arr[0]
                numArr[i-1]=parseInt(arr[1])
            }
            let myChart = echarts.init(document.getElementById('poemchart2'));
            myChart.setOption({
                title:{
                    text:'探访时长',
                     textStyle:{
                        color:'rgba(80, 80, 80, 1)',
                　　　　 fontSize:30,
                    }
                },
                xAxis: {
                    type: 'category',
                    data: dateArr
                },
                yAxis: {
                    type: 'value'
                },
                grid:{
                    x:150,
                    y:100
                },
                tooltip:{
                    show:true
                },
                series: [{
                    data:numArr,
                    type: 'line',
                    color:'rgba(140, 83, 83, 1)'
                }]
            })
        }
    }
</script>
        
<style scoped>
#poemchart2{
    position: absolute;
    left: 23px;
    top: 69px;
    width: 470px;
	height: 344px;
	color: rgba(80, 80, 80, 1);
	/* background-color: rgba(255, 255, 255, 1); */
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
</style>