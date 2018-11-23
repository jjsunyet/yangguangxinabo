<template>
  <div class="whole">
    <div class="legend-closet">
      <span class="sp lt-10k"></span><span class="sp-text">&lt;1万</span>
      <span class="sp range10-30k"></span><span class="sp-text">1万-3万</span>
      <span class="sp range30-100k"></span><span class="sp-text">3万-10万</span>
      <span class="sp range100-300k"></span><span class="sp-text">10万-30万</span>
      <span class="sp gt-300k"></span><span class="sp-text">&gt;30万</span>
    </div>
    <div class="line-wrapper"></div>
    <!--鱼体，可拖动，就一个无需遍历-->
    <div class="fish-body clear-fix">
      <!--整个日期框，需要遍历sortByDate 设置相对定位-->
      <div class="each-leafs clear-fix" v-if="sortByDate.length" v-for="(branch,index) in sortByDate" :key="index">

        <!--日期框去掉大圆点,不需遍历，设置绝对定位-->
        <ul class="common-wrap" @click="shortenCaseList(branch[0].caseList)">
          <!--案件节点，需要遍历caseList-->
          <li class="leave-node" v-if="branch[0].caseList.length && branch[0].caseList.length<=4" v-for="(leaf,index2) in branch[0].caseList" :key="index2">
            <ul class="back-bone">
              <li class="node">
                <ul class="node-wrap clear-fix">
                  <li class="node-left text-node" v-if="leaf.amtLevel && leaf.amtLevel == 'A'" style="background-color: #b1e5d1">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'B'" style="background-color: #d8ef56">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'C'" style="background-color: orange">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'D'" style="background-color: red">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'E'" style="background-color: darkred">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == '未分级'" style="background-color: #b1e5d1">{{editText(leaf)}}</li>
                  <li class="each-node text-node">
                    <ul class="node-container">
                      <li class="upper-line ellipsis">{{leaf.caseCause}}</li>
                      <li class="under-line ellipsis">{{leaf.trialProcedure === ''?'(--)': leaf.trialProcedure}}</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!--连接线，需要遍历caseList-->
              <li class="link-bone"></li>
            </ul>
          </li>
          <li class="leave-node" v-else-if="branch[0].caseList.length && branch[0].caseList.length>4" v-for="(leaf,index5) in shortCutBranches" :key="index5">
            <ul class="back-bone">
              <li class="node">
                <ul class="node-wrap clear-fix">
                  <li class="node-left text-node" v-if="leaf.amtLevel && leaf.amtLevel == 'A'" style="background-color: #b1e5d1">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'B'" style="background-color: #d8ef56">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'C'" style="background-color: orange">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'D'" style="background-color: red">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == 'E'" style="background-color: darkred">{{editText(leaf)}}</li>
                  <li class="node-left text-node" v-else-if="leaf.amtLevel && leaf.amtLevel == '未分级'" style="background-color: #b1e5d1">{{editText(leaf)}}</li>
                  <li class="each-node text-node">
                    <ul class="node-container">
                      <li class="upper-line ellipsis">{{leaf.caseCause}}</li>
                      <li class="under-line ellipsis">{{leaf.trialProcedure === ''?'(--)': leaf.trialProcedure}}</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <!--连接线，需要遍历caseList-->
              <li class="link-bone"></li>
            </ul>
          </li>
        </ul>
        <!--大圆点,不需遍历，设置绝对定位-->

        <div class="line-circle"
             @mouseenter="hoverShowYearMark(branch[0].sortTime,index)"
             @mouseleave="leaveShowDateMark(branch[0].sortTime,index)"
             v-if="branch[0].sortTime"
             @click="clickShow(branch[0].sortTime,index)"
             :ref="index">
          {{branch[0].sortTime.substring(5,7)+'/'+branch[0].sortTime.substring(8,10)}}
        </div>
      </div>
    </div>
    <div class="nav-closet">
      <span @click.stop="fetchPrev()"><img src="../../../static/images/prev.png"></span>
      <span @click.stop="pauseCarousel()"><img src="../../../static/images/play.png"></span>
      <span @click.stop="restartCarousel()"><img src="../../../static/images/pause.png"></span>
      <span @click.stop="fetchNext()"><img src="../../../static/images/next.png"></span>
    </div>
  </div>
