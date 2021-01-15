<template>
  <div class="content">
    <div class="content-title">
      <div class="content-title-left">分类名称</div>
      <div class="content-title-right">查看更多</div>
    </div>
    <div class="content-info" v-for="movies in cmovies">
      <div class="content-div">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608547804761&di=5b75b7c3c1dbaf528cd728f175305256&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201811%2F18%2F20181118142953_yaktg.thumb.700_0.jpeg"/>
        <div>{{movies.T}}</div>
      </div>
      <div class="content-div">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608547804761&di=5b75b7c3c1dbaf528cd728f175305256&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201811%2F18%2F20181118142953_yaktg.thumb.700_0.jpeg"/>
        <div>aaa</div>
      </div>
    </div>
  </div>
</template>

<script>
  import HomeContentBar from '@/components/mobile/home/HomeContentBar.vue'
  export default {
    name: 'HomeContent',
    components: {
      HomeContentBar
    },
    props: {
      cmovies: {//2.5.17版本后必须这样将default封装成一个函数
        type: Array,
        default(){
          return []
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
      margin-top: 30px;
      .content-div{
        width: 45%;
        text-align: center;
        height: 190px;
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