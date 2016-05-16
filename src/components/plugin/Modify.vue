<template>
    <modal :show.sync="viewModal" effect="zoom" width="900px">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="closeFn">
                <span>×</span>
            </button>
            <h4 class="modal-title">
                申报查看
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <upload></upload>
        </div>
        <div slot="modal-footer" class="modal-footer text-center">
            <button type="button" class="btn btn-primary btn-box" @click="confirmFn()" v-if="isFinished === 0">修改</button>
            <button type="button" class="btn btn-default btn-box" @click="closeFn()" v-if="isFinished === 0">取消</button>
        </div>
    </modal>
    <confirm></confirm>
</template>

<script>
export default {
    data () {
        return {
            viewModal: false,
            idNum: '',
            isFinished: 0
        }
    },
    methods: {

        // 关闭弹窗
        closeFn () {
            this.viewModal = false
        },

        // 确认修改
        confirmFn () {
            this.$broadcast('open-confirm', '修改提交后项目将重新回到初审阶段')
        }
    },
    components: {
        modal: require('vue-strap').modal,
        upload: require("./Upload.vue"),
        confirm: require("./Confirm.vue")
    },
    events: {
        'edit-modal' (data) {
            this.viewModal = true
            this.idNum = data.idNum
            this.isFinished = data.isFinished

            this.$http({
                url: '/honor/apply/' + data.idNum + '/',
                method: 'GET'
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    let info = {
                        content: response.data.data,
                        isFinished: data.isFinished
                    }

                    this.$broadcast('getData', info)
                }
            })
        },
        'confirm' () {
            let _this = this

            this.$broadcast('modify', _this.idNum)
        },
        'success' () {
            this.viewModal = false
            this.$dispatch('refresh')
        }
    }
}
</script>

<style scoped>

</style>