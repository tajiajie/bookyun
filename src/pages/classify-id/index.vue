<template>
  <div>
    <div class="con-box">
      <a :href="'/pages/book/main?id='+ item1._id"  class="link" v-for="item1 in calss" :key="item1">
        <div class="con-book">
          <div class="image">
            <img class="bookmian" :src="item1.img">
          </div>
          <div class="box-right">
            <span class="look">{{item1.title}}</span>
            <div class="content">{{item1.desc}}</div>
            <div class="author">
              <div class="author-left">{{item1.author}}</div>
              <div class="author-right">两天前 前端开发{{item1.looknums}}人在看</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        class: '',
        arr: [],
        pn: 1,
        calss: []
      }
    },
    onLoad (options) {
      // console.log(options)
      this.calss = []
      this.options = options.id
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        mask: true
      })
    },
    onShow () {
      this.pn = 1
      this.getMore()
    },
    methods: {
      getMore () {
        this.$net.get(`/category/${this.options}/books`, {pn: this.pn, size: 5}).then(res => {
          // console.log(res.data)
          this.class = res.data
          this.arr = res.data.books
          this.calss = [...this.calss, ...this.arr]
          // console.log(this.calss)
          if (this.arr.length === 0) {
            wx.showToast({
              title: '已全部加载完成',
              icon: 'none',
              duration: 1000
            })
          }

          wx.setNavigationBarTitle({
            title: this.class.title
          })
        })
      }
    },
    onReachBottom () {
      this.pn = this.pn + 1
      console.log(this.pn)
      this.getMore()
    }
  }
</script>

<style scoped>
  .con-box{
    padding: 0 10px;
  }
  .con-book{
    width: 100%;
    height: 270rpx;
    margin-top: 12rpx;
    margin-bottom: 36rpx;
  }
  .image{
    width: 240rpx;
    height: 270rpx;
    float: left;
    box-shadow:0 0 10px rgba(0, 0, 0, .5);
  }
  .bookmian{
    width: 100%;
    height: 100%;
  }
  .box-right{
    float: right;
    width: 450rpx;
    height: 270rpx;
    overflow: hidden;
  }
  .look{
    color: #000;
    font-size: 14px;
  }
  .content{
    color: #999;
    font-size: 12px;
    padding-top: 10rpx;
    height: 100rpx;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-bottom: 60rpx;
  }
  .author{
    color: #999;
    font-size: 12px;
    bottom: 20rpx;
  }
  .author-left{
    float: left;
  }
  .author-right{
    float: right;
  }
</style>
