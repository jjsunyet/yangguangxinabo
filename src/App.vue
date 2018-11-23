<template>
  <div id="app" class="clear-fix">
    <div id="main-chart">
      <img src="../static/images/1.gif" alt="" v-if="!involvedinfo.length" style="position: absolute;left: 35%;height: 50%">
      <span class="borrower-chart">涉诉情况统计</span>
      <ShowBorrowerInfo :id="id" :option="option" v-show="involvedinfo.length"></ShowBorrowerInfo>
    </div>
    <div id="toggle-chart">
      <!--<span class="switch-dot on" id="dot1" @click="toggleCaseType($event)"></span><span class="switch-text s1">案件类型</span>
      <span class="switch-dot off" id="dot2" @click="toggleCaseCause($event)"></span><span class="switch-text s2">案由</span>
      <div id="case-chart" class="switch-chart case-show" v-if="involvedincaseinfo.length">
        <span class="common-title"><span v-if="flag==1">借款人</span><span v-else-if="flag==2">配偶</span><span v-else-if="flag==3">共借人</span><span v-else-if="flag==4">房屋共有人</span>{{involvedincaseinfo[0].relaterName}}-<span class="inner-title">案件类型分析</span></span>
        <ShowCaseChart :id="id" :option="option" v-show="involvedincaseinfo.length" :involvedincaseinfo="involvedincaseinfo"></ShowCaseChart>
      </div>
      <div id="cause-chart" class="switch-chart cause-hidden"  v-if="involvedincasecauseinfo.length">
        <span class="common-title"><span v-if="flag==1">借款人</span><span v-else-if="flag==2">配偶</span><span v-else-if="flag==3">共借人</span><span v-else-if="flag==4">房屋共有人</span>{{involvedincasecauseinfo[0].relaterName}}-
            <span class="inner-title">案由类型分析</span>
          </span>
        &lt;!&ndash;<span class="cause-tip">当前可能并未显示所有数据，尝试拖动一下...</span>&ndash;&gt;
        <span class="cause-tip">尝试向上拖动查看所有数据...</span>
        <ShowCauseChart :id="id" :option="option" :involvedincasecauseinfo="involvedincasecauseinfo"></ShowCauseChart>
      </div>
      <div id="case-blank" class="switch-chart case-show" v-if="!involvedincaseinfo.length && !involvedincasecauseinfo.length">
        <span class="common-title">
          <span v-if="flag == 2">配偶-</span>
          <span v-else-if="flag == 3">共借人-</span>
          <span v-else-if="flag == 4">房屋共有人-</span>
          <span id="case-profile">案件类型分析</span>
        </span>
        <span class="blank-tip">该关系人不存在</span>
      </div>-->

      <ShowPartiesInvolved/>
      <!--<ShowPI/>-->
    </div>
  </div>
</template>
<script>
  import ShowCaseChart from './components/CaseType/ShowCaseType.vue'
  import ShowCauseChart from './components/CauseType/ShowCauseType.vue'
  import ShowBorrowerInfo from  './components/BorrowerView/ShowBorrowerInfo.vue'
  import ShowPartiesInvolved from  './components/PartiesInvolved/PartiesInvolved2.vue'
