<template>
    <modal :show.sync="viewModal" effect="zoom" width="900px">
        <div slot="modal-header" class="modal-header">
            <button type="button" class="close" @click="closeFn">
                <span>×</span>
            </button>
            <h4 class="modal-title">
                项目审批
            </h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal form-check">
                <div class="form-group">
                    <label class="control-label col-sm-3">申报类型：</label>
                    <div class="col-sm-6">
                        <span class="unedit-element" v-text="type_label"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">申报时间：</label>
                    <div class="col-sm-6">
                        <span class="unedit-element" v-text="apply_time"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">当前状态：</label>
                    <div class="col-sm-6">
                        <span class="unedit-element text-warning" v-text="status"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">项目名称：</label>
                    <div class="col-sm-6">
                        <span class="unedit-element" v-text="name"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">应用场景：</label>
                    <div class="col-sm-6">
                        <textarea class="form-control disabled" rows="3" v-text="scene" disabled></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">解决问题：</label>
                    <div class="col-sm-6">
                        <textarea class="form-control disabled" rows="3" v-text="solve" disabled></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3">包含技术：</label>
                    <div class="col-sm-6">
                        <textarea class="form-control disabled" rows="3" v-text="tech" disabled></textarea>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer text-center">
            <button type="button" class="btn btn-primary btn-box" @click="checkFn('accept')" v-if="isFinished === 0">通过</button>
            <button type="button" class="btn btn-danger btn-box" @click="checkFn('decline')" v-if="isFinished === 0">不通过</button>
            <button type="button" class="btn btn-default btn-box" @click="closeFn">取消</button>
        </div>
    </modal>
</template>

<script>
var origin = {
    viewModal: false,
    idNum: '',
    type_label: '',
    apply_time: '',
    status: '',
    name: '',
    scene: '',
    solve: '',
    tech: '',
    isFinished: 0
}

export default {
    data () {
        return origin
    },
    methods: {

        // 关闭弹窗
        closeFn () {
            this.viewModal = false
        },

        // 审核
        checkFn (pass) {
            this.$http({
                url: '/honor/change_status/',
                method: 'POST',
                data: {
                    action: pass,
                    apply_id: this.idNum
                }
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.viewModal = false
                    this.$dispatch('refresh')
                }
            })
        }
    },
    components: {
        modal: require('vue-strap').modal
    },
    events: {
        'check-modal' (data) {
            this.$http({
                url: '/honor/apply/' + data.idNum + '/',
                method: 'GET'
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.$data = Object.assign({}, origin, response.data.data)
                    
                    this.viewModal = true
                    this.idNum = data.idNum
                    this.isFinished = data.isFinished
                }
            })
        }
    }
}
</script>

<style scoped>
.unedit-element {
    padding-top: 7px;
    display: inline-block;
}

.disabled {
    background: #FFFFFF;
    border: 1px dashed #ccc;
    box-shadow: none;
}

.form-check {
    overflow: hidden;
}
</style>