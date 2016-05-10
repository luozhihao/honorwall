/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 17:04:26
 * @description 路由配置
 */

'use strict'

export default function (router) {
    router.map({
        '/': {
            component: function (resolve) {
                require(['./components/Wall.vue'], resolve)
            }
        },
        '/wall': {
            component: function (resolve) {
                require(['./components/Wall.vue'], resolve)
            }
        },
        '/assess': {
            component: function (resolve) {
                require(['./components/Assess.vue'], resolve)
            }
        },
        '/apply': {
            component: function (resolve) {
                require(['./components/Apply.vue'], resolve)
            }
        },
        '/search': {
            component: function (resolve) {
                require(['./components/Search.vue'], resolve)
            }
        }
    })
}
