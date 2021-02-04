<template>
  <div class="content">

    <div class="content-title">
      <div class="content-title-left">{{cmovies.obj.CN}}</div>
      <div class="content-title-right" @click="viewMore(cmovies.obj.CID)">查看更多</div>
    </div>
    <div class="content-info" v-for="(movies,index) in cmovies.REC">
      <div class="content-div" v-if="index%2==0">
        <div><img :src="cmovies.REC[index].FAP"/></div>
        <div>{{cmovies.REC[index].T | ellipsis}}</div>
      </div>
      <div class="content-div" v-if="index%2==0">
        <div><img :src="cmovies.REC[index].FAP"/></div>
        <div>{{cmovies.REC[index+1].T | ellipsis}}</div>
      </div>
    </div>


  </div>
</template>

<script>

  export default {
    name: 'HomeContent',
    components: {

    },
    data() {
      return {

      }
    },
    props: {
      cmovies: {//2.5.17版本后必须这样将default封装成一个函数
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      viewMore(categoryID){
        console.log(categoryID);
      }
    }
    ,
    filters: {
      ellipsis(value){
        if (!value){
          return "";
        }

        if(value.length > 9){
          return value.slice(0,8)+'...';
        }else {
          return value;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    margin: 10px 10px 10px 10px;
    .content-info{
      display: flex;
      margin-top: 15px;
      .content-div{
        width: 45%;
        text-align: center;
        height: 200px;
        margin-left: 4%;
        margin-right: 4%;

        img {
          height: 190px;
          width: 100%;
        }
      }
    }
    .content-title{
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 4%;
      display: flex;
      justify-content: space-between;
      overflow: auto;

      .content-title-left{
        float: left;
      }
      .content-title-right{
        float: right;
        margin-right: 4%;
      }
    }
  }
</style>