<template>
  <div>
    <div id="caseChart" style="width:100%;height: 300px;margin-left:-40px;min-width: 400px;margin-top: -10px "></div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    props:{
      /*involvedincaseinfo:{
        type:Array
      }*/
    },
    name:'case-type',
    data() {
      return {
        msg: 'made by jjsunyet',
      }
    },
    mounted(){

    },
    methods:{
      resetData(newData){
        let resetDatas = newData
        console.log(resetDatas,"resetDatas")
        let lengendData = []
        let seriesData = []
        let caseTypes = {individualCase:'个人案件',corporateCase:'任法人企业案件',ceoCase:'任高管企业案件',investmentCase:'投资企业案件'}
        for(let i=0;i<newData.length;i++){
//          console.log(newData,"2new")
          if(newData[i].caseType == 11){
            lengendData.push(caseTypes.individualCase)
            seriesData.push({value:newData[i].caseTypeNum,name:caseTypes.individualCase})
          }else if(newData[i].caseType == 21){
            lengendData.push(caseTypes.corporateCase)
            seriesData.push({value:newData[i].caseTypeNum,name:caseTypes.corporateCase})
          }else if(newData[i].caseType == 22){
            lengendData.push(caseTypes.ceoCase)
            seriesData.push({value:newData[i].caseTypeNum,name:caseTypes.ceoCase})
          }else if(newData[i].caseType == 23){
            lengendData.push(caseTypes.investmentCase)
            seriesData.push({value:newData[i].caseTypeNum,name:caseTypes.investmentCase})
          }
        }
//        console.log(seriesData,"value")
        const dataMaterial = {resetDatas,lengendData,seriesData}
//        console.log(dataMaterial,"dataMaterial")
        this.drawCasePie(dataMaterial)
        return dataMaterial
      },
      changeCharts(){
        window.addEventListener('resize', ()=> {
          this.drawCasePie.resize();
        })
      },
      drawCasePie(extra){
        /*基于准备好的dom,初始化echarts的实例*/
        let caseChart = this.$echarts.init(document.getElementById('caseChart'))

        /*绘制图表*/
        caseChart.setOption({
          /*悬浮提示框*/
          tooltip: {
            trigger: 'item',
            /*a:面积模式，b:案件类型，c:value,d:计算得来的百分比*/
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          /*比例尺也即图例*/
          legend: {
            x: 'center',
            y: 260,
            itemGap:30,
            data: extra.lengendData
          },
          /*计算百分比*/
          calculable: true,
          /*饼块格式设置*/
          series: [
            {
              name: '涉诉案件类型',
              type: 'pie',
              radius: ['15%', '50%'],
              center: ['50%', '50%'],
              roseType: 'area',
              /*数据*/
              data: extra.seriesData,
              /*自定义引线文本样式*/
              itemStyle: {
                normal: {
                  label: {
                    show: true, formatter: '{b}:{c} ({d}%)'
                  },
                  labelLine: {show: true}
                }
              }
            }
          ],
          /*饼块大小*/
          grid:{

          },
          /*放大缩小*/
//          dataZoom: [
//            {
//              show: true,
//              realtime: true,
//              start: 65,
//              end: 85
//            },
//            {
//              type: 'inside',
//              realtime: true,
//              start: 45,
//              end: 85
//            }
//          ],
          /*饼块颜色*/
          color: ["#ff538b",
            "#fabd13",
            "#4ecb83",
            "#6e92ff"
          ],

        });
        window.onresize = caseChart.resize;
      }
    },
    computed:{
      ...mapState(['involvedincaseinfo'])
    },
    created(){
      this.$store.dispatch('getInvolvedInCaseInfo',this.resetData)
//      this.changeCharts();
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
