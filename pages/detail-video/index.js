// pages/detail-video/index.js
import {getMVUrl,getMVInfo,getMVRelated,getTopMV} from '../../services/modules/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    mvUrl:'',
    mvInfo:{},
    relatedVideo:[]

  },
  // 获取mv的src
  async fetchMVSrc(){
    const res=await getMVUrl(this.data.id)
    
    this.setData({
      mvUrl:res.data.url
    })
  },
    // 获取mv的详情数据
    async fetchMVDetail(){
      const res=await getMVInfo(this.data.id)
      this.setData({
        mvInfo:res.data
      })
    },
    // 获取mv的相关的mv数据
    async fetchMVRelated(){
      // const res=await getMVRelated(this.data.id)
      // 替代方案
      const res=await getTopMV(10,5)
      this.setData({
        relatedVideo:res.data
      })
    },
  // 获取mv相关信息
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    // 获取videoSRC
    this.fetchMVSrc()
    // 获取video的详情数据
    this.fetchMVDetail()
    // 获取mv的相关的mv数据
    this.fetchMVRelated()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})