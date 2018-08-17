<template>
  <div>
    <div class="" v-for="item in arr" :key="item">
      <img :src="item.img" alt="">
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        arr: []
      }
    },
    mounted () {
      this.$net.get('/collection').then(res => {
        console.log(res)
        this.arr = res.data
      })
    }
  }
</script>

<style scoped>

</style>
