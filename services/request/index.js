class XTRequest{
  constructor(base_url){
    this.base_url=base_url
  }
  request(options){
    const {url}=options
    return new Promise((resolve,reject)=>{
      wx.request({
        ...options,
        url: this.base_url+url,
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
 
  get(options){
    return this.request({...options,method:'get'})
  }
  post(options){
    return this.request({...options,method:'post'})
  }
}
export const xt_request=new XTRequest("http://codercba.com:9002")