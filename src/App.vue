<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app >
            <v-list dense clipped>
                <v-list-item v-for="item in drawerItems" :key="item.path" :to="item.path">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark color="primary">
            <v-app-bar-nav-icon @click.stop="handleDrawlerClick"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-uppercase">
                <span>Healthy Living</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
                <span class="mr-2">Latest Release</span>
            </v-btn> -->
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import { AppConfig, UserSession } from "blockstack";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "App",

    components: {
    },

    created() {
        const appConfig = new AppConfig(['store_write']);
        const session = new UserSession({appConfig});

        this.setSession(session);

        if (session.isUserSignedIn()) {
            const userData = session.loadUserData();
            const username = userData.username;

            this.setUsername(username);
        }
        else if (session.isSignInPending()) {
            session.handlePendingSignIn().then(userData => {
                // window.location = window.location.origin;
            });
        }
    },

    data: () => ({
        drawer: null,
        drawerItems: [
            {
                icon: 'mdi-home',
                title: 'Home',
                path: '/'
            },
            {
                icon: 'mdi-food-apple',
                title: 'Food',
                path: '/food'
            },
            {
                icon: 'mdi-run',
                title: 'Sport',
                path: '/sport'
            }
        ]
    }),

    computed: {
        ...mapGetters([
            'session',
            'username'
        ]),
    },

    methods: {
         ...mapMutations([
            'setSession',
            'setUsername'
        ]),

        handleDrawlerClick() {
            this.drawer = !this.drawer;
        },
    }
};
</script>
