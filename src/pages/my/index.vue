<template>
  <div>
    <div v-if="!show">
      <div class="top-box">
        <div class="login">
          <div class="xinxi">
            <div class="open-data">
              <img :src="user.avatarUrl">
            </div>
            <div class="com">
              <div class="name">{{user.nickName}}</div>
              <span class="span">这个家伙很懒，什么也没留下</span>
            </div>
          </div>

          <div class="zhu" @click="handleTest">
            <div class="fenlei" @click="handleCollection">
              <span class="num">{{res}}</span>
              <span class="span">收藏</span>
            </div>
            <a href="#" class="fenlei">
              <span class="num">0</span>
              <span class="span">关注</span>
            </a>
            <a href="" class="fenlei">
              <span class="num">0</span>
              <span class="span">粉丝</span>
            </a>
          </div>
        </div>
      </div>
    </div>


    <!-- 需要使用 button 来授权登录 -->
    <div class="btn1">
      <button  type="primary" open-type="getUserInfo" @getuserinfo="GetUserInfo" v-if="show">授权登录</button>
    </div>
  </div>
</template>

<script>
  import {login} from '@/utils/net.js'
  export default {
    data () {
      return {
        show: false,
        res: '',
        classify: '',
        sum: '',
        user: ''
      }
    },
    onLoad () {
      // 查看是否授权
      let other = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头 像昵称
            wx.getUserInfo({
              success: function (res) {
                // console.log(res.userInfo)
                // console.log(other)
                other.user = res.userInfo
              }
            })
          }
        }
      })
    },
    methods: {
      GetUserInfo: function (e) {
        console.log(e)
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          this.user = e.mp.detail.userInfo
          login().then(() => {
            this.getData()
          })
          this.show = false
        }
      },
      // login () {
      //   // wx.login({
      //   //   success: function (res) {
      //   //     console.log(res)
      //   //     // 发起网络请求
      //   //     wx.request({
      //   //       url: 'https://m.yaojunrong.com/login',
      //   //       method: 'POST',
      //   //       header: {
      //   //         'Content-Type': 'application/json'
      //   //       },
      //   //       success (data) {
      //   //         console.log(data)
      //   //         console.log(data.header.Token)
      //   //         wx.setStorageSync('token', data.header.Token)
      //   //       }
      //   //     })
      //   //   }
      //   // })
      //   login()
      //   this.show = false
      // },
      handleCollection () {
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      },
      getData () {
        this.$net.get('/collection').then(res => {
          if (res.code === 401) {
            this.show = true
          }
          this.res = res.data.length
        })
      }
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped>
  .top-box{
    width: 100%;
    height: 120px;
    background: #1296db;
  }
  button{
    width: 200px;
    margin: 200px auto;
  }
  .login{
    padding: 0 10px;
  }
  .xinxi{
    display: flex;
  }
  .open-data img{
    width: 120rpx;
    height: 120rpx;
    display: flex;
    text-align: center;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
  }
  .com{
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .name{
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  .span{
    font-size: 12px;
  }
  .zhu{
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin: 15px auto 10px;
  }
  .num{
    font-weight: 700;
    font-size: 14px;
  }
  .fenlei{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
