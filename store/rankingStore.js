import {HYEventStore} from 'hy-event-store'
import {getPlaylist} from '../services/index'
const rankingMap={newRanking:3779629,originRanking:2884035,upRanking:19723756}
const rankingStore=new HYEventStore({
  state:{
    newRanking:{},
    originRanking:{},
    upRanking:{}
  },
  actions:{
    fetchRankingData(ctx){
      const promiseList=[]
      for(let key in rankingMap){
        const id=rankingMap[key]
        promiseList.push(getPlaylist(id))
      }
      Promise.allSettled(promiseList).then(playload=>{
        playload.forEach(res=>{
          if(res.status==="fulfilled"){
            
            const key=res.value.playlist.id
            const playlist=res.value.playlist
            if(key==3779629){
              ctx.newRanking=playlist
            }else if(key ==2884035){
              ctx.originRanking=playlist
            }else{
              ctx.upRanking=playlist
            }
          }
        })
       
      })
    }
  }
})
export default rankingStore