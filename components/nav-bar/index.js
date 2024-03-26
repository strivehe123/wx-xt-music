// components/nav-bar/index.js
const app=getApp()
Component({
  options:{
    multipleSlots:true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight:44
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeftTap(){
      this.triggerEvent('onlefttap')
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        statusHeight:app.globalData.statusHeight
      })
    }
  }
})
