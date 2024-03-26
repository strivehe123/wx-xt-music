// pages/detail-song/index.js
import recommendStore from '../../store/recommendStore'
import rankingStore from  '../../store/rankingStore'
import playStore from '../../store/playStore'
import {getPlaylist} from '../../services/index'
Page({

  data: {
    songInfo:{},
    type:"ranking",
    key:"newRanking",
    id:"",
  },
  // 处理推荐歌曲和巅峰榜
  handleRanking(value){
    if(this.data.type==="recommend"){
      value.name="推荐歌曲"
    }
    this.setData({
      songInfo:value
    })
    wx.setNavigationBarTitle({
      title: value.name
    })
  },
  // 处理歌单跳转过来的
  async fetchMenuSong(){  
    const res=await getPlaylist(this.data.id)
    this.setData({
      songInfo:res.playlist
    })
  },
  // 点击 song-item-v2 handle
  onSongItemTap(event){
    const index=event.currentTarget.dataset.index
    playStore.setState('playSongList',this.data.songInfo.tracks)
    playStore.setState('playSongIndex',index)    
  },
  onLoad(options) {
    const type=options.type
    this.setData({type})
    // 如果是巅峰榜点击跳转过来
    if(type==='ranking'){
      const key=options.key
      this.data.key=key
      rankingStore.onState(key,this.handleRanking)
    }else if(type==="recommend"){
    //  如果是推荐歌曲点击过来
      recommendStore.onState("recommendSongInfo",this.handleRanking)
    }else if(type==='menu'){
      // 如果是歌单跳转过来的
      const id=options?.id
      this.data.id=id
      this.fetchMenuSong()
    }
   
  },

  onReady() {

  },
  onShow() {

  },

  onHide() {

  },

  onUnload() {
    if(this.data.type==="ranking"){
      rankingStore.offState(this.data.key,this.handleRanking)
    }else if(this.data.type==="recommend"){
      recommendStore.offState("recommendSongInfo",this.handleRanking)
    }
  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})