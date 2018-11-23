<template>
  <div>
    <div id="borrowerChart" style="width:4.5rem;height: 3rem;min-width: 4rem;margin-top: -0.1rem"></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  Adjust();
  function Adjust() {
    let scale = 100/1920;// 表示1920的设计图,使用100PX的默认值
    let windowHeight = window.innerHeight;// 当前窗口的高度
    let windowWidth = window.innerWidth;// 当前窗口的宽度
    let rem = windowWidth * scale;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    $('html').css('font-size', rem + "px");
  }
  $(window).resize(Adjust);
  /*1REM=100PX*/
  export default {
    data() {
      return {}
    },
    methods:{
      updateData(rawData){
        let caseNumList = {};
        let seriesData = {};
        //data数组初始化
        let newData = [
          {value:0,name:'',selected:true},
          {value:0,name:''},
          {value:0,name:''},
          {value:0,name:''}
        ]
        //处理字符串
        for(let i = 0;i<rawData.length;i++){
          if(rawData[i].relaterFlag == 1){
            caseNumList.caseNum1 = rawData[i].caseNum
            if(rawData[i].doc.length===3){
                if(rawData[i].doc[0].type==1 && rawData[i].doc[1].type==2 && rawData[i].doc[2].type==3){
                  seriesData.sn1='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num+'\n'+'其他文书:'+rawData[i].doc[2].num
                }
              }
              else if(rawData[i].doc.length===2){
              if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 2){
                  seriesData.sn1='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num
                }
                else if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 3){
                  seriesData.sn1='判决书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num

                }
                 else if(rawData[i].doc[0].type ==2 && rawData[i].doc[1].type == 3){
                   seriesData.sn1='裁定书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num
                }
              }
              else if(rawData[i].doc.length===1){
                if(rawData[i].doc[0].type ==1){
                  seriesData.sn1='判决书:'+rawData[i].doc[0].num
                }else if(rawData[i].doc[0].type ==2){
                  seriesData.sn1='裁定书:'+rawData[i].doc[0].num
                }else if(rawData[i].doc[0].type ==3){
                  seriesData.sn1='其他文书:'+rawData[i].doc[0].num
                }
              }
          }
          else if(rawData[i].relaterFlag == 2){
            caseNumList.caseNum2 = rawData[i].caseNum
            if(rawData[i].doc.length===3){
              if(rawData[i].doc[0].type==1 && rawData[i].doc[1].type==2 && rawData[i].doc[2].type==3){
                seriesData.sn2='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num+'\n'+'其他文书:'+rawData[i].doc[2].num
              }
            }
            else if(rawData[i].doc.length===2){
              if(rawData[i].doc[0].type == 2 && rawData[i].doc[1].type == 3){
                seriesData.sn2='裁定书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num
              }
              else if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 3){
                seriesData.sn2='判决书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num
              }
              else if(rawData[i].doc[0].type ==1 && rawData[i].doc[1].type == 2){
                seriesData.sn2='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num
              }
            }
            else if(rawData[i].doc.length===1){
              if(rawData[i].doc[0].type ==1){
                seriesData.sn2='判决书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==2){
                seriesData.sn2='裁定书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==3){
                seriesData.sn2='其他文书:'+rawData[i].doc[0].num
              }
            }
          }
          else if(rawData[i].relaterFlag == 3){
            caseNumList.caseNum3 = rawData[i].caseNum
            if(rawData[i].doc.length===3){
              if(rawData[i].doc[0].type==1 && rawData[i].doc[1].type==2 && rawData[i].doc[2].type==3){
                seriesData.sn3='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num+'\n'+'其他文书:'+rawData[i].doc[2].num
              }
            }
            else if(rawData[i].doc.length===2){
              if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 2){
                seriesData.sn3='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num
              }
              else if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 3){
                seriesData.sn3='判决书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num

              }
              else if(rawData[i].doc[0].type ==2 && rawData[i].doc[1].type == 3){
                seriesData.sn3='裁定书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num
              }
            }
            else if(rawData[i].doc.length===1){
              if(rawData[i].doc[0].type ==1){
                seriesData.sn3='判决书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==2){
                seriesData.sn3='裁定书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==3){
                seriesData.sn3='其他文书:'+rawData[i].doc[0].num
              }
            }
          }
          else if(rawData[i].relaterFlag == 4){
            caseNumList.caseNum4 = rawData[i].caseNum
            if(rawData[i].doc.length===3){
              if(rawData[i].doc[0].type==1 && rawData[i].doc[1].type==2 && rawData[i].doc[2].type==3){
                seriesData.sn4='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num+'\n'+'其他文书:'+rawData[i].doc[2].num
              }
            }
            else if(rawData[i].doc.length===2){
              if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 2){
                seriesData.sn4='判决书:'+rawData[i].doc[0].num+'\n' +'裁定书:'+rawData[i].doc[1].num
              }
              else if(rawData[i].doc[0].type == 1 && rawData[i].doc[1].type == 3){
                seriesData.sn4='判决书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num
              }
              else if(rawData[i].doc[0].type ==2 && rawData[i].doc[1].type == 3){
                seriesData.sn4='裁定书:'+rawData[i].doc[0].num+'\n' +'其他文书:'+rawData[i].doc[1].num

              }
            }
            else if(rawData[i].doc.length===1){
              if(rawData[i].doc[0].type ==1){
                seriesData.sn4='判决书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==2){
                seriesData.sn4='裁定书:'+rawData[i].doc[0].num
              }else if(rawData[i].doc[0].type ==3){
                seriesData.sn4='其他文书:'+rawData[i].doc[0].num
              }
            }
          }
        };
        //处理data数组
        for(let j = 0;j<rawData.length;j++){
//          newData.length = rawData.length;
          if(rawData[j].relaterFlag == 1 && seriesData.sn1 && caseNumList.caseNum1){
            newData[j].name = seriesData.sn1;
            newData[j].value = caseNumList.caseNum1
            newData.length = rawData.length;

          }
          if(rawData[j].relaterFlag == 2 && seriesData.sn2 && caseNumList.caseNum2){
            newData[j].name = seriesData.sn2
            newData[j].value = caseNumList.caseNum2
          }
          if(rawData[j].relaterFlag == 3 && seriesData.sn3 && caseNumList.caseNum3){
            if(newData.length === 1){
              newData[j] = {};
              newData[j+1].name = seriesData.sn3
              newData[j+1].value = caseNumList.caseNum3
            }else if(newData.length === 2){
              newData[j].name = seriesData.sn3
              newData[j].value = caseNumList.caseNum3
            }
          }
          if(rawData[j].relaterFlag == 4 && seriesData.sn4 && caseNumList.caseNum4){
            if(newData.length === 1){//关系人类型为1、4的时候
              newData[j] = {};
              newData[j+1] = {};
              newData[j+2].name = seriesData.sn4
              newData[j+2].value = seriesData.caseNum4
            }else if(newData.length === 2){//关系人类型为1,2,4或者1,3,4的时候,(1,3,4暂时假设已解决)
              newData[j] = {};
              newData[j+1].name = seriesData.sn4
              newData[j+1].value = seriesData.caseNum4
            }else if(newData.length === 3){
              newData[j].name = seriesData.sn4
              newData[j].value = caseNumList.caseNum4
            }
          }
        };
        console.log(newData,"update newData")
        this.DrawBorrowerPie(newData)
      },
      DrawBorrowerPie(update){
        let borrowerChart = this.$echarts.init(document.getElementById('borrowerChart'))
        console.log(update,"update")
        borrowerChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a}{c} <br/>{b}"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['本人','配偶','共借人','房屋共有人']
          },

          title: [{
            text: '借款人'+window.borrowerName,
            top:'center',
            left:'center',
            textStyle:{
              color: '#404040',
              display:'block',
              fontSize:10,

            }
          }],
          /*color: [
            "#fabd13",
            "#416fc1",
            "#e97c30",
            "#a3a3a3",
          ],*/
          color: [
            "#5aa096",
            "#4ec397",
            "#76dab4",
            "#b1e5d1",
          ],
          series: [
            {
              name:'',
              type:'pie',
              selectedMode: 'single',

              radius: [0, '40%'],
              color:['#333'],
              fontWeight:'bold',
              label: {
                normal: {
                  position: 'inner',
                  padding:[0,0]
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
            },
            {
              name:'涉诉案件数量:',
              type:'pie',
              radius: ['20%', '35%'],
              align:'center',
              label: {
                normal: {
//            饼图、雷达图 : a（系列名称），b（数据项名称），c（数值）, d（百分比）
//            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  '
//                                   涉诉案件数量               房屋共有人       25          25%
                  formatter: '{a|{a}}{c|{c}}{abg|}\n{hr|}\n{b|{b}}',
                  shadowBlur:3,
                  width: '20%',
                  height:'27.7%',
                  rich: {
                    a: {
                      color: '#333',
                      lineHeight: 30,
                      align: 'center',
                      fontSize: 12,
                      padding: [10, 4]
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0,
                    },
                    b: {
                      fontSize: 12,
                      lineHeight: 18,
                      paddingTop:5,
                      align: 'center'
                    },
                    per: {
                      color: '#eee',
//                      backgroundColor: '#334455',
                      padding: [10, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              labelLine: {
                length:20
              },
              data:update
            }
          ]
        })

      }
    },
    created(){
      return this.$store.dispatch('getInvolvedInfo',this.updateData)
    },
    mounted(){
      this.DrawBorrowerPie()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
