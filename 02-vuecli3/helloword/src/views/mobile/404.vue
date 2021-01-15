<template>
    <div>好像迷路了</div>
</template>

<script>
    export default {
        name: "notFound",
        created(){
            // 重定向到首页
            this.$router.replace('/').catch();
        }
    }
</script>

<style scoped>

</style>