</template>
<script>
  import ScheduleStyle from '../../../static/css/ComplaintsSchedule.css'
  import CommonStyle from '../../../static/css/CommonStyle.css'
  import Adaptations from '../../../static/css/Adaptation.css'
  //  import reset from '../../../static/css/reset.css'
  import {mapState} from 'vuex'
  import $ from 'jquery'

  ////  window.that.$refs.count = 1;
  //  let count = 1


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
      return {
        sortDate:[],
        sortYear: [],
        sortByYear: [],
        sortByDate:[],
        formatDateArr: [],
        bigArr:[],
        shortCutBranches:[]
      }
    },
    methods:{
      processData(resData){
        /*sortYear是过滤的年份参数数组,数据项格式为yyyy;sortDate是过滤的日期参数数组，数据项格式为yyyy-mm-dd*/
        let {sortDate,sortYear}= this.filterTime(resData)
        /*this.{sortDate,sortYear} = this.filterTime(resData)*/
        this.sortDate = sortDate;
        this.sortYear = sortYear;
        /*sortByYear是根据年份划分的数组*/
        let sortByYear = this.filterByYear(resData,sortYear)
        this.sortByYear = sortByYear;
        /*sortByDate是根据日期划分的数组*/
        let sortByDate = this.filterByDate(sortByYear,sortDate)
        this.sortByDate = sortByDate;
        /*formattedDate是页面显示时切分的重组的数组，数据项格式为mm/dd*/
        let formatDateArr = this.formatDate(sortByDate)
        this.formatDateArr = formatDateArr;
        /*分屏处理日期切分数组，五个一组*/
        let splitDate = this.lazyLoad(sortByDate)
        /*折叠caseList*/
        let shortCutBranches = this.shortenCaseList(sortByDate)
        this.shortCutBranches = shortCutBranches
//       let yearMark = this.hoverShowYearMark(st)
      },
      /*1.初步过滤时间数组*/
      filterTime(arr) {
        let sortDate = []
        let sortYear = []
        /*将所有的日期拿到一个数组里面*/
        for(let i=0;i<arr.length;i++){
          sortDate.push(arr[i].sortTime)
        }
        /*处理处日期数组，和年份数组*/
        for(let j=0;j<sortDate.length;j++){
          /*过滤日期数组（去重排序）*/
          for (let k = 0; k < sortDate.length; k++) {
            if(sortDate[j]==sortDate[k] && j!=k){
              sortDate.splice(j, 1)
            }
          }
          /*截取获得纯年份数组(去重，排序)*/
          sortYear.push(sortDate[j].substring(0,4))
          for (var l = 0; l < sortYear.length; l++) {
            for (let h = 0; h < sortYear.length; h++) {
              if(sortYear[l] == sortYear[h] && l!= h){
                sortYear.splice(l,1)
              }
            }
          }
        }
        /* console.log(sortDate,"sortDate")
         console.log(sortYear,"sortYear")*/
        /*按年份归类*/
        return {sortDate,sortYear}
      },
      /*2.根据年份划分数组*/
      filterByYear(raw,yearArr) {
        let sortByYear = []

        for (let i = 0; i < yearArr.length; i++) {
          let y = []
          for (let j = 0; j < raw.length; j++) {
            if(raw[j].sortTime.substring(0,4) == yearArr[i]){
              y.push(raw[j])
            }
          }
          sortByYear.push(y)
        }
//        console.log(sortByYear,"sortByYear打印")
        return sortByYear
      },
      /*3.根据日期划分数组*/
      filterByDate(ByYear,date) {
        let sortByDate = [];
        for(let i = 0; i < date.length; i++) {
          let d = [];
          for (let j = 0; j < ByYear.length; j++) {
            for(let k = 0; k < ByYear[j].length; k++){
              if(ByYear[j][k].sortTime==date[i]){
                d.push(ByYear[j][k])
              }
            }
          }
          sortByDate.push(d)
        }
        console.log(sortByDate,"sortByDate打印")
        return sortByDate
      },
      /*4.格式化日期*/
      formatDate(sortedDate) {
        let formatDateArr = [];
        let formattedDate = '';
        for (let i = 0; i < sortedDate.length; i++) {
          for (let j = 0; j < sortedDate[i].length; j++) {
            let month = sortedDate[i][j].sortTime.substring(5,7);
            let day = sortedDate[i][j].sortTime.substring(8,10);
            formattedDate = month +'/'+day;
          }
          formatDateArr.push(formattedDate)
        }
//        console.log(formatDateArr,"formatDateArr")
        return formatDateArr
      },
      /*5.分屏函数*/
      lazyLoad(sortByD){
        const max = 5;   //小数组中元素的最大长度
        const bigArr = [];  //outer数组
        let smallArr = [];  //inner数组

//      遍历sortByD
        sortByD.forEach(c=>{
          if(smallArr.length===0){
            bigArr.push(smallArr)
          }
          smallArr.push(c)
          if(smallArr.length===max){
            smallArr = []
          }
        });
//        console.log(bigArr,"bigArr")
        return bigArr
      },
      /*5.1分屏函数2*/
      /* carouselArr(sortByD) {
         let eachArr = [];
         let carouselArr = [];
         let endPoint =4,startPoint = 0;//数组最后一个下标
         let last  = 0;
         for (let i = 0; i < sortByD.length; i++) {
           eachArr.push(sortByD[i]);
           if(eachArr.length > endPoint){
             carouselArr.push(eachArr);
             eachArr = []
           }
           last = sortByD.length - carouselArr.length * (endPoint+1);
           if(last>startPoint && last <=endPoint){
             carouselArr.push(eachArr)
           }
         }
         console.log(carouselArr,"carouselArr")
       },*/
      /*6.鱼刺拼装*/
      assembleFishBody(sortByD){
        $("fish-body").css({
          "left" : "22rem",
          "margin":"0 2rem"
        })
//        $('.fish-body').css({style:left})
//        $(selector).css({"style1":"value1","style2":"value2",……})
      },
      /*修改文本*/
      editText(type){
        let typeText = ''
        if(type.caseType && type.caseType == 11){
          typeText = 'P'
        }else if(type.caseType && type.caseType == 21){
          typeText = 'C1'
        }else if(type.caseType && type.caseType == 22){
          typeText = 'C2'
        }else if(type.caseType && type.caseType == 23){
          typeText = 'C3'
        }
        return typeText
      },
      /*修建叶子结点长度*/
      shortenCaseList(sbd){
        let shortCutBranches = []
        for (let i = 0; i < sbd.length; i++) {//遍历到的是一个个的日期[]
          for (let j = 0; j <sbd[i].length; j++) {//遍历到的是一个个的案例[]
            if(sbd[i][j].caseList.length >4){
              sbd[i][j].caseList.length = 4;
              shortCutBranches =  sbd[i][j].caseList;
            }
          }
        }
        return  shortCutBranches
      },
      /*年份标记*/
      markTime(st,sy){
        console.log(st.substring(0,4),"st.sortTime")
        let flag = 0
        for (let i = 0; i < sy.length; i++) {
          if(st.substring(0,4) == sy[i]){
            flag = 1
          }else{
            flag = 0
          }
        }
        console.log(sy,"markTIEM")
        console.log(flag,"markFlag")
        return flag
      },
      /*悬浮显示年份*/
      hoverShowYearMark(st,index){
//        若要点击首先要鼠标移入，所以可以在这里初始化全局变量this（其实就是vm对象）
        window.that = this
        window.that.$refs[index][0].count  = 1;
        this.$refs[index][0].innerText=st.substring(0,4);
      },
      /*离开复原*/
      leaveShowDateMark(st,index){
        this.$refs[index][0].innerText = st.substring(5,7)+'/'+st.substring(8,10)
      },
      clickShow(st,index){
        if(window.that.$refs[index][0].count<2){
          window.that.$refs[index][0].count = window.that.$refs[index][0].count+1;
          $('.common-wrap').css({"opacity":'0',"transition":"0.5s"})
          $('.common-wrap')[index].style.opacity = '1'
        }else if(window.that.$refs[index][0].count == 2){
          $('.common-wrap').css({"opacity":'1',"transition":"0.5s"})
          window.that.$refs[index][0].count=1
        }
      },

      /*页面切换函数*/
      fetchPrev(){
        console.log("查看上一页")
      },
      pauseCarousel(){
        console.log("暂停轮播")
      },
      restartCarousel(){
        console.log("开始轮播")
      },
      fetchNext(){
        console.log("查看下一页")
      }
    },
    created(){
      this.$store.dispatch('getPartiesInvolved',this.processData)

    },
    computed:{
      ...mapState(['partiesinvolved'])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
