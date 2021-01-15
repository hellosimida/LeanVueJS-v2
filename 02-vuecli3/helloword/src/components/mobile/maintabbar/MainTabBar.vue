<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <img src="@/assets/mobile/img/tabbar/home.png"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/mobile/img/tabbar/home-active.png"/>
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/shop">
      <template v-slot:item-icon>
        <img src="@/assets/mobile/img/tabbar/shop.png"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/mobile/img/tabbar/shop-active.png"/>
      </template>
      <template v-slot:item-text>
        <div>商城</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/storecar">
      <template v-slot:item-icon>
        <img src="@/assets/mobile/img/tabbar/storecar.png"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/mobile/img/tabbar/storecar-active.png"/>
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/user">
      <template v-slot:item-icon>
        <img src="@/assets/mobile/img/tabbar/user.png"/>
      </template>
      <template v-slot:item-icon-active>
        <img src="@/assets/mobile/img/tabbar/user-active.png"/>
      </template>
      <template v-slot:item-text>
        <div>用户</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from '@/components/mobile/tabbar/TabBar.vue'
  import TabBarItem from '@/components/mobile/tabbar/TabBarItem.vue'
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/mobile/css/base.scss';
  @import "~@/assets/mobile/css/tabbar.scss";
</style>