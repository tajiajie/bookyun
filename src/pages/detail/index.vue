<template>
  <div>
    <!--<div class="show">-->
      <!--<img src="/static/Double%20Ring-2.7s-200px.svg" alt="" v-if="isShows">-->
    <!--</div>-->

    <div>
      <div class="content">
        <div :style="fontSize">
          <wemark :md="res.content" link highlight type="rich-text"></wemark>
        </div>
      </div>

      <div class="bian">
        <div class="iconfont icon-shangyiye item" @click="handleShang"></div>
        <div class="iconfont icon-mulu item" @click="handleMenu"></div>
        <div class="item" @click="handleAdd">A+</div>
        <div class="item" @click="handleJian">A-</div>
        <div class="iconfont icon-xiayiye item" @click="handleXia"></div>
      </div>

      <div class="yinying" v-show="isShow" @click="handleShou"></div>
      <div id="box" :style="{transform: 'translateX(' + trans + ')'}">
        <div class="cata-item" v-for="item in msg" :key="item">
          <!--<a :href="'/pages/detail/main?id='+item._id+'&opt='+option">{{item.title}}</a>-->
          <div @click="handleMulu(item)">{{item.title}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // isShows: true,
        res: {},
        fontSize: '',
        num: 100,
        isShow: false,
        msg: [],
        options: '',
        option: '',
        trans: '',
        titles: [],
        arr: '',
        Promise: {},
        title: ''
      }
    },
    onLoad (options) {
      console.log(this.options)
      this.options = options.id
      this.option = options.opt
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        mask: true
      })
    },
    mounted () {
      this.fOo()
      this.getData()
    },
    methods: {
      getData () {
        this.res = {}
        this.$net.get(`/article/${this.options}`).then(res => {
          // this.isShows = false
          this.res = res.data.article
        })
      },
      async fOo () {
        const title = await this.$net.get(`/titles/${this.option}`)
        this.msg = title.data
      },
      handleAdd () {
        this.num = this.num + 6
        if (this.num <= 166) {
          this.fontSize = `font-size : ${this.num}%`
        } else {
          this.num = 166
          this.fontSize = `font-size : ${this.num}%`
        }
      },
      handleJian () {
        this.num = this.num - 6
        if (this.num >= 88) {
          this.fontSize = `font-size : ${this.num}%`
        } else {
          this.num = 88
          this.fontSize = `font-size : ${this.num}%`
        }
      },
      handleShou () {
        this.isShow = false
        this.trans = '-320px'
      },
      handleMenu () {
        this.trans = '320px'
        this.isShow = !this.isShow
      },
      handleShang () {
        this.arr = this.msg.findIndex(val => val._id === this.options)
        this.arr = this.arr - 1
        // console.log(this.arr)
        if (this.arr < 0) {
          wx.showToast({
            title: '没有上一篇了',
            icon: 'none',
            duration: 2000
          })
          this.arr = 0
        }
        this.options = this.msg[this.arr]._id
        // console.log(this.opton)
        this.res = {}
        this.$net.get(`/article/${this.options}`).then(res => {
          // console.log(this.options)
          // console.log(this.arr)
          this.res = res.data.article
        })
      },
      handleXia () {
        this.arr = this.msg.findIndex(val => val._id === this.options)
        this.arr = this.arr + 1
        if (this.arr > this.msg.length - 1) {
          wx.showToast({
            title: '没有下一篇了',
            icon: 'none',
            duration: 2000
          })
          this.arr = this.msg.length - 1
        }
        this.options = this.msg[this.arr]._id
        this.res = {}
        this.$net.get(`/article/${this.options}`).then(res => {
          // console.log(this.options)
          this.res = res.data.article
        })
      },
      handleMulu (item) {
        this.options = item._id
        this.$net.get(`/article/${this.options}`).then(res => {
          this.res = res.data.article
          this.isShow = false
          this.trans = '-320px'
          // console.log(item._id)
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/iconfont.css";
  body {
    position: relative;
  }
.content{
  padding: 0 10px;
}
.bian{
  width: 100%;
  height: 10%;
  border-top: 2px solid #E9E9E9;
  position: fixed;
  bottom: 0;
  font-size: 18px;
  display: flex;
  background: #fff;
}
  .item {
    flex: 1;
    text-align: center;
    line-height: 50px;
    z-index: 88;
  }
  .yinying{
    background-color: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
  }
  #box{
    transition: transform .2s ease;
    width: 320px;
    height: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: -320px;
    z-index: 100;
    overflow: scroll;
  }
  .cata-item{
    border-bottom: 1px solid #000;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .cata-item:hover{
    background: #e9e9e9;
  }
</style>
