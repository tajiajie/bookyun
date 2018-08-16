import Vue from 'vue'
import App from './App'
import net from '@/utils/net'

Vue.prototype.$net = net
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/book/main', 'pages/catalog/main', 'pages/detail/main', 'pages/read/main', 'pages/my/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#1296db',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/首页.png',
        selectedIconPath: '/static/首页1.png'
      },
      {
        pagePath: 'pages/read/main',
        text: '我的阅读',
        iconPath: '/static/阅读.png',
        selectedIconPath: '/static/阅读1.png'
      },
      {
        pagePath: 'pages/my/main',
        text: '个人中心',
        iconPath: '/static/个人中心.png',
        selectedIconPath: '/static/个人中心1.png'
      }]
    }
  }
}
