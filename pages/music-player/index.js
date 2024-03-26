import {getSongDetail,getSongLyric} from '../../services/index'
import {throttle} from 'underscore'
import playStore,{audioContext} from '../../store/playStore'
import {parseLyric} from '../../utils/parse-lyric'
const app=getApp()

const modeNames=['order','repeat','random']
Page({
  data:{
      //  当前页
    currentPage:0,
    // currentHeight
    currentHeight:100,
    pageTitles:['歌曲','歌词'],
    // 滑块
    slideValue:0,
    isSlideChanging:false,
    lyricScrollTop:0,
    // 歌曲id
    id:"",
    // 当前歌曲详情
    currentSong:{},
    // 歌词信息
    lyricInfos:[],
    // 歌曲总时长 当前播放时间
    currentTime:0,
    durationTime:0,
     // 歌词
     currentLyricText:'',
     currentLyricIndex:-1,
    isWaiting:false,
    isPlaying:true,
    // 当前播放歌曲 
    playSongList:[],
    playSongIndex:0,
    // 是否时首次播放
    isFirstPlay:true,
    // 播放模式 0顺序播放 1单曲循环 2 随机播放
    playModeIndex:0, 
    // 播放模式的图片名称
    playModeName:'order',
    // status keys
    stateKeys:['id','currentSong','currentTime','durationTime','lyricInfos','currentLyricText','currentLyricIndex','isPlaying','playModeIndex']
  },
  // 点击返回
  navbarTap(){
    wx.navigateBack()
  },
  // 页面切换
  onSwiperChange(event){
    this.setData({currentPage:event.detail.current})
  },
  // tab标签切换
  onTabTap(event){
    this.setData({currentPage:event.target.dataset.index})
  },
  // 滑块点击
  onSlideChange(event){
    this.data.isWaiting=true
    setTimeout(()=>{
      this.data.isWaiting=false
    },1500)
    // 1 获取滑块的值
    const value=event.detail.value
    // 2 计算当前的播放时间
    const currentTime=value/100*this.data.durationTime
    // 3 播放器 到当前时间播放
    audioContext.seek(currentTime/1000)
    // 设置页面的响应数据
    this.setData({currentTime,slideValue:value,isSlideChanging:false,isPlaying:true})
  },
  onSlideChanging(event){
     // 1 获取滑块的值
     const value=event.detail.value
     // 2 计算当前的播放时间
     const currentTime=value/100*this.data.durationTime
     //  3 设置页面的响应数据
     this.setData({currentTime})
    //  4 当前正在滑动
    this.data.isSlideChanging=true
  },
  // 播放音乐时间实时更新
  updateProgress:throttle(function(currentTime){
    // 2 修改slideValue
    const slideValue=currentTime/this.data.durationTime * 100
    this.setData({slideValue,currentTime})
  },200,{leading:true,trailing:false})  ,
  // 播放或暂停
  onPlayOrPause(){
   playStore.dispatch('playOrPauseAction')
  },
  // 处理播放存储的数据
  handlePlayStore({playSongList,playSongIndex}){
    if(playSongList){
      this.setData({playSongList})
    }
    if(playSongIndex!==undefined){
      this.setData({playSongIndex})
    }
  },
  // 上一曲
  onPrevTap(){
    playStore.dispatch('playNewSongAction',false)
  },
  // 下一曲
  onNextTap(){
    playStore.dispatch('playNewSongAction')
  },
  // 切换播放模式
  onPlayMode(){
    playStore.dispatch('changePlayMode')
  },
  // 处理播放数据 存在存储中
  handlePlayInfos({id,currentSong,durationTime,currentTime,lyricInfos,currentLyricText,currentLyricIndex,isPlaying,playModeIndex}){
    if(id!==undefined){
      this.setData({id})
    }
    if(currentSong){
      this.setData({currentSong})
    }
    if(durationTime!==undefined){
      this.setData({durationTime})
    }
    if(currentTime!==undefined){
      this.updateProgress(currentTime)
    }
    if(lyricInfos){
      this.setData({lyricInfos})
    }
    if(currentLyricText){
      this.setData({currentLyricText})
    }
    if(currentLyricIndex!==undefined){
      this.setData({currentLyricIndex,lyricScrollTop:currentLyricIndex*36})
    }
    if(isPlaying!==undefined){
      this.setData({isPlaying})
    }
    if(playModeIndex!==undefined){
      this.setData({playModeName:modeNames[playModeIndex]})
    }
  },
  onLoad(options){
    // 1 设置设备信息
    this.setData({currentHeight:app.globalData.contentHeight})
    // 2 获取歌曲id
    const id=options.id
    if(id){
      playStore.dispatch("playMusicWithSongId",id)
    }
    playStore.onStates(['playSongList','playSongIndex'],this.handlePlayStore)
    playStore.onStates(this.data.stateKeys,this.handlePlayInfos)
  },
  onUnload(){
    playStore.offStates(['playSongList','playSongIndex'],this.handlePlayStore)
    playStore.offStates(this.data.stateKeys,this.handlePlayInfos)
  }
})