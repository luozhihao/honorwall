<template>
    <div class="honor-assess clearfix">
        <form class="form-horizontal">
            <div class="form-group select-product">
                <div class="product-wrap">
                    <v-select :value.sync="product" :options="products" placeholder="请选择项目">
                    </v-select>
                </div>
            </div>

            <div class="form-group" v-for="list in lists">
                <label class="control-label col-sm-2" v-text="list.name + ':'"></label>
                <div class="col-sm-10">
                    <radio-group :value.sync="list.active" type="default">
                        <radio v-for="choice in list.choices" :value="choice.choice_id">{{ choice.label }}</radio>
                    </radio-group>
                </div>
            </div>
            <div class="form-group text-center" v-if="lists.length">
                <button type="button" class="btn btn-success btn-box" @click="confirmFn">提交</button>
            </div>
            <div class="assess-box" v-if="showBox">
                评价内容显示区
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            products: [],
            product: '',
            lists: [],
            showBox: true
        }
    },
    methods: {

        // 确认评价
        confirmFn () {
            let arr = [],
                _this = this

            this.lists.forEach(function (e){
                if (e.active === '') {
                    _this.$dispatch('show-notify', '有未完成的评价项')

                    return false
                } else {
                    arr.push({
                        item_id: e.item_id,
                        active_id: e.active
                    })
                }
            })

            if (arr.length === this.lists.length) {
                this.$http({
                    url: '/honor/choice_result/',
                    method: 'POST',
                    data: {
                        product_id: this.product,
                        choices: JSON.stringify(arr)
                    }
                })
                .then(function (response) {
                    if (response.data.status === 200) {
                        this.product = ''
                        this.lists = []
                        this.showBox = true

                        this.$dispatch('show-success')
                    } else {
                        this.$dispatch('show-error')
                    }
                })
            }
        },

        // 刷新
        refresh () {
            this.$http({
                url: '/honor/product_list/',
                method: 'POST'
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.products = response.data.data
                }
            })
        }
    },
    components: {
        radioGroup: require('vue-strap').radioGroup,
        radio: require('vue-strap').radioBtn,
        vSelect: require('./plugin/Select.vue')
    },
    ready () {
        this.refresh()
    },
    watch: {
        'product' (newVal) {
            if (newVal !== '') {
                this.$http({
                    url: '/honor/choice_list/',
                    method: 'POST',
                    data: {
                        product: newVal
                    }
                })
                .then(function (response) {
                    if (response.data.status === 200) {
                        this.showBox = false
                        this.lists = response.data.data
                    }
                })
            } else {
                this.refresh()
            }
        }
    }
}
</script>

<style scoped>
.honor-assess {
    padding: 60px 200px;
}

.honor-assess .btn-group {
    width: 100%;
}

.honor-assess .btn-group > .btn {
    width: 80%;
    margin-bottom: 20px;
}

.product-wrap {
    width: 200px;
    position: relative;
    left: 50%;
    margin-left: -100px;
}

.assess-box {
    height: 200px;
    width: 100%;
    text-align: center;
    font-size: 32px;
    line-height: 200px;
    border: 1px dashed #ccc;
    color: #ccc;
    margin-top: 50px;
}
</style>