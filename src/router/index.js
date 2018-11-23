import Vue from 'vue'
import VueRouter from 'vue-router'

import ShowBorrowerInfo from '../components/BorrowerView/ShowBorrowerInfo.vue'
import ShowCaseChart from '../components/CaseType/ShowCaseType.vue'
import ShowCauseChart from '../components/CauseType/ShowCauseType.vue'
import ShowPartiesInvolved from '../components/PartiesInvolved/PartiesInvolved.vue'


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/involvedinfo',
      component:ShowBorrowerInfo
    },
    {
      path: '/involvedincaseinfo',
      component:ShowCaseChart
    },
    {
      path: '/involvedincasecauseinfo',
      component:ShowCauseChart
    },
    {
      path: '/partiesinvolved',
      component:ShowPartiesInvolved
    },
    {
      path:'',
      redirect:'/involvedinfo'
    }
  ]
})
