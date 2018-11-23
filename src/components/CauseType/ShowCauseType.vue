<template>
  <div id="cause-wrap">
    <div id="causeChart" style="width:750%;height: 300px;position: absolute;left: 30%;top: -20px;"></div>
  </div>
</template>
<script>
  export default {
    name:'cause-type',
    data() {
      return {
        flag:window.relaterFlag,
      }
    },
    mounted(){

    },
    methods:{
//      数据预处理
      updateData(reqData){
        let digitData = [];
        let contentData = [];
        for(let k = 0;k<reqData.length;k++){
          digitData.push(reqData[k].caseCauseNum);
          contentData.push(reqData[k].caseCause);
          if(contentData[k]===''){
            contentData[k] = '其他'
          }
        }
//        降序处理
        for(let i=0;i<digitData.length;i++)
        {
          for(let j=0;j<digitData.length-i-1;j++)
          {
            if (digitData[j] < digitData[j + 1])
            {
             let t = digitData[j + 1];
             let temp = contentData[j+1];
              digitData[j + 1] = digitData[j];
              contentData[j+1] = contentData[j];
              digitData[j] = t;
              contentData[j] =temp;
            }
          }
        }
        console.log(contentData.length,"共计contentData.length条数据")
        let processedData ={digitData,contentData};
        this.drawCausePie(processedData);
        return processedData
      },
      changeCharts(){
        window.addEventListener('resize', ()=> {
          this.drawCausePie.resize();
        })
      },
      drawCausePie(update){
        let causeWrap = document.getElementById('causeChart')
        let  resizeCauseWrap = function () {
          causeWrap.style.width = window.innerWidth+'px';
          causeWrap.style.height = window.innerHeight+'px';
        };
        resizeCauseWrap();
        /*基于准备好的dom,初始化echarts的实例*/
        let causeChart = this.$echarts.init(causeWrap)

        /*绘制图表*/
        causeChart.setOption({
        /*控制整个图表的位置大小宽高等*/
          grid:{
            y:100,
            x:'12.5%',
            width: '55%',
            height:'60%',
          },
          title:{
            text:'共计'+update.contentData.length+'种案件类型',
            y:'18%',
//            top:'top',
            x:'55%',
            textStyle:{ //设置主标题风格
              color:'#aaa',//设置主标题字体颜色
              fontStyle:'',//主标题文字风格
              fontSize:12
            }
            },
          /*悬浮提示框*/
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            }
          },
          /*计算*/
          calculable : true,
          /*X轴*/
          xAxis :
            {
              type : 'value',
              boundaryGap : [0, 0],
              barGap: '10%',
              max:210,
              min:1,
              scale:true,
              color:['#eee'],
              axisLabel:{
//                fontSize:25,
                fontWeight:'bold',
                fontFamily:'宋体',
                color:"#fff"
              },
              splitLine:{
                show:false
              },
//              show:false,
              axisLine:{
                lineStyle:{
                  color:'#fff',
                  width:1,//这里是为了突出显示加上的，可以去掉
                }
              },

            },
          /*Y轴*/
          yAxis: {
            type: 'category',
            data: update.contentData,
            inverse: true,
//            show:false,
            /*轴标*/
            axisLabel: {
              color:"#999",
              fontSize:10,
              fontWeight:'bold',
              fontFamily:'宋体',
              rotate: 0,
            },
            axisLine:{
              lineStyle:{
                color:'#fff',
                width:1,//这里是为了突出显示加上的，可以去掉
              }
            },
            splitLine: {
              show: false
            },
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              left: '100%',
              start: 0, //数据窗口范围的起始百分比
              end: 45
            },
            {
              type: 'inside',
              yAxisIndex: [0],
              start: 0,
              end: 45
            }
          ],
          /*图表项*/
          series : [
            {
              name:'共计',
              type:'bar',
              barMinHeight:10,  //最小柱高
              barMaxHeight:100,
              barMaxWidth:20,   //最大柱宽度
              barMinWidth:10,
              itemStyle: {
                normal: {
//                  柱条圆角
//                  barBorderRadius:[0, 0, 0, 0],
//                  随机柱条颜色
//                  color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                  color:['#4ec397'],
                  /*color: new $echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#3977E6'},
                      {offset: 1, color: '#37BBF8'}

                    ]
                  ),*/
                  /*shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 30,*/
                  label: {
                    show: true,
                    textStyle: {
                      color: '#999'
                    },
                    align: 'left',
                    position: 'right',
                    padding_left: 10,
                  }
                }
              },
              data:update.digitData
            }
          ],
        });
        window.onresize = function () {
          //重置容器高宽
          resizeCauseWrap();
          causeChart.resize();
        };
      },
      zoomIt(){
        console.log("跳转了")
        document.getElementById('causeChart').stylesheet={
          position:'fixed',
          left:0,
          top:0,
          right:0,
          bottom:0,
          backgroundColor:"pink"
//          background: rgba(0,0,0,0.3)
      }

//        this.$router.push('/involvedincasecauseinfo')

        this.$router.push('/document-abstract/abstract/involvedincasecauseinfo')
        console.log(this.$router,"跳转至")
      }
    },
    created(){
      this.$store.dispatch('getInvolvedInCaseCauseInfo',this.updateData)
//      this.causeChart();
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #cause-wrap{
    position relative
  }
#causeChart{

}
@media (min-width: 500px) {
  #causeChart{
    margin-left: -25%;
}
}
</style>
