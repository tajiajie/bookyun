<template>
  <div>
    <div v-if="!isShow">
      <div class="jiazai">
        <img src="/static/Double%20Ring-2.7s-200px.svg" v-if="shows">
      </div>

      <div class="body" v-if="!shows">
        <div class="my-read" v-for="(item,index) in readlist" :key="index">
          <div class="left-box">
            <img :src="item.book.img">
          </div>

          <div class="right-box">
            <div class="book-title">{{item.book.title}}</div>
            <div class="zhangjie">书籍{{item.title.index}}/{{item.title.total}}章节</div>
            <div class="progress-box">
              <progress class="progress" :percent="item.percent" :active="true" stroke-width="4" activeColor="#1296db" backgroundColor="#8a8a8a" /><span>已看{{item.percent}}%</span>
            </div>
            <div class="look">
              <span>上次查看：{{item.title.title}}</span>
              <span>
              <getTime :time="item.updatedTime"></getTime>
            </span>
            </div>
            <div class="btn">
              <button @click="handleJump(item)">继续阅读</button>
              <button @click="handleJumpss(item)">查看文档</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="login" v-if="isShow">
      <div class="login1">您还没有登录</div>
      <button class="tran" @click="handleTren">
        请点击，跳转至登录页面
      </button>
    </div>
  </div>

</template>

<script>
  import getTime from '@/components/time'
  export default {
    components: {
      getTime
    },
    data () {
      return {
        readlist: [],
        shows: true,
        isShow: false
      }
    },
    methods: {
      getData () {
        this.$net.get('/readList').then(res => {
          // console.log(res)
          if (res.code === 401) {
            this.isShow = true
          } else {
            this.isShow = false
          }
          this.shows = false
          this.readlist = res.data.map(item => {
            item.percent = Math.ceil(item.title.index / item.title.total * 100)
            return item
          })
        })
      },
      handleJump (item) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item.title._id + '&opt=' + item.book._id
        })
        // console.log(item.title._id)
        // console.log(item.book._id)
      },
      handleJumpss (item) {
        wx.navigateTo({
          url: '/pages/book/main?id=' + item.book._id
        })
        // console.log(item.._id)
      },
      handleTren () {
        wx.switchTab({
          url: '/pages/my/main'
        })
      }
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped>
  .jiazai{
    width: 100%;
    height: 100%;
  }
  .jiazai img{
    margin: 150px 28px;
  }
  .body{
    padding: 0 10px;
  }
  .my-read{
    display: flex;
    margin-top: 4px;
    margin-bottom: 12px;
  }
  .left-box{
    flex: 1;
    width: 120px;
    height: 130px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    margin-right: 10px;
  }
  .left-box img{
    width: 120px;
    height: 130px;
  }
  .right-box{
    width: 620px;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    color: #999;
  }
  .book-title{
    font-size: 12px;
    color: #333;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .zhangjie{
    margin-bottom: 10px;
  }
  .progress-box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .progress{
    width: 70%;
  }
  .look{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .btn{
    display: flex;
    justify-content: space-between;
  }
  button{
    width: 80px;
    height: 30px;
    background-color: #e5e5e5;
    color: #666;
    font-size: 12px;
    margin: 0;
  }
  button:hover{
    background-color: #f1f1f1;
    color: #333;
  }
  .login{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
  }
  .login1{
    margin-bottom: 20px;
    font-size: 16px;
  }
  .tran{
    width: 200px;
    height: 40px;
    font-size: 16px;
  }
</style>
