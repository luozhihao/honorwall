<template>
    <form id="file_form" class="form-horizontal">
        <div class="form-group">
            <label class="control-label col-sm-3">奖项类型：<span class="text-danger">*</span></label>
            <div class="col-sm-6">
                <v-select :value.sync="type" :options="types" placeholder="请选择">
                </v-select>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-3">项目名称：<span class="text-danger">*</span></label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="name">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-3">项目文件：<span class="text-danger">*</span></label>
            <div class="col-sm-4">
                <input type="text" class="form-control" onfocus="this.blur()" v-model="path">
                <input id="file" type="file" name="file" v-show="false" @change="changeFn">
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-default" @click="searchFn" v-if="isFinished === 0">浏览</button>
                <button type="button" class="btn btn-default" @click="uploadFn" v-if="isFinished === 0">上传</button>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-3">应用场景：<span class="text-danger">*</span></label>
            <div class="col-sm-6">
                <textarea class="form-control" rows="3" v-model="scene"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-3">解决问题：<span class="text-danger">*</span></label>
            <div class="col-sm-6">
                <textarea class="form-control" rows="3" v-model="solve"></textarea>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-3">包含技术：<span class="text-danger">*</span></label>
            <div class="col-sm-6">
                <textarea class="form-control" rows="3" v-model="tech"></textarea>
            </div>
        </div>
        <div class="form-group text-center" v-if="showBtn">
            <div class="col-sm-6 col-sm-offset-3">
                <button type="button" class="btn btn-success btn-box" :disabled="!type || !name.trim() || !path.trim() || !scene.trim() || !solve.trim() || !tech.trim() ? true : false" @click="submitFn">提交</button>
            </div>
        </div>
    </form>
</template>

<script>
var origin,
    depend;

    origin = {
        types: [
            {label: '新人奖', value: '1'},
            {label: '创新奖', value: '2'},
            {label: 'MVP奖', value: '3'}
        ],
        type: '',
        name: '',
        scene: '',
        solve:'',
        tech: '',
        path: '',
        road: '',
        showBtn: true,
        isFinished: 0
    }

    depend = Object.assign({}, origin)

export default {
    data () {
        return origin
    },
    methods: {

        // 提交
        submitFn () {
            if (this.road !== '') {
                this.$http({
                        url: '/honor/start_apply/',
                        method: 'POST',
                        data: {
                            type: this.type,
                            name: this.name,
                            scene: this.scene,
                            solve: this.solve,
                            tech: this.tech,
                            path: this.road
                        }
                    })
                    .then(function (response) {
                        if (response.data.status === 200) {
                            this.$data = Object.assign(origin, depend)

                            this.$dispatch('show-success')
                        } else {
                            this.$dispatch('show-error')
                        }
                    })
            } else {
                this.$dispatch('show-notify', '请上传项目文件')
            }
        },

        // 浏览
        searchFn () {
            $('#file').trigger('click')
        },

        // 获取路径
        changeFn () {
            this.path = $('#file').val();
        },

        // 上传
        uploadFn () {
            if (this.path !== '') {
                let _this = this,
                    formData = new FormData($('#file_form')[0])

                $.ajax({
                        url: '/honor/file_upload/',
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        dataType: 'JSON',
                        data: formData
                    })
                    .then(function (data) {
                        if (data.status === 200) {
                            _this.road = data.data.path

                            _this.$dispatch('show-success')
                        } else {
                            _this.$dispatch('show-error')
                        }
                    })
            }    
        }
    },
    components: {
        vSelect: require('./Select.vue')
    },
    events: {
        'getData' (data) {
            this.$data = Object.assign({}, origin, data.content)
            this.isFinished = data.isFinished
            this.showBtn = false
        },
        'modify' (data) {
            this.$http({
                url: '/honor/apply/' + data + '/',
                method: 'POST',
                data: this.$data
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.$dispatch('success')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>