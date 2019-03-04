const URL = 'https://fanyi.baidu.com/transapi'

const apiRequest = function(word,lang="en",method="GET"){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `https://fanyi.baidu.com/transapi`,
      data: {
        from: 'auto',
        to: lang,
        dataType: 'json',
        query: word
      },
      method: method,
      success: (res) => {
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