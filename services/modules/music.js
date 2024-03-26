import  {xt_request} from '../request/index'
// 获取mv列表
export function getBanner(){
  return xt_request.get({
    url:'/banner',
    data:{
      type:1
    }
  })
}
// 获取 推荐歌曲
export function getPlaylist(id){
  return xt_request.get({
    url:'/playlist/detail',
    data:{
      id
    }
  })
}
// 获取热门歌曲
export  function getSongMenuList(cat="全部",limit=6,offset=0){
  return xt_request.get({
    url:"/top/playlist",
    data:{
      cat,
      limit,
      offset
    }
  })
}
// 
export function getSongMenuTag(){
  return xt_request.get({
    url:"/playlist/hot"
  })
}