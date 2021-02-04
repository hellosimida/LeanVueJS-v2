<template>
    <el-date-picker v-model="selectedDates" type="daterange" size="small" :value-format="valueFormat"
                    :editable="false" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder"
                    :range-separator="rangeSeparator" unlink-panels :picker-options="pickerOptions"
                    @blur="onDatePickerBlur">
    </el-date-picker>
</template>

<script>
    // 范围日期选择器
    export default {
        name: "DateRangePicker",
        model: {
            prop: 'dates',
            event: 'dateChanged'
        },
        props: {
            dates: {
                type: Array,
                default: null
            },
            valueFormat: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            startPlaceholder: {
                type: String,
                default: '开始日期'
            },
            endPlaceholder: {
                type: String,
                default: '结束日期'
            },
            rangeSeparator: {
                type: String,
                default: '至'
            }
        },
        data() {
            return {
                selectedDates: this.dates, // 当前选择的日期范围
                datePickerFirstDate: null, // 第一个选择的日期，日期范围依据此日期计算
                pickerOptions: {
                    //根据第一个选择的日期,计算范围,前后2个月
                    disabledDate: (time) => {
                        if (!this.datePickerFirstDate) {
                            return false;
                        }
                        return !(time.getTime() > this.startEnableDate && time.getTime() < this.endEnableDate);
                    },
                    //日期选中一个时间后,保存下来,用于时间范围计算
                    onPick: (dates) => {
                        if (!this.datePickerFirstDate) {
                            this.datePickerFirstDate = dates.maxDate ? dates.maxDate : dates.minDate;
                        }
                    }
                }
            }
        },
        computed: {
            //计算日期范围开始日期
            startEnableDate() {
                if (!this.datePickerFirstDate) {
                    return null;
                }
                let date = new Date(this.datePickerFirstDate);
                return date.setMonth(date.getMonth() - 2);
            },
            //计算日期范围结束日期
            endEnableDate() {
                if (!this.datePickerFirstDate) {
                    return null;
                }
                let date = new Date(this.datePickerFirstDate);
                return date.setMonth(date.getMonth() + 2);
            }
        },
        watch: {
            selectedDates(newVal) {
                this.$emit('dateChanged', newVal)
            },
            dates(newVal) {
                if (this.selectedDates !== newVal) {
                    this.selectedDates = newVal
                }
            }
        },
        methods: {
            //日期选择消失时
            onDatePickerBlur() {
                //清除开始选中的用于日期范围计算的日期
                this.datePickerFirstDate = null;
            },
        }
    }
</script>

<style scoped>

</style>
