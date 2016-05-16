<template>
    <div class="honor-search clearfix">
        <form class="form-inline">
            <div class="form-group">
                <label>搜索：</label>
                <input type="text" class="form-control" v-model="search" placeholder="姓名/项目/简介">
            </div>
            <div class="form-group">
                <label>年份：</label>
                <input type="number" class="form-control yearTxt" v-model="year">
            </div>
            <br>
            <table class="table table-hover table-bordered mt30">
                <thead>
                    <tr>
                        <th width="7%">姓名</th>
                        <th width="15%">项目名称</th>
                        <th width="12%">申报时间</th>
                        <th width="20%">应用场景</th>
                        <th width="10%">当前阶段</th>
                        <th width="8%">当前评审人数</th>
                        <th width="8%">加权平均分</th>
                        <th width="10%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in lists">
                        <td v-text="list.name"></td>
                        <td v-text="list.product" :title="list.product"></td>
                        <td v-text="list.time"></td>
                        <td v-text="list.introduce" :title="list.introduce"></td>
                        <td v-text="list.status" :class="list.status === '评审结束' ? 'text-success' : 'text-warning'"></td>
                        <td v-text="list.person" :title="list.person"></td>
                        <td v-text="list.score" :title="list.score"></td>
                        <td>
                            <button type="button" class="btn btn-default btn-small mr15" v-if="list.is_author" @click="modifyFn($index)">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>
                            <button type="button" class="btn btn-default btn-small mr15" v-if="list.is_judge" @click="checkFn($index)">
                                <span class="glyphicon glyphicon-eye-open"></span>
                            </button>
                            <a :href="list.link" target="_blank" class="btn btn-default btn-small glyphicon glyphicon-arrow-down pointer"></a>
                        </td>
                    </tr>
                    <tr v-if="!lists.length">
                        <td colspan="7" class="text-center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </form>

        <edit-modal></edit-modal>
        <check-modal></check-modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            lists: [],
            year: '',
            search: ''
        }
    },
    methods: {

        // 修改
        modifyFn (index) {
            let dataArr = {
                idNum: this.lists[index].id,
                isFinished: this.lists[index].is_finished
            }

            this.$broadcast('edit-modal', dataArr)
        },

        // 审批
        checkFn (index) {
            let dataArr = {
                idNum: this.lists[index].id,
                isFinished: this.lists[index].is_finished
            }

            this.$broadcast('check-modal', dataArr)
        },

        // 刷新
        refresh () {
            this.$http({
                url: '/honor/apply_list/?search=' + this.search.trim() + '&year=' + this.year,
                method: 'GET'
            })
            .then(function (response) {
                if (response.data.status === 200) {
                    this.lists = response.data.data
                }
            })
        }
    },
    ready () {
        let date = new Date(),
            year = date.getFullYear()

        this.year = year
    },
    components: {
        editModal: require('./plugin/Modify.vue'),
        checkModal: require('./plugin/Check.vue')
    },
    events: {
        'refresh' () {
            this.refresh()
        }
    },
    watch: {
        'search' (newVal) {
            this.refresh()
        },
        'year' (newVal) {
            this.refresh()
        }
    }
}
</script>

<style scoped>
.honor-search {
    padding: 60px 200px;
}

.pointer {
    cursor: pointer;
    margin-top: -3px;
}

.btn-small {
    padding: 0px 3px;
    color: #5D5151;
    border: none;
    font-size: 12px;
}

.mr15 {
    margin-right: 15px;
}

.yearTxt {
    width: 85px;
}
</style>