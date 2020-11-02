import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/',
        name: 'admin',
        component: ()=>import('./view/index'),
        children: [
            {
                path: '/message',
                name: 'message',
                component: () => import('./view/message'),
                meta: {
                    title: '消息'
                }
            },
            {
                path: '/contact',
                name: 'contact',
                component: ()=> import('./view/contact'),
                meta: {
                    title: '联系人'
                }
            },
            {
                path: '/person',
                name: 'person',
                component: ()=> import('./view/person'),
                meta: {
                    title: '我的'
                }
            },
            {
                path: '/chat',
                name: 'chat',
                component: ()=>import('./view/chat'),
                meta: {
                    title: '消息详情'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./view/login'),
        meta: {
            title: '用户登录'
        }
    },

];

// add route path
// routes.forEach(route => {
//     route.path = route.path || '/' + (route.name || '');
// });

const router = new Router({routes});
router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    let userInfo = sessionStorage.getItem('userInfo');
    if(userInfo) {
        if(to.path === '/') {
            next('/message');
        }
        if(to.path === '/login') {
            next(from.path);
        }
        if(to.path === '/chat') {
            let query = to.query;
            if(!query.chatname) {
                next(from.path);
            }
        }
        next();
    }else {
        if(to.path !== '/login') {
            next('/login');
        }
        next();
    }

});

export {
    router
};
