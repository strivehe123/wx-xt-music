// pages/main-music/index.js
import {getBanner,getSongMenuList} from '../../services/index'
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
import playStore from '../../store/playStore'
import {querySelect} from '../../utils/query-select'
import {throttle} from 'underscore'
const querySelectThrottle=throttle(querySelect,200)
Page({

  data: {
    searchValue:'',
    bannerList:[],
    bannerHeight:150,
    recommendSongs:[],
    hotMenuList:[],
    rectMenuList:[],
     // 巅峰榜数据
     rankingInfos:{},
    //  播放歌曲
    currentSong:{},
    isPlaying:false

  },
  //跳转到搜索详情页
  onSearch(){
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  }, 
  // 获取轮播图
  async fetchSwiperData(){
    const res=await getBanner()
    this.setData({
      bannerList:res.banners
    })
  }, 
  // 图片加载完成后触发的函数
  async onBannerImageLoad(event){
    const res=await querySelectThrottle('.image')
    this.setData({
      bannerHeight:res[0].height
    })
  },
  // 推荐歌曲点击更多
  onRecommendMoreClick(){
    wx.navigateTo({
      url: '/pages/detail-song/index?type=recommend',
    })
  },
  // 处理store的数据变化的监听函数
  handleRecommendSongInfo(value){
    this.setData({recommendSongs:value?.tracks?.slice(0,6)})
  },
  // 获取热门歌单数据
  async fetchHotMenu(){
    const res=await getSongMenuList()
    this.setData({
      hotMenuList:res.playlists
    })
  },
  // 获取推荐歌单
  async fetchRecMenu(){
    const res=await getSongMenuList("华语")
    this.setData({
      rectMenuList:res.playlists
    })
  },
  // 处理原创榜
  handleOriginRanking(value){
    // console.log('原创');/
    const newRankingInfos={...this.data.rankingInfos,originRanking:value}
    this.setData({
      rankingInfos:newRankingInfos
    })
  },
  // 处理新歌榜
  handkeNewRanking(value){
    const newRankingInfos={...this.data.rankingInfos,newRanking:value}
    this.setData({
      rankingInfos:newRankingInfos
    })
  },
  // 处理新锐榜
  handleUpRanking(value){
    const newRankingInfos={...this.data.rankingInfos,upRanking:value}
    this.setData({
      rankingInfos:newRankingInfos
    })
  },
  // song-item-v1 tap handle
  onSongItemTap(event){
    const index=event.currentTarget.dataset.index
    playStore.setState('playSongList',this.data.recommendSongs)
    playStore.setState('playSongIndex',index)
  },
// 播放页数据获取
  handlePlayInfos({currentSong,isPlaying}){
    if(currentSong){
      this.setData({currentSong})
    }
    if(isPlaying!==undefined){
      this.setData({isPlaying})
    }
  },
  // 播放或暂停
  onPlayOrPause(){
    playStore.dispatch('playOrPauseAction')
  },
  // 跳转到播放页
  onPlayBarAlbum(){
    wx.navigateTo({
      url: '/pages/music-player/index',
    })
  },
  onLoad(options) {
    this.fetchSwiperData()
    this.fetchHotMenu()
    this.fetchRecMenu()
    recommendStore.onState('recommendSongInfo',this.handleRecommendSongInfo)
    recommendStore.dispatch('fetchReCommendListData')
    // 获取各种排行榜歌曲
    rankingStore.dispatch("fetchRankingData")
    // 监听原创榜
    rankingStore.onState('originRanking',this.handleOriginRanking)
    // 监听新歌榜
    rankingStore.onState('newRanking',this.handkeNewRanking)
    // 监听新锐榜
    rankingStore.onState('upRanking',this.handleUpRanking)
    // 播放器设置
    playStore.onStates(['currentSong','isPlaying'],this.handlePlayInfos)
    
  },

  onReady() {

  },

  onShow() {

  },


  onHide() {

  },

  onUnload() {
    recommendStore.offState('recommendSongInfo',this.handleRecommendSongInfo)
    rankingStore.offState('originRanking',this.handleOriginRanking)
    rankingStore.offState('newRanking',this.handkeNewRanking)
    rankingStore.offState('upRanking',this.handleUpRanking)
    playStore.offStates(['currentSong','isPlaying'],this.handlePlayInfos)
  },

  onPullDownRefresh() {

  },


  onReachBottom() {

  },

  onShareAppMessage() {

  }
})