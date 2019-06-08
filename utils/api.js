import MD5 from './MD5.js'
const APP_ID = '20190304000273515'
const APP_SECRET = 'XA5NOufMEHMyAEb5btJW'

const URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

const apiRequest = function(word,lang="en",method="GET"){
  let salt = (new Date).getTime()
  let str1 = APP_ID + word + salt + APP_SECRET;
  let sign = MD5(str1)
  return new Promise((resolve,reject)=>{
    wx.request({
      url: URL,
      data: {
        to: lang,
        from: 'auto',
        appid: APP_ID,
        salt: salt,
        q: word,
        sign: sign,
      },
      method: method,
      success: (res) => {
        console.log(res)
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}


export default apiRequest