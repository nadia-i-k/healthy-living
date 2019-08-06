<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app >
            <v-list dense clipped>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/sign-in">
                    <v-list-item-action>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sign In</v-list-item-title>
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
        const appConfig = new AppConfig(["store_write", "publish_data"]);
        const session = new UserSession(appConfig);

        this.setSession(session);

        if (session.isUserSignedIn()) {
            const userData = session.loadUserData();
            const username = userData.username;

            this.setUsername(username);
        }
        else if (session.isSignInPending()) {
            session.handlePendingSignIn().then(userData => {
                window.location = window.location.origin;
            });
        }
    },

    data: () => ({
        drawer: null
    }),

    methods: {
        handleDrawlerClick() {
            this.drawer = !this.drawer;
        },
    }
};
</script>
