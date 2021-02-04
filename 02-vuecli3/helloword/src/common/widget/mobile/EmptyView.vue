<template>
    <div class="empty-view-root">
        <!--状态不为加载中和错误时，显示空提示-->
        <div class="empty-content" :class="size" v-show="!loading&&!error">
            <van-image :src="require('@/common/assets/mobile/image/ic_empty.png')" class="empty-image"></van-image>
            <div class="mt-3">{{emptyMessage}}</div>
        </div>
        <!--状态为加载中且没有错误-->
        <van-loading class="empty-loading" v-show="loading">加载中</van-loading>
        <!--错误状态-->
        <div class="empty-error" v-show="error && !loading">
            <div>{{errorMessage}}</div>
            <van-button @click="$emit('reload')" style="background-color: transparent;">点击重试</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EmptyView",
        props: {
            size: {
                type:String,
                default: ''
            },
            loading: Boolean,
            error: Boolean,
            emptyMessage: {
                type: String,
                default: '暂无数据'
            },
            errorMessage: {
                type: String,
                default: '加载失败，请重试'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/common/assets/mobile/style/common.scss";

    .empty-view-root {
        width: 100%;
        height: 100%;
        @include flex-row(center, center);

        line-height: $text-xxl;
        .empty-content {
            @include flex-column(center);
            font-size: $text-md;
            color: $text-color-grey;

            .empty-image{
                width: 100px;
                height: 82px;
            }


        }
        .empty-loading{
            color: $text-color-grey;
        }


        .empty-error {
            @include flex-column(center);
        }
    }
</style>
