import  {xt_request} from '../request/index'
// 获取mv列表
export function getTopMV(offset=0,limit=20){
  return xt_request.get({
    url:'/top/mv',
    data:{
      limit,offset
    }
  })
}
// 获取mv url
export function getMVUrl(id){
  return xt_request.get({
    url:'/mv/url',
    data:{
    id
    }
  })
}
// 获取mv info
export function getMVInfo(mvid){
  return xt_request.get({
    url:'/mv/detail',
    data:{
      mvid
    }
  })
}
// 获取mv的关联的mv
export function getMVRelated(id){
  return xt_request.get({
    url:'/related/allvideo',
    data:{
      id
    }
  })
}