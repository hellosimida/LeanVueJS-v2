<template>
    <div>迷路了</div>
</template>

<script>
    export default {
        name: "notFound",
        created() {
            this.$router.replace('/');
        }
    }
</script>

<style scoped>

</style>
