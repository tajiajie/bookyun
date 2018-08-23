<template>
  <div>
    <div class="jiazai">
    <img src="/static/Double%20Ring-2.7s-200px.svg" v-if="shows">
    </div>

    <div class="body" v-if="!shows">
      <div class="book-box">
        <div class="book-top">
          <div class="cou">
            <div class="con-book">
              <div class="image">
                <img :src="res.img" alt="">
              </div>
              <div class="box-right">
                <span class="look">{{res.title}}</span>
                <div class="content">
                  <span class="item">作者：{{res.author}}</span>
                  <span class="item">{{res.looknums}}人在看</span>
                  <span class="item">0人喜欢</span>
                </div>
              </div>
            </div>
          </div>


          <div class="botn">
            <div class="cou">
              <div class="btns">
                <button v-if="show">已添加收藏</button>
                <button class="btn" @click="handleCollect" v-if="!show">加入收藏</button>
                <button class="btn" open-type='share'>分享好友</button>
              </div>

            </div>
          </div>
        </div>

        <!--简介-->
        <div class="introduce">
          <div class="cou">
            <div class="int">简介</div>
            <div class="intro">{{res.desc}}</div>
          </div>
        </div>
        <!--查看目录-->
        <div class="botn view">
          <div class="cou">
            <div class="look-con">查看目录</div>
            <div class="look-tent">共{{mag}}章</div>
            <div class="look-new">
              <span>更新于</span>
              <getTime :time="res.updateTime"></getTime>
            </div>
          </div>
        </div>
        <!--按键-->
        <div class="read">
          <div class="cou">
            <a :href="'/pages/catalog/main?id='+res._id"><button class="read-btn">阅读该书籍</button></a>
          </div>
        </div>
      </div>
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
        shows: true,
        options: '',
        res: {},
        show: false,
        mag: ''
      }
    },
    onLoad (options) {
      this.options = options.id
      // wx.showToast({
      //   title: '加载中',
      //   icon: 'loading',
      //   mask: true
      // })5b6ca00ffeeb050664fe8539
    },
    mounted () {
      this.res = {}
      // console.log(this.options)
      this.$net.get(`/book/${this.options}`).then(res => {
        // console.log(res.data)
        this.res = res.data
        this.shows = false
      })
      this.$net.get(`/titles/${this.options}`).then(res => {
        // console.log(res.data)
        this.mag = res.data.length
      })
    },
    methods: {
      handleCollect () {
        this.$net.post('/collection', {bookId: this.options}).then(res => {
          // console.log(res)
          if (res.code === 401) {
            wx.switchTab({
              url: '/pages/my/main'
            })
          } else if (res.code === 200) {
            wx.showToast({
              title: `${res.msg}`,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: `${res.msg}`,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  body{
    position: relative;
  }
  .jiazai{
    width: 100%;
    height: 100%;
  }
  .jiazai img{
    margin: 150px 28px;
  }
  .cou{
    padding: 0 10px;
  }
  .con-book{
    width: 100%;
    height: 130px;
  }
  .image{
    width: 120px;
    height: 130px;
    float: left;
    box-shadow:0 0 10px rgba(0, 0, 0, .5);
  }
  .image img{
    width: 100%;
    height: 100%;
  }
  .box-right{
    float: right;
    width: 225px;
    height: 130px;
    overflow: hidden;
  }
  .look{
    color: #000;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .content{
    color: #999;
    font-size: 12px;
  }
  .content .item{
    display: block;
    margin: 16px 0;
  }
  .botn{
    border-bottom: 6px solid #E9E9E9;
    width: 100%;
  }
  .btns{
    margin-top: 25px;
    height: 45px;
    display: flex;
    justify-content: space-between;
  }
  .btn{
    border: none;
    border-radius: 5px;
    width: 130px;
    height: 30px;
    background: #E9E9E9;
    font-size: 12px;
    color: #333;
    margin: 0;
  }
  .introduce{
    padding: 15px 0;
    border-bottom: 2px solid #E9E9E9;
  }
  .int{
    font-size: 16px;
    margin-bottom: 25px;
  }
  .intro{
    font-size: 12px;
    color: #999;
  }
  .view{
    margin-top: 18px;
    height: 35px;
  }
  .look-con{
    color: #000;
    font-size: 14px;
    float: left;
    padding-right: 10px;
  }
  .look-tent{
    color: #999;
    font-size: 12px;
    float: left;
  }
  .look-new{
    color: #999;
    font-size: 10px;
    float: right;
    display: flex;
    justify-content: flex-end;
  }
  .read{
    width: 100%;
    border-top: 4px solid #E9E9E9;
    height: 50px;
    position: absolute;
    bottom: 0;
  }
  .read-btn{
    width: 100%;
    border: none;
    background: #409EFE;
    color: #fff;
    font-size: 12px;
    margin-top: 10px;
  }
</style>
