<template>
    <div class="container-fluid pd0">
        <div class="honor-nav clearfix">
            <div class="honor-menu" v-for="menu in menus" :class="{ 'menu-last': $index === menus.length - 1}" v-link="{path: menu.link}">
                <h2 v-text="menu.name"></h2>
                <i class="font" v-html="menu.font"></i>
            </div>
        </div>
        <div class="honor-content">
            <router-view></router-view>

            <alert
              :show.sync="showSuccess"
              :duration="3000"
              type="success"
              width="250px"
              placement="top"
              dismissable
            >
              <span class="icon-ok-circled alert-icon-float-left"></span>
              <strong>操作成功 :)</strong>
              <p>{{ success }}</p>
            </alert>

            <alert
              :show.sync="showNotify"
              :duration="3000"
              type="info"
              width="250px"
              placement="top"
              dismissable
            >
              <span class="icon-ok-circled alert-icon-float-left"></span>
              <strong>提示：</strong>
              <p>{{ notify }}</p>
            </alert>

            <alert
              :show.sync="showError"
              :duration="3000"
              type="danger"
              width="250px"
              placement="top"
              dismissable>
              <span class="icon-info-circled alert-icon-float-left"></span>
              <strong>操作失败 :(</strong>
              <p>{{ danger }}</p>
            </alert>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            menus: [
                {name: '荣誉墙', font: '&#xe601;', link: '/wall'},
                {name: '用户评估', font: '&#xe602;', link: '/assess'},
                {name: '奖项申报', font: '&#xe603;', link: '/apply'},
                {name: '申报查询', font: '&#xe600;', link: '/search'}
            ],
            showSuccess: false,
            showError: false,
            showNotify: false,
            success: '',
            danger: '',
            notify: ''
        }
    },
    components: {
        alert: require('vue-strap').alert,
    },
    events: {
        'show-success' (msg) {
            this.showSuccess = true
            this.showError = false
            this.showNotify = false

            msg === undefined ? this.success = '你的操作已经成功执行~' : this.success = msg
        },
        'show-notify' (msg) {
            this.showNotify = true
            this.showError = false
            this.showSuccess = false

            msg === undefined ? this.notify = '错误的操作步骤~' : this.notify = msg
        },
        'show-error' (msg) {
            this.showError = true
            this.showSuccess = false
            this.showNotify = false

            msg === undefined ? this.danger = '你的操作执行失败了~' : this.danger = msg
        },
        'open-view' (data) {
            this.$broadcast('open-view', data)
        }
    }
}
</script>

<style>
@import url("./assets/css/bootstrap.min.css");
@import url("./assets/css/common.css");

.honor-nav {
    max-width: 886px;
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;
}

.honor-menu {
    width: 144px;
    height: 250px;
    float: left;
    margin-right: 101px;
    box-sizing: border-box;
    transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -webkit-transition: 0.5s;
    position: relative;
    cursor: pointer;
}

.honor-menu h2 {
    font-size: 18px;
    color: #525252;
    padding-bottom: 17px;
    transition: color 0.5s;
    -moz-transition: color 0.5s;
    -ms-transition: color 0.5s;
    -webkit-transition: color 0.5s;
}

.honor-menu i {
    display: block;
    width: 120px;
    height: 120px;
    border: 1px solid #d5d5d5;
    border-radius: 50%;
    transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -webkit-transition: 0.5s;
    margin: 0 auto;
}

.menu-last {
    margin-right: 0;
}

.honor-menu:hover h2,
.honor-menu.active h2 {
    color: #4296F2;
}

.honor-menu:hover i,
.honor-menu.active i {
    color: #4296F2;
    border: 1px solid #4296F2;
}

.honor-content {
    width: 100%;
    border-top: 1px solid #ccc;
    overflow: hidden;
}
</style>