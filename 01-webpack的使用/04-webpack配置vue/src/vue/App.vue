<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <button @click="btnClick()">°´Å¥</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        message: 'hello world'
      }
    },
    methods: {
      btnClick(){
        console.log("btnClick")
      }
    }
  }
</script>

<style scoped>
  .title{
    color: green;
  }
</style>