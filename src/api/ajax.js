import axios from 'axios'
import qs from 'querystring'

export default function (url,data={},method='GET') {
  return new Promise((resolve,reject) =>{
    let promise;
    if(method === 'GET'){
      let queryStr = '';
      /*Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。*/
      Object.keys(data).forEach(key=>{
      queryStr += key + '='+ data[key]+"&"
    });
  if(queryStr){
    queryStr = '?' + queryStr.substring(0, queryStr.length-1)
  }
  promise = axios.get(url +  queryStr)
}else {
      // promise = axios.post(url ,JSON.stringify(data),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      console.log(qs.stringify(data))
      promise = axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      })
    }
    promise
      .then(response=>{

        resolve(response.data)
      })
      .catch(err=>{
        reject(err.data)
      })
  })
}
