import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import Food from './views/Food.vue'
import Sport from './views/Sport.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    hash: false,
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                protected: false
            }
        },
        {
            path: '/sign-in',
            component: SignIn,
            meta: {
                protected: false
            }
        },
        {
            path: '/food',
            component: Food,
            meta: {
                protected: true
            }
        },
        {
            path: '/sport',
            component: Sport,
            meta: {
                protected: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isProtected = to.meta.protected || false;

    if (isProtected) {
        if (store.state.username) {
            next();
        }
        else {
            next('/sign-in');
        }
    }
    else {
        next();
    }
})

export default router;
