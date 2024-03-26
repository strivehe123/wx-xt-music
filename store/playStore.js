import {HYEventStore} from 'hy-event-store'
import {parseLyric} from '../utils/parse-lyric'
import { getSongDetail,getSongLyric} from '../services/index'
export const audioContext=wx.createInnerAudioContext()
const playStore=new HYEventStore({
  state:{
    playSongList:[],
    playSongIndex:0,
    id:"",
    currentSong:{},
    currentTime:0,
    durationTime:0,
    lyricInfos:[],
    currentLyricText:'',
    currentLyricIndex:-1,
    isFirstPlay:true,
    isPlaying:false,
    playModeIndex:0, 
  },
  actions:{
    playMusicWithSongId(ctx,id){
      // 清空当前歌曲信息
      ctx.currentSong={}
      ctx.currentTime=0
      ctx.durationTime=0
      ctx.lyricInfos=[]
      ctx.currentLyricText=''
      ctx.currentLyricIndex=0 
     //0 更新页面的歌曲id
     ctx.id=id
     ctx.isPlaying=true
     // 1 获取歌曲详情 
     getSongDetail(id).then(res=>{

       ctx.currentSong=res.songs[0]
       ctx.durationTime=res.songs[0].dt
     })
     // 2 获取歌词信息
     getSongLyric(id).then(res=>{
       
       const lyricString=res.lrc.lyric
       const lyricInfos=parseLyric(lyricString)
       ctx.lyricInfos=lyricInfos
     })
     //  3 播放当前歌曲
     audioContext.stop()
     audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
     audioContext.autoplay=true
     if(ctx.isFirstPlay){
       ctx.isFirstPlay=false
       // 4 播放歌曲 实时监听 当前的播放时间
     
      audioContext.onTimeUpdate(()=>{
        //  获取当前播放时间
        ctx.currentTime=audioContext.currentTime*1000
        // 匹配歌词
        if(!ctx.lyricInfos.length)return
        let index=ctx.lyricInfos.length-1
        for(let i=0; i<ctx.lyricInfos.length-1;i++){
          const currentTime=audioContext.currentTime*1000
          let info=ctx.lyricInfos[i]
          if(info.time>currentTime){
            index=i-1
            break
          }
        }
        if(ctx.currentLyricIndex==index|| index===-1) return
        ctx.currentLyricText=ctx.lyricInfos[index].content
        ctx.currentLyricIndex=index
      })
      // 5  播放的等待播放 和 播放
      audioContext.onWaiting(()=>{
        audioContext.pause()
      })
      audioContext.onCanplay(()=>{
        audioContext.play()
      })
      audioContext.onEnded(()=>{
        // 如果是单曲循环 不切歌
        if(audioContext.loop)return
        //  切歌 todo:
        this.dispatch('playNewSongAction')
      })
     }
    },
    playOrPauseAction(ctx){
      if(ctx.isPlaying){
        audioContext.pause()
        ctx.isPlaying=false
      }else{
        audioContext.play()
        ctx.isPlaying=true
      }
    },
    changePlayMode(ctx){
      // 1 计算当前模式
      let index=ctx.playModeIndex
      index=index+1
      if(index===3)index=0
      // 1.5  设置是否为单曲循环
      if(index===1){
        audioContext.loop=true
      }else{
        audioContext.loop=false
      }
      // 2 保存当前模式
      ctx.playModeIndex=index
    },
    playNewSongAction(ctx,isNext=true){
       // 获取index 和 length
  
      const length=ctx.playSongList.length
      let index=ctx.playSongIndex
      switch(ctx.playModeIndex){
        case 0:
          // 获取最新的索引
          index=isNext?index+1:index-1
          if(index===length)index=0
          if(index===-1)index=length-1
          break
        case 1:
          // 获取最新的索引
          index=isNext?index+1:index-1
          if(index===length)index=0
          if(index===-1)index=length-1
          break
        case 2:
          index=Math.floor(Math.random()*length)
          break    
      }
    
      // 根据索引获取最新的歌曲
      const newSong=ctx.playSongList[index]      
      // 根据id播放歌曲
      this.dispatch('playMusicWithSongId',newSong.id) 
      // 更新存储中的playSongList
      ctx.playSongIndex=index
      }
  }
})
export default playStore