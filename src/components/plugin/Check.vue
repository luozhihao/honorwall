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
                        <span class="unedit-element text-danger" v-if="timeline !== -1">(<span v-text="timeline"></span>天后结束)</span>
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
                <div class="form-group">
                    <label class="control-label col-sm-3">评分：<span class="text-danger">*</span></label>
                    <div class="col-sm-6">
                        <radio-group :value.sync="scoreOrigin" type="default" v-if="scoreValue === '0' && (status === '初审中' || status === '终审中')">
                            <radio value="20">20</radio>
                            <radio value="40">40</radio>
                            <radio value="60">60</radio>
                            <radio value="80">80</radio>
                            <radio value="100">100</radio>
                        </radio-group>
                        <span class="unedit-element" v-if="scoreValue !== '0'">此阶段您已评过分，分值为<span class="text-danger" v-text="scoreValue"></span></span>
                        <span class="unedit-element" v-if="scoreValue === '0' && status === '用户评估中'">此阶段您无需评分</span>
                        <span class="unedit-element" v-if="scoreValue === '0' && (status === '评审结束' || status === '未通过评审')">评审已结束</span>
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer text-center">
            <button type="button" class="btn btn-primary btn-box" @click="checkFn()" v-if="(status === '初审中' || status === '终审中') && scoreValue === '0'" :disabled="scoreOrigin !== '0' ? false : true">提交</button>
            <button type="button" class="btn btn-default btn-box" @click="closeFn">关闭</button>
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
    timeline: -1,
    name: '',
    scene: '',
    solve: '',
    tech: '',
    isFinished: 0,
    scoreValue: '0',
    scoreOrigin: '0'
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
        checkFn () {
            this.$http({
                url: '/honor/judge_score/',
                method: 'POST',
                data: {
                    apply_id: this.idNum,
                    scoreValue: this.scoreOrigin
                }
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.viewModal = false
                    this.$dispatch('refresh')

                    this.$dispatch('show-success', '评分成功！')
                } else {
                    this.$dispatch('show-error')
                }
            }, function () {
                this.$dispatch('show-error')
            })
        }
    },
    components: {
        modal: require('vue-strap').modal,
        radio: require('vue-strap').radioBtn,
        radioGroup: require('vue-strap').radioGroup
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