// pages/change/change.
import config from '../../utils/common.js'
import eventsHub from '../../utils/eventsHub.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    langlist: app.globalData.langList,
    currentIndex: wx.getStorageSync(config.currentIndex) || 0
  },
  changeLang(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    //本地储存选中语言
    wx.setStorageSync(config.currentIndex, e.currentTarget.dataset.index)
    app.globalData.currentSelectLanguage = app.globalData.langList[e.currentTarget.dataset.index].lang
    eventsHub.emit('changeLang')
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentIndex: wx.getStorageSync(config.currentIndex) || 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})