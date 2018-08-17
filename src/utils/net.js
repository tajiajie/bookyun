const baseURL = 'https://m.yaojunrong.com'

const net = {
  get (url, data) {
    let token = wx.getStorageSync('token')
    let header = {'Content-Type': 'application/json'}
    if (token) {
      header.token = token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseURL + url,
        data: data,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header, // 设置请求的 header
        success: function (res) {
          // success
          if (res.header.token) {
            // 判断如果存在登录状态的请求头，存起来
            wx.setStorageSync('token', data.header.token)
          }
          // wx.hideLoading()
          resolve(res.data)
        }
        // fail: function (error) {
        //   // fail
        //   reject(error)
        // },
        // complete: function () {
        //   wx.hideLoading()
        //   // complete
        // }
      })
    })
  },
  post (url, data) {
    let token = wx.getStorageSync('token')
    let header = {'Content-Type': 'application/json'}
    if (token) {
      header.token = token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseURL + url,
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: header, // 设置请求的 header
        success: function (res) {
          // success
          if (res.header.token) {
            // 判断如果存在登录状态的请求头，存起来
            wx.setStorageSync('token', data.header.token)
          }
          // wx.hideLoading()
          resolve(res.data)
        }
        // fail: function (error) {
        //   // fail
        //   wx.hideLoading()
        //   reject(error)
        // },
        // complete: function () {
        //   // complete
        //   wx.hideLoading()
        // }
      })
    })
  }
}

export default net

export const login = function () {
  return new Promise(resolve => {
    wx.login({
      success (res) {
        // console.log(res)
        net.post('/login', {
          code: res.code,
          appid: 'wxe6c3679f8f2f6c5c',
          secret: 'b55666bbb0e38e19d4462851e79d3451'
        }).then(data => {
          resolve(data)
          // console.log(data)
        })
      }
    })
  })
}
