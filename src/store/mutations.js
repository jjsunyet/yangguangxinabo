import {RECEIVE_INVOLVEDINFO,RECEIVE_INVOLVEDINCASEINFO,RECEIVE_INVOLVEDINCASECAUSEINFO,RECEIVE_PARTIESINVOLVED} from './mutation-types'

export default {
  /*接收借款人信息*/
  [RECEIVE_INVOLVEDINFO](state,{involvedinfo}){
    // debugger
    state.involvedinfo = involvedinfo
},
  /*接收案件类型分布信息*/
  [RECEIVE_INVOLVEDINCASEINFO](state,{involvedincaseinfo}){
    state.involvedincaseinfo = involvedincaseinfo
  },
  /*接收案由类型分析*/
  [RECEIVE_INVOLVEDINCASECAUSEINFO](state,{involvedincasecauseinfo}){
    state.involvedincasecauseinfo = involvedincasecauseinfo
  },
  /*接收鱼骨图信息*/
  [RECEIVE_PARTIESINVOLVED](state,{partiesinvolved}){
    state.partiesinvolved = partiesinvolved
  }
}

