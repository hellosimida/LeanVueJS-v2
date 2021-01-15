<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="">
    <!--顶上搜索框-->
    <van-sticky :offset-top="0">
    <search-vue>
      <template v-slot:searchTitle>
        <form action="/">
          <van-search
              v-model="value"
              show-action
              placeholder="请输入搜索关键词"
              input-align="center"
              @search="onSearch"
              label="地址"
              shape="round"
              background="#ff8e2a"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </form>
      </template>
      <template v-slot:searchCatgory v-if="isOpen">
        <van-grid :column-num="5">
          <van-grid-item v-for="value in 10" :key="value" icon="photo-o" text="文字" />
        </van-grid>
      </template>
      <template v-slot:isOpen>
        <div style="text-align: center"><van-button @click="isOpenClick" type="default">{{message}}</van-button></div>
      </template>
    </search-vue>
    </van-sticky>
    <div>
      <home-content :cmovies="movies"></home-content>
    </div>
  </div>
</template>

<script>
  import SearchVue from '@/components/mobile/home/Search.vue'
  import HomeContent from '@/components/mobile/home/HomeContent.vue'
  import Vue from 'vue'
  import { Search } from 'vant';
  import { Grid, GridItem } from 'vant';
  import { Sticky } from 'vant';
  import { Button } from 'vant';

  Vue.use(Button);
  Vue.use(Sticky);
  Vue.use(Grid);
  Vue.use(GridItem);
  Vue.use(Search);
  export default {
    name: 'Home',
    data(){
      return{
        value: '',
        message: '展开全部分类',
        isOpen: false,
        movies: []
      }
    },
    components: {
      SearchVue,
      HomeContent
    }
    ,
    methods:{
      async init(){
        let response = await Vue.prototype.httpCommunicate.request('/frontend/webHttpServlet','recommend_query',{
          PN:1,
          PS:6,
          ISS:1,
          SV:'ID'
        })
        console.log('=========================='+response.RESULT.RETCODE);
        if (response.RESULT.RETCODE!=0){
          alert(response.RESULT.MESSAGE);
          return;
        }
        this.movies = response.RESULTLIST.REC;
      },
      onSearch(val) {
        console.log(val);
      },
      isOpenClick(){
        if (this.isOpen){//==true时表示收起
          this.isOpen = false;
          this.message = '展开全部分类'
        }else{
          this.isOpen = true;
          this.message = '收起全部分类'
        }
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/mobile/style/vant_reset.scss';
</style>