//  import ShowPI from './components/PartiesInvolved/PI.vue'
  import {mapState,mapGetters} from 'vuex'
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
    props:{
      id:{
        type:String
      },
      option:{
        type:Object
      },
    },
    name: 'app',
    data() {
      return{
      }
    },
    components: {
      ShowCaseChart,
      ShowCauseChart,
      ShowBorrowerInfo,
      ShowPartiesInvolved,
//      ShowPI
    },
    methods:{
      toggleCaseType(e){
//        console.log("点击了d1")
        e.target.className = 'switch-dot dot1 on'
        document.getElementById('dot2').className = 'switch-dot off'
        document.getElementById('case-chart').className = 'switch-chart case-show'
        document.getElementById('cause-chart').className = 'switch-chart cause-hidden'
      },
      toggleCaseCause(e){
        document.getElementById('dot1').className = 'switch-dot off'
        console.log(e.target)
        e.target.className = 'switch-dot dot2 on'
//        console.log("点击了d2")

        document.getElementById('cause-chart').className = 'switch-chart cause-show'
        document.getElementById('case-chart').className = 'switch-chart case-hidden'
      }
    },
    computed: {
      ...mapState(['involvedinfo','involvedincaseinfo','involvedincasecauseinfo','partiesinvolved']),
      flag(){
        console.log(window.relaterFlag,"flag")
        return window.relaterFlag
      },
    },
    created(){
      window.borrowerName = this.$route.query.borrowerName
      window.borrowerCertNo = this.$route.query.borrowerCertNo
      window.relaterFlag = this.$route.query.relaterFlag
      console.log(this.flag)
      /*console.log(window.borrowerName,"window.borrowerName")
      console.log(borrowerCertNo,"borrowerCertNo")
      console.log(relaterFlag,"window.relaterFlag")*/
    },
    mounted(){
//      分发请求相关数据的action
      this.$store.dispatch('getInvolvedInfo'),
      this.$store.dispatch('getInvolvedInCaseInfo'),
      this.$store.dispatch('getInvolvedInCaseCauseInfo'),
      this.$store.dispatch('getPartiesInvolved')
    }
  }
</script>

<style>
#app{
  width: 100%;
  min-width: 7.68rem;
  height: 3rem;
  display: flex;
  margin-left: -0.07rem;
}
  #main-chart{
    height: 3rem;
    border: 0.01rem solid #eee;
    float: left;
    /*flex-shrink: 1;*/
    position: relative;
  }
  .borrower-chart{
    position: absolute;
    top: 0.05rem;
    left: 0.05rem;
    font-size: 0.14rem;
    color: #999;
    font-weight: bold;
  }
  #toggle-chart{
    height: 3rem;
    border: 0.01rem solid #eee;
    float: left;
    position: relative;
    /*flex-shrink: 3;*/
  }
  #cause-chart{
    position: relative;
  }
  .cause-tip{
    position: absolute;
    font-size: 0.12rem;
    color: #aaaaaa;
    left: 40%;
    top:10%;
  }
  #case-blank{
    position: relative;
  }
  .blank-tip{
    position: absolute;
    left: 45%;
    top: 30%;
    font-size: 0.16rem;
    color: #999999;
  }
  .common-title{
    font-size: 0.14rem;
    font-weight: bold;
    color: #999;
    position: absolute;
    left: 0.05rem;
    top: 0.05rem;
    border-bottom: 0.01rem solid #999;
  }
#toggle-chart .inner-title,#case-profile{
   border-bottom: 0.01rem solid #fff;
 }
  .switch-chart{
    height: 450px;
    width: 100%;
    position: absolute;
    left: 0rem;
    top: 0rem;
  }
  .case-show{
    display: block;
  }
  .case-hidden{
    display: none;
  }
  .cause-show{
    display: block;
  }
  .cause-hidden{
    display: none;
  }
  .switch-dot{
    width: 0.08rem;
    height: 0.08rem;
    display: inline-block;
    background-color: #eee;
    border: 0.01rem solid #aaa;
    border-radius: 50%;
    position: absolute;
    z-index: 9999;
    right: 2.3rem;
    top: 0.08rem;
    box-shadow: 0.02rem 0.02rem 0.02rem #999;
  }
#dot2{
  right: 1.2rem;
}
.on{
  background-color: #b1e5d1;
}
.off{
  background-color: #eee;
}
  .switch-text{
    font-size: 0.12rem;
    color: #999;
    position: absolute;
    right: 1.63rem;
    top: 0.06rem;
  }
  .s2{
    right: 0.82rem;
  }
</style>
