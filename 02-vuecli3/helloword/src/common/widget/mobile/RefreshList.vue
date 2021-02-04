<template>
    <van-pull-refresh v-model="innerRefresh" :disabled="disabled" @refresh="onRefresh">
        <van-list v-model="innerLoading"
                  :finished="finished"
                  :error.sync="innerError"
                  v-show="count > 0"
                  :finished-text="finishedText"
                  error-text="请求失败，点击重新加载"
                  @load="onLoad"
                  :style="minHeight">
            <slot></slot>
        </van-list>
        <empty-view :error="innerError" :loading="loading" v-show="count === 0" @reload="onLoad" :style="minHeight">
        </empty-view>
    </van-pull-refresh>
</template>

<script>
    import EmptyView from "./EmptyView";

    export default {
        name: "RefreshList",
        components: {EmptyView},
        props: {
            refreshing: Boolean,
            disabled: Boolean,
            loading: Boolean,
            error: Boolean,
            finished: Boolean,
            finishedText: {
                type: String,
                default: '没有更多数据'
            },
            count: Number, // 数据条数
            offsetHeight: Number, // 偏移高度，计算高度时会减去该值
        },
        data() {
            return {
                innerRefresh: this.refreshing,
                innerLoading: this.loading,
                innerError: this.error,
            }
        },
        watch: {
            refreshing(newVal) {
                if (this.innerRefresh !== newVal) {
                    this.innerRefresh = this.refreshing
                }
            },
            innerRefresh(newVal) {
                if (this.refreshing !== newVal) {
                    this.$emit('update:refreshing', newVal);
                }
            },
            loading(newVal) {
                if (this.innerLoading !== newVal) {
                    this.innerLoading = newVal;
                }
            },
            innerLoading(newVal) {
                if (this.loading !== newVal) {
                    this.$emit('update:loading', newVal);
                }
            },
            error(newVal) {
                if (this.innerError !== newVal) {
                    this.innerError = newVal;
                }
            },
            innerError(newVal) {
                if (this.error !== newVal) {
                    this.$emit('update:error', newVal);
                }
            },
        },
        computed: {
            minHeight() {
                return `min-height:${this.$store.getters.windowHeight - this.offsetHeight}px;`;
            },
        },
        methods: {
            onRefresh() {
                this.innerError = false;
                this.$emit('refresh');
            },
            onLoad() {
                this.innerError = false;
                this.$emit('load');
            }
        }
    }
</script>

<style scoped>

</style>
