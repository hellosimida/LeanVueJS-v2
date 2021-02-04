<template>
    <div class="date-range-picker">
        <van-field readonly clickable v-model="startDateLabel" input-align="center" placeholder="开始日期"
                   @click="()=>{this.startDatePicker = true;this.endDatePicker=false}"></van-field>
        <span class="ph-1">至</span>
        <van-field readonly clickable v-model="endDateLabel" input-align="center" placeholder="结束日期"
                   @click="()=>{this.startDatePicker = false;this.endDatePicker=true}"></van-field>

        <!--开始时间-->
        <van-popup v-model="startDatePicker" position="bottom" :overlay="false">
            <van-datetime-picker type="date" @cancel="startDatePicker = false"
                                 :min-date="startMinDate"
                                 :max-date="startMaxDate"
                                 @confirm="startDateSelected"></van-datetime-picker>
        </van-popup>
        <!--结束时间-->
        <van-popup v-model="endDatePicker" position="bottom" :overlay="false">
            <van-datetime-picker type="date" @cancel="endDatePicker = false"
                                 :min-date="endMinDate"
                                 :max-date="endMaxDate"
                                 @confirm="endDateSelected"></van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
    import DateFormat from "@/common/util/DateFormat";

    let today = new Date();

    export default {
        name: "DateRangePicker",
        props: {
            startDate: {
                type: Date,
                default: today
            },
            endDate: {
                type: Date,
                default: today
            }
        },
        data() {

            return {
                //日期
                startDatePicker: false,
                endDatePicker: false,
            }
        },
        computed: {
            //开始日期,格式化后
            startDateLabel() {
                if (!this.startDate) {
                    return '';
                }
                return DateFormat.dateFormat('YYYY-mm-dd', this.startDate);
            },
            //结束日期,格式化后
            endDateLabel() {
                if (!this.endDate) {
                    return '';
                }
                return DateFormat.dateFormat('YYYY-mm-dd', this.endDate);
            },
            startMinDate() {
                return new Date(this.startMaxDate.getFullYear(), this.startMaxDate.getMonth() - 1, this.startMaxDate.getDate());
            },
            startMaxDate() {
                return this.endDate ? this.endDate : today;
            },
            endMinDate() {
                return this.startDate ? this.startDate : new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            },
            endMaxDate() {
                return new Date(this.endMinDate.getFullYear(), this.endMinDate.getMonth() + 1, this.endMinDate.getDate());
            }
        },
        methods: {
            startDateSelected(date) {
                this.$emit('update:startDate', date);
                this.startDatePicker = false;
            },
            endDateSelected(date) {
                this.$emit('update:endDate', date);
                this.endDatePicker = false;
            },
            /**
             * 隐藏所有弹窗
             */
            hidePicker(){
                this.startDatePicker = false;
                this.endDatePicker = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/common/assets/mobile/style/common.scss";

    .date-range-picker {
        @include flex-row(center);
    }
</style>
