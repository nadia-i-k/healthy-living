import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import { AppConfig, UserSession } from "blockstack";

function main() {
    Vue.config.productionTip = false

    authenticate();

    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
}

function authenticate() {
    const appConfig = new AppConfig(['store_write']);
    const session = new UserSession({appConfig});

    store.commit('setSession', session);

    if (session.isUserSignedIn()) {
        const userData = session.loadUserData();
        const username = userData.username;

        store.commit('setUsername', username);
    }
    else if (session.isSignInPending()) {
        session.handlePendingSignIn().then(() => {
            window.location = window.location.origin;
        });
    }
}

main();
