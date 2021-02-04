<template>
    <keep-alive include="mainPage">
        <router-view/>
    </keep-alive>
    <!--<router-view/>-->
</template>

<script>
    import { Dialog } from 'vant';
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
</style>
