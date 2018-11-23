import ajax from './ajax'
const BASE = '/api';//打包时关闭此语句

// const BASE = '';//打包时启用此语句
//根据借款人证件号（borrowerCertNo）和借款人姓名（borrowerName）请求借款人相关信息数据
export const reqInvolvedInfo = (borrowerCertNo,borrowerName) => ajax(BASE+'/document-abstract/abstract/getInvolvedInfo',{borrowerCertNo,borrowerName},'POST',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
export const reqInvolvedInCaseInfo = (borrowerCertNo,borrowerName,relaterFlag) => ajax(BASE+'/document-abstract/abstract/getInvolvedInCaseInfo',{borrowerCertNo,borrowerName,relaterFlag},'POST');
export const reqInvolvedInCaseCauseInfo = (borrowerCertNo,borrowerName,relaterFlag) => ajax(BASE+'/document-abstract/abstract/getInvolvedInCaseCauseInfo',{borrowerCertNo,borrowerName,relaterFlag},'POST');
//鱼骨图
export const reqPartiesInvolved = (borrowerCertNo,borrowerName,relaterFlag) => ajax(BASE+'/document-abstract/abstract/getPartiesInvolved',{borrowerCertNo,borrowerName,relaterFlag},'POST');
