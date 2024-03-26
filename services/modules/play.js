import {xt_request} from '../../services/request/index'

// 获取歌曲详情
export function getSongDetail(ids){
  return xt_request.get({
    url:"/song/detail",
    data:{
      ids
    }
  })
}
// 获取歌词信息
export function getSongLyric(id){
  return xt_request.get({
    url:"/lyric",
    data:{
      id
    }
  })
}