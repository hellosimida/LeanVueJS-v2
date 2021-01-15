<template>
    <div>
        <div style="padding-bottom: 50px"><router-view/></div>
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
    import MainTabBar from '@/components/mobile/maintabbar/MainTabBar.vue'
    export default {
        name: "mainPage",
        components: {
          MainTabBar
        }
    }
</script>

<style lang="scss" scoped>

</style>
