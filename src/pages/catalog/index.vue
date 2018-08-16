<template>
  <div>
    <div class="jiazai">
      <img src="/static/Double%20Ring-2.7s-200px.svg" v-if="shows">
    </div>

    <div class="catalog" v-if="!shows">
      <div class="cata-item" v-for="item in msg" :key="item">
        <a :href="'/pages/detail/main?id='+item._id+'&opt='+options">{{item.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options: '',
        msg: [],
        shows: true
      }
    },
    onLoad (options) {
      this.options = options.id
      // wx.showToast({
      //   title: '加载中',
      //   icon: 'loading',
      //   mask: true
      // })
    },
    mounted () {
      this.msg = []
      // console.log(this.options)
      this.$net.get(`/titles/${this.options}`).then(res => {
        // console.log(res.data)
        this.msg = res.data
        this.shows = false
      })
    }
  }
</script>

<style scoped>
  .catalog{
    padding: 0 10px;
  }
.cata-item{
  border-bottom: 1px solid #000;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
}
  .jiazai{
    width: 100%;
    height: 100%;
  }
  .jiazai img{
    margin: 150px 28px;
  }
</style>
