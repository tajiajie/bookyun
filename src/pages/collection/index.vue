<template>
  <div>
    <div class="box">

      <div class="book">

        <div class="con" v-for="(item,index) in data" :key="index" v-if="item.book">

          <div>
            <img :src="item.book.img" class="pic">
          </div>

          <div class="bookname">
            {{item.book.title}}
          </div>

        </div>

      </div>

      <div class="morespan">
        <span class="more">
          ------没有更多了------
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: []
      }
    },
    methods: {
      getData () {
        this.$net.get('/collection').then(res => {
          this.data = res.data
          // console.log(this.data)
        })
      }
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
    width: 110px;
    height: 120px;
    box-shadow:0 0 10px rgba(0, 0, 0, .5);
  }
  .bookname{
    color: #333;
    font-size: 12px;
    width: 100px;
    height: 15px;
    overflow: hidden;
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
