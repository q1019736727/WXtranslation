//index.js
//获取应用实例
import $https from '../../utils/api.js'
import config from '../../utils/common.js'
import eventsHub from '../../utils/eventsHub.js'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    name: '当那个当',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    queryResult:'',
    hiddenclear:true,
    areaText:'',
    currentName: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function (){
    if (app.globalData.langList) {
      let name
      //存在选中
      if (wx.getStorageSync(config.currentIndex)) {
        let index = wx.getStorageSync(config.currentIndex)
        app.globalData.currentSelectLanguage = app.globalData.langList[index].lang
        name = app.globalData.langList[index].chs
      } else {
        app.globalData.currentSelectLanguage = 'en'
        name = app.globalData.langList[0].chs
      }
      this.setData({
        currentName: name
      })
    }
  },
  onLoad: function () {
    eventsHub.on('changeLang',()=>{
      console.log('---', this.data.areaText)
      this.queryWord(this.data.areaText,'single')
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  queryWord(word,type){
    let queryWord
    if (type) {
      this.setData({ hiddenclear: false })
      queryWord = word
    }else{
      if (word.detail.value) {
        this.setData({ hiddenclear: false })
        if (word.detail.value === this.data.areaText){
          return
        }
        queryWord = word.detail.value
        this.setData({ areaText: queryWord })
      }else{
        return
      }
      console.log('---', this.areaText)
    }
    wx.showLoading({
      title: '努力翻译中...',
    })
    $https(queryWord,app.globalData.currentSelectLanguage).then((res) => {
      wx.hideLoading()
      if (res.trans_result) {
        this.setData({ queryResult: res.trans_result[0].dst})
        let array = wx.getStorageSync(config.history) || []
        array.push({
          orign: this.data.areaText,
          query: this.data.queryResult
        })
        wx.setStorageSync(config.history,array)
      }
    })
    
  },
  inputword(el){
    this.setData({ hiddenclear: true })
  },
  clearText(){
    this.setData({ areaText: '', hiddenclear: true})
  },
  toChange(){
    wx.navigateTo({
      url: '../change/change',
    })
  }

})
