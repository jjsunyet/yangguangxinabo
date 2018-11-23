import {reqInvolvedInfo,reqInvolvedInCaseInfo,reqInvolvedInCaseCauseInfo,reqPartiesInvolved} from "../api/index";
import {RECEIVE_INVOLVEDINFO,RECEIVE_INVOLVEDINCASEINFO,RECEIVE_INVOLVEDINCASECAUSEINFO,RECEIVE_PARTIESINVOLVED} from './mutation-types'

export default {
  /*获取借款人涉诉信息*/
  async getInvolvedInfo({commit,state},cb){
    // console.log(window,"action")
    const {borrowerCertNo,borrowerName} = window;
    // const{borrowerCertNo,borrowerName} = state;
     await reqInvolvedInfo(borrowerCertNo,borrowerName)
      .then(result=>{
        const involvedinfo = result;
        // console.log(involvedinfo,"involvedinfo")
        commit(RECEIVE_INVOLVEDINFO,{involvedinfo});
        cb && cb(result);									}										)
      .catch(error=>{
        console.log(error)
      });
  },
  /*获取涉诉案件类型*/
  async getInvolvedInCaseInfo({commit,state},cb){
    const {borrowerCertNo,borrowerName,relaterFlag} = window;
    // const{borrowerCertNo,borrowerName,relaterFlag} = state;
     await reqInvolvedInCaseInfo(borrowerCertNo,borrowerName,relaterFlag)
    .then(result=>{
      const involvedincaseinfo = result;
      // console.log(involvedincaseinfo,"involvedincaseinfo")
      commit(RECEIVE_INVOLVEDINCASEINFO,{involvedincaseinfo});
      cb && cb(result);
    })
    .catch(error=>{
      console.log(error)
    })
  },
  /*获取涉诉案由类型*/
  async getInvolvedInCaseCauseInfo({commit,state},cb){
    const {borrowerCertNo,borrowerName,relaterFlag} = window;
    // const{borrowerCertNo,borrowerName,relaterFlag} = state;
    await reqInvolvedInCaseCauseInfo(borrowerCertNo,borrowerName,relaterFlag)
    .then(result=>{
      const involvedincasecauseinfo = result;
      // console.log(involvedincasecauseinfo,"involvedincasecauseinfo")
      commit(RECEIVE_INVOLVEDINCASECAUSEINFO,{involvedincasecauseinfo});
      cb && cb(result);
    })
    .catch(error=>{
      console.log(error)
    })
  },
  /*获取鱼骨图信息*/
  async getPartiesInvolved({commit,state},cb){
    // const {borrowerCertNo,borrowerName,relaterFlag} = window;
    //固定模写
    const{borrowerCertNo,borrowerName,relaterFlag} = state;
    // debugger
    await reqPartiesInvolved(borrowerCertNo,borrowerName,relaterFlag)
      .then(
        result=>{
          const partiesinvolved = result;
          // console.log(partiesinvolved,"partiesinvolved")
          commit(RECEIVE_PARTIESINVOLVED,{partiesinvolved});
          cb && cb(result)
        }
      )
      .catch(error=>{
        console.log(error)
      })
  }
}
