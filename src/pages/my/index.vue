<template>
  <div>
    <div class="top-box">
      <div class="login">
        <div class="xinxi">
          <open-data type="userAvatarUrl" class="open-data"></open-data>
          <div class="com">
            <open-data class="name" type="userNickName"></open-data>
            <span class="span">这个家伙很懒，什么也没留下</span>
          </div>
        </div>

        <div class="zhu" @click="handleTest">
          <div class="fenlei" @click="handleCollection">
            <span class="num">0</span>
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

    <!-- 需要使用 button 来授权登录 -->
    <div class="btn1">
      <button @click="login" type="primary" :if="canIUse" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" v-if="show">授权登录</button>
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
        show: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    onLoad () {
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头 像昵称
            // this.show = false
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })
          }
        }
      })
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
      handleCollection () {
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      }
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
    margin: 20px auto;
  }
  /*.btn1{*/
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 99;*/
  /*}*/
  .login{
    padding: 0 10px;
  }
  .xinxi{
    display: flex;
  }
  .open-data{
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
