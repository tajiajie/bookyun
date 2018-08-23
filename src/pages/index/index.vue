<template>
  <div class="container">
    <div class="swiper">
        <swiper :indicator-dots="indicator" :autoplay="autoplay" :interval="interval" :duration="duration" class="swipe">
          <block v-for="item in msg" :key="item">
            <div @click="handleJump(item)">
              <!--<a :href="'/pages/book/main?id='+item.book._id">-->
                <swiper-item>
                  <img :src="item.img" class="slide-image"/>
                </swiper-item>
              <!--</a>-->
            </div>
          </block>
        </swiper>
    </div>
    <!--书-->
    <div class="con-box" v-for="(book,index) in classify" :key="book">
      <div class="span">{{book.title}}</div>
      <a :href="'/pages/book/main?id='+ item1._id"  class="link" v-for="(item1,index1) in book.books" :key="item1">
        <div class="con-book">
          <div class="image">
            <img class="bookmian" :src="item1.img">
          </div>
          <div class="box-right">
            <span class="look">{{item1.title}}</span>
            <div class="content">{{item1.desc}}</div>
            <div class="author">
              <div class="author-left">{{item1.author}}</div>
              <div class="author-right">
                <getTime class="time" :time="item1.updateTime"></getTime>
                <span>&nbsp前端开发{{item1.looknums}}人在看</span>
              </div>
            </div>
          </div>
        </div>
      </a>
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
      indicator: true,
      autoplay: true,
      interval: 3000,
      duration: 100,
      msg: [],
      classifys: [],
      pn: 1,
      classify: []
    }
  },
  mounted () {
    this.getData()
    this.$net.get('/swiper').then(res => {
      this.msg = res.data
    })
  },
  methods: {
    getData () {
      this.$net.get('/category/books', {pn: this.pn, size: 2}).then(res => {
        // console.log(res.data)
        this.classifys = res.data
        this.classify = [...this.classify, ...this.classifys]
        if (this.classifys.length === 0) {
          wx.showToast({
            title: '已全部加载完成',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    handleJump (item) {
      wx.navigateTo({
        url: `/pages/book/main?id=` + item.book._id
      })
    }
  },
  onReachBottom () {
    this.pn = this.pn + 1
    // console.log(this.pn)
    this.getData()
  }
}
</script>

<style scoped>
.container{
  padding: 0 10px;
}
.swipe{
  width: 355px;
  height: 150px;
}
.slide-image{
  width: 100%;
  height: 100%;
}
.span{
  font-weight: 700;
  padding-left: 10px;
  border-left: 1px solid #000;
  margin: 10px 0 5px;
  font-size: 20px;
}
.con-book{
  width: 100%;
  height: 130px;
  margin-top: 12px;
}
  .image{
    width: 120px;
    height: 130px;
    float: left;
    box-shadow:0 0 10px rgba(0, 0, 0, .5);
  }
  .bookmian{
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
  }
  .content{
    color: #999;
    font-size: 12px;
    padding-top: 5px;
    height: 50px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-bottom: 30px;
  }
  .author{
    color: #999;
    font-size: 12px;
    bottom: 10px;
  }
  .author-left{
    float: left;
  }
  .author-right{
    float: right;
    display: flex;
    justify-content: flex-end;
  }
</style>
