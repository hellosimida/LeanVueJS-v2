<template>
    <div class="empty-view-root">
        <!--状态不为加载中和错误时，显示空提示-->
        <div class="empty-content" :class="size" v-show="!loading&&!error">
            <el-image :src="require('@/common/assets/pc/image/ic_empty.png')" class="empty-image"></el-image>
            <div class="mt-10">{{emptyMessage}}</div>
        </div>
        <!--状态为加载中且没有错误-->
        <div class="empty-loading" v-show="loading" v-loading="loading"
             element-loading-background="rgba(0,0,0,0)" element-loaading-background="loading-color"></div>
        <!--错误状态-->
        <div class="empty-error" v-show="error && !loading">
            <div>{{errorMessage}}</div>
            <el-button size="mini" class="mt-2" @click="$emit('reload')">重试</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EmptyView",
        props: {
            size: {
                type: String,
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
    @import "~@/common/assets/pc/style/common.scss";

    .empty-view-root {
        width: 100%;
        height: 100%;
        @include flex-row(center, center);

        line-height: $text-xxl;

        .empty-content {
            @include flex-column(center);
            font-size: $text-lg;
            color: $text-color-grey;

            .empty-image {
                width: 152px;
                height: 128px;
            }


        }

        .empty-content.mini {
            font-size: $text-md;

            .empty-image {
                width: 100px;
                height: 80px;
            }
        }

        .empty-loading {
            width: 68px;
            height: 68px;
        }

        .empty-error {
            @include flex-column(center);
        }
    }
</style>
