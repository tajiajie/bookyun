<template>
  <div>
    <div class="box">

      <div class="book">

        <div class="con" v-for="(item,index) in more" :key="index" v-if="item.book">

          <div @click="handleJumps(item)">
            <img :src="item.book.img" class="pic">
          </div>

          <div class="bookname">
            {{item.book.title}}
          </div>

        </div>

      </div>

      <div class="morespan">
        <span class="more">
          --------没有更多了--------
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [],
        pn: 1,
        more: []
      }
    },
    methods: {
      getData () {
        this.$net.get('/collection', {pn: this.pn, size: 8}).then(res => {
          this.data = res.data
          console.log(this.data)
          this.more = [...this.more, ...this.data]
          if (this.data.length === 0) {
            wx.showToast({
              title: '已全部加载完成',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      handleJumps (item) {
        wx.navigateTo({
          url: '/pages/book/main?id=' + item.book._id
        })
        // console.log(item.._id)
      }
    },
    onReachBottom () {
      console.log(111)
      this.pn = this.pn + 1
      this.getData()
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped>
  .box{
    padding: 0 10px;
  }
  .book{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .con{
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
  .pic{
    width: 240rpx;
    height: 280rpx;
    box-shadow:0 0 10px rgba(0, 0, 0, .5);
  }
  .bookname{
    color: #333;
    font-size: 12px;
    width: 100px;
    height: 15px;
    overflow: hidden;
    text-align: center;
  }
  .morespan{
    text-align: center;
    margin-top: 15px;
  }
  .more{
    color: #999;
    font-size: 14px;
  }
</style>
