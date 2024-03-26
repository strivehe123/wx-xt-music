import {HYEventStore} from 'hy-event-store'
import {getPlaylist} from '../services/index'
const recommendStore=new HYEventStore({
  state:{
    recommendSongInfo:{}
  },
  actions:{
    async fetchReCommendListData(ctx){
      const res=await getPlaylist(3778678)
      ctx.recommendSongInfo=res.playlist
    }
  }
})
export default recommendStore