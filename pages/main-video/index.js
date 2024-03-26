// pages/main-video/index.js
import {getTopMV} from '../../services/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mv 列表
    videoList:[],
    // 偏移量
    offset:0,
    // 是否还有数据
    hasMore:true
  },
  // 获取mv数据
  async getVideoList(){
    const res=await getTopMV(this.data.offset)
    const new_list=[...this.data.videoList,...res.data]
    // 更新列表数据
    this.setData({
      videoList:new_list
    })
    // 更新偏移量
    this.data.offset=this.data.videoList.length
    // 更新是否还有数据
    this.data.hasMore=res.hasMore
  },
  // 点击跳转
  onVideoItemTap(event){
    const item=event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${item.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoList()
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
  async onPullDownRefresh() {
    this.setData({
      videoList:[]
    })
    this.data.offset=0
    this.data.hasMore=true
    await this.getVideoList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(!this.data.hasMore)return
    this.getVideoList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})