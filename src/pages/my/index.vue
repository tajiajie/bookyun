<template>
  <div>
    <div class="login">
      <open-data type="userAvatarUrl" class="open-data-class"></open-data>
      <open-data class="name" type="userNickName"></open-data>
      <!-- 需要使用 button 来授权登录 -->
      <button @click="login" type="primary" class="btn1" :if="canIUse" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" v-if="show">授权登录</button>
    </div>

    <!--<div>-->
      <!--<button @click="postData">1111</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {login} from '@/utils/net.js'
  export default {
    data () {
      return {
        show: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    methods: {
      login () {
        // wx.login({
        //   success: function (res) {
        //     console.log(res)
        //     // 发起网络请求
        //     wx.request({
        //       url: 'https://m.yaojunrong.com/login',
        //       method: 'POST',
        //       header: {
        //         'Content-Type': 'application/json'
        //       },
        //       success (data) {
        //         console.log(data)
        //         console.log(data.header.Token)
        //         wx.setStorageSync('token', data.header.Token)
        //       }
        //     })
        //   }
        // })
        login()
      },
      // postData () {
      //   this.$net.get('/collection').then(res => {
      //     console.log(res)
      //   })
      // },
      onLoad () {
        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头 像昵称
              this.show = false
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  button{
    width: 200px;
    margin: 20px auto;
  }
  .btn1{
    margin-top: 250px;
  }
  .login{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .open-data-class{
    width: 130rpx;
    height: 130rpx;
    display: flex;
    text-align: center;
    overflow: hidden;
    border-radius: 50%;
  }
  .name{
    font-size: 14px;
  }
</style>
