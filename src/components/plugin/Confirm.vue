<!-- 确认操作组件 -->
<template>
    <modal :show.sync="confirmModal">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="cancelFn">
                <span>×</span>
            </button>
            <h4 class="modal-title">
                确认操作
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <h4 class="text-center" v-text="msg"></h4>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-warning" @click="okFn">
                <span class="glyphicon glyphicon-ok-sign"></span>
                确认
            </button>
            <button type="button" class="btn btn-default" @click="cancelFn">
                <span class="glyphicon glyphicon-remove-sign"></span>
                取消
            </button>
        </div>
    </modal>
</template>

<script>
export default {
    data () {
        return {
            confirmModal: false,
            msg: ''
        }
    },
    methods: {
        okFn () {
            this.$dispatch('confirm')
            this.confirmModal = false
        },
        cancelFn () {
            this.confirmModal = false
        }
    },
    components: {
        modal: require('vue-strap').modal,
    },
    events: {
        'open-confirm' (data) {
            this.msg = data
            this.confirmModal = true
        }
    }
}
</script>

<style>
    
</style>