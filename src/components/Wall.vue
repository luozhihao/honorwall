<template>
    <div class="honor-wall clearfix">
        <form class="form-inline year-form">
            <label class="control-label">年份：</label>
            <input type="number" class="form-control yearTxt" v-model="year">
        </form>
        <div class="col-sm-12 wall-box pd0">
            <div class="col-sm-2 pd0">
                <p class="honor-title">新人奖</p>
                <div class="table-wrap">
                    <table class="table table-hover new-table">
                        <tbody>
                            <tr v-for="new in news">    
                                <td v-text="new.name"></td>
                                <td v-text="new.time"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm-2 pd0">
                <p class="honor-title">创新奖</p>
                <div class="table-wrap">
                    <table class="table table-hover creat-table">
                        <tbody>
                            <tr v-for="create in creates">    
                                <td v-text="create.name"></td>
                                <td v-text="create.time"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm-2 pd0">
                <p class="honor-title">MVP奖</p>
                <div class="table-wrap">
                    <table class="table table-hover mvp-table">
                        <tbody>
                            <tr v-for="mvp in mvps">    
                                <td v-text="mvp.name"></td>
                                <td v-text="mvp.time"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm-6 pd0">
                <div class="table-wrap2">
                    <table class="table project-table table-hover">
                        <thead>
                            <tr>
                                <th width="30%">项目名称</th>
                                <th width="15%">姓名</th>
                                <th width="15%">类型</th>
                                <th width="15%">获奖时间</th>
                                <th width="15%">分数</th>
                                <th width="10%">下载</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="list in lists">
                                <td v-text="list.product"></td>
                                <td v-text="list.name"></td>
                                <td v-text="list.type"></td>
                                <td v-text="list.time"></td>
                                <td v-text="list.score"></td>
                                <td>
                                    <a :href="list.link" class="glyphicon glyphicon-arrow-down"></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var origin = {
    news: [],
    creates: [],
    mvps: [],
    lists: [],
    year: ''
}

export default {
    data () {
        return origin
    },
    methods: {
        refresh () {
            this.$http({
                url: '/honor/award_list/',
                method: 'POST',
                data: {
                    year: this.year
                }
            })
            .then(function (response) {
                if (response.data.status = 200) {
                    let obj = response.data.data

                    this.news = obj.news
                    this.creates = obj.creates
                    this.mvps = obj.mvps
                    this.lists = obj.lists
                }
            })
        }
    },
    compiled () {
        let date = new Date(),
            year = date.getFullYear()

        this.year = year

        this.refresh()
    },
    watch: {
        'year' (newVal, oldVal) {
            if (oldVal  !== '') {
                this.refresh()
            }
        }
    }
}
</script>

<style scoped>
.honor-wall {
    text-align: center;
}

.honor-title {
    height: 33px;
    font-size: 14px;
    line-height: 33px;
    margin: 0;
    color: #fff;
    background: #103F5A;
}

.wall-box {
    background: #EFEFEF;
}

.project-table {
    background: #EDFBFA;
    margin-bottom: 0;
}

.project-table th {
    background: #009688;
    color: #fff;
    text-align: center;
    border: none !important;
}

.new-table,
.creat-table,
.mvp-table {
    background: #EAF3F7;
    margin-bottom: 0;
}

.table-wrap {
    background: #EAF3F7;
}

.table-wrap2 {
    background: #EDFBFA;
}

.yearTxt {
    width: 85px;
}

.year-form {
    margin: 10px 0;
}
</style>