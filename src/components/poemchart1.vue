<template>          
    <div>
        <div id="poemchart1"></div>
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
            var that=this
            //基于准备好的dom, 初始化echarts实例
            let myChart = echarts.init(document.getElementById('poemchart1'));
            myChart.setOption({
                title:{
                    text:'答题情况',
                    textStyle:{
                        color:'rgba(80, 80, 80, 1)',
                　　　　 fontSize:30,
                    }
                },
                titleStyle:{
                    color:'rgba(80, 80, 80, 1)',
                },
                tooltip:{
                    show:true
                },
                yAxis: {
                    data: ["你画我猜","无尽排位","限时答题","课堂抢答"],
                    name: '',
                    itemStyle:{
                        Gap:'0'
                    }
                },
                xAxis : {},
                grid:{
                    x:150,
                },
                 series: [{
                    name: '',
                    type: 'bar',
                    data: [that.info.drawingAnswer, that.info.endlessAnswer, that.info.limitTimeAnswer,that.info.classroomAnswer],
                    barWidth:40,
                itemStyle: {   
                    normal: {
                        color: 'rgba(140, 83, 83, 1)',
                        },
                    show:false,
                    }
                }]
            })
        }
    }
</script>
        
<style scoped>
#poemchart1{
    position: absolute;
    left: 23px;
    top: 69px;
    width: 700px;
	height: 500px;
	color: rgba(80, 80, 80, 1);
	/* background-color: rgba(255, 255, 255, 1); */
	font-size: 14px;
	line-height: 150%;
	text-align: center;
}
</style>