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
          <van-grid-item v-for="category in categorys" icon="" text="">{{category.CN}}</van-grid-item>
        </van-grid>
      </template>
      <template v-slot:isOpen>
        <div style="text-align: center"><van-button @click="isOpenClick" type="default">{{message}}</van-button></div>
      </template>
    </search-vue>
    </van-sticky>
    <refresh-list class=""
                  :refreshing.sync="refreshing"
                  :loading.sync="isLoading"
                  :error.sync="isError"
                  finishedText=""
                  :finished="finished"
                  @load="loadHome"
                  @refresh="onRefresh"
                  :offset-height="174"
                  :count="movies.length"
                  :item-height="150">
      <div v-for="cmovies in movies">
        <home-content :cmovies="cmovies"></home-content>
      </div>
    </refresh-list>
  </div>
</template>

<script>
  import SearchVue from '@/components/mobile/home/Search.vue'
  import HomeContent from '@/components/mobile/home/HomeContent.vue'
  import RefreshList from "@/common/widget/mobile/RefreshList";
  import Vue from 'vue'
  export default {
    name: 'Home',
    data(){
      return{
        value: '',
        message: '展开全部分类',
        isOpen: false,
        categorys: [],
        movies: [],
        isLoading: true,
        isError: false,
        finished: false,
        refreshing: false,
        recordCount: 0
      }
    },
    components: {
      SearchVue,
      HomeContent,
      RefreshList
    }
    ,
    methods:{
      async loadData(){
        let response = await Vue.prototype.httpCommunicate.request('/frontend/webHttpServlet','category_query',{
        })
        if (response.RESULT.RETCODE!=0){
          alert(response.RESULT.MESSAGE);
          return;
        }
        this.categorys = response.RESULTLIST.REC;
      },
      async loadHome(){
        this.isLoading = true;
        this.isError = false;
        let response = await Vue.prototype.httpCommunicate.request('/frontend/webHttpServlet','home_query',{
        })
        if (response.RESULT.RETCODE!=0){
          alert(response.RESULT.MESSAGE);
          this.isError = true
          return;
        }
        this.movies = response.RESULTLIST;
        this.recordCount = parseInt(response.RESULT.TC)
        this.finished = this.movies.length >= this.recordCount;
        if(this.finished){
          this.isLoading = false;
          this.refreshing = false;
        }
      },
      onSearch(val) {
        this.$router.push("/home/categoryDetail");
      },
      onRefresh() {
        this.refreshing = true;
        this.categorys = [];
        this.loadHome();
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
      this.loadData();
      this.loadHome();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/mobile/style/vant_reset.scss';
</style>