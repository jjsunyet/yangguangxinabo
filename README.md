1.亟待解决的问题：
(1)只有鱼骨图做了适配，其他的没toggle-chart等没有做适配(已解决)
(2)不知道fish-body有没有溢出(未解决)
(3)滑屏方案（ing）
     sortGroup(ny,st,sbd,index){
//        ny3=[2014,2015,2016],st=2017-01-02,index=0,1,2,3,4……
        let ny1 = JSON.stringify(ny).split(',')
        let ny3 = []
        for (let i = 0; i < ny1.length; i++) {
          let ny2 = ny1[i].split('"')
          ny3.push(ny2[1])
        }
        let group = {}
        for (let i = 0; i < ny3.length; i++) {
          let groupName = ny3[i];

          group[groupName] = []
          for(groupName in group){

            if(sbd.sortTime.substring(0,4) == groupName){
              group[groupName].push(sbd)
              console.log(sbd.sortTime.substring(0,4),"sbd.sortTime.substring(0,4)___________________________________")
            }
          }
            for (var j = 0; j < st.length; j++) {
              if(sbd.sortTime.substring(0,4) == groupName){
                group[groupName].push(sbd)
              }
            }
//          console.log(group[groupName])
//          console.log(group,"group__________________________________---")
        }

      },
