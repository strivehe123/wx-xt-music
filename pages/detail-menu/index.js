// pages/detail-menu/index.js
import {getSongMenuTag,getSongMenuList} from '../../services/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsMenu:[]
  },
  // 获取数据
  async fetchAllMenuList(){
    // 1 获取所有的tags
    const tagRes= await getSongMenuTag()
    const tags=tagRes.tags
    // 根据tags去获取对应的歌单
    const allPromises=[]
    for(let tag of tags){
      const promise=getSongMenuList(tag.name)
      allPromises.push(promise)
    }
    Promise.allSettled(allPromises).then(res=>{
      const songsMenu=res.filter(item=>item.status==="fulfilled").map(item=>item.value)
      this.setData({
        songsMenu
      })
    })
  },
  // 处理点击跳转
  onMenuItem(event){
    const id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail-song/index?type=menu&id=${id}`,
    })

  },
  onLoad(options) {
    this.fetchAllMenuList()
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