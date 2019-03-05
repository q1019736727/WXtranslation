//logs.js
const util = require('../../utils/util.js')
import config from '../../utils/common.js'
Page({
  data: {
    historyList: wx.getStorageSync(config.history).reverse()
  },
  onLoad: function () {
  },
  onShow:function(){
    this.setData({
      historyList: wx.getStorageSync(config.history).reverse()
    })
  },
  clearHistory(e){
    let arr = this.data.historyList
    arr.splice(e.currentTarget.dataset.index, 1)
    wx.setStorageSync(config.history, arr.reverse())
    this.setData({
      historyList: wx.getStorageSync(config.history).reverse()
    })
  }
})
