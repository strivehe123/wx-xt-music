// components/menu-area/index.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    },
    menuList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth:375
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMenuMoreClick(){
      wx.navigateTo({
        url: '/pages/detail-menu/index',
      })
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        screenWidth:app.globalData.screenWidth
      })
    }
  }
})
