<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Navigation Menu
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ currentDateFormatted }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense clipped>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/food">
                    <v-list-item-action>
                        <v-icon>mdi-food-apple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Food</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/sport">
                    <v-list-item-action>
                        <v-icon>mdi-run</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sport</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/dashboard">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


                <v-divider></v-divider>

                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sign Out</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-login</v-icon>
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

            <span class="d-none d-sm-inline-flex">
                <span v-if="username">
                    <v-chip
                        @click="redirectToProfile"
                        pill
                        color="primary darken-1"
                    >
                        <v-avatar
                            left
                            color="orange darken-3"
                        >
                            {{ usernameFirstLetter }}
                        </v-avatar>
                        {{ username }}
                    </v-chip>

                    <v-btn @click="signOut" large text class="ml-3">
                        <v-icon left>mdi-login</v-icon>
                        Sign Out
                    </v-btn>
                </span>

                <v-btn v-else @click="signIn" large text>
                    <v-icon left>mdi-login</v-icon>
                    Sign In with Blockstack
                </v-btn>
            </span>
        </v-app-bar>

        <v-content class="b-content">
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import dayjs from 'dayjs';

export default {
    name: "App",

    components: {
    },

    data: () => ({
        drawer: null
    }),

    computed: {
        ...mapGetters([
            'session',
            'username'
        ]),

        usernameFirstLetter() {
            return this.username.charAt(0).toUpperCase();
        },

        currentDateFormatted() {
            return dayjs().format('dddd, D MMMM');
        }
    },

    methods: {
         ...mapMutations([
            'setSession',
            'setUsername'
        ]),

        handleDrawlerClick() {
            this.drawer = !this.drawer;
        },

        signIn() {
            this.session.redirectToSignIn(window.location.origin);
        },

        signOut() {
            this.session.signUserOut();

            this.setSession(null);
            this.setUsername(null);

            window.location = window.location.origin;
        },

        redirectToProfile() {
            window.open('https://browser.blockstack.org/profiles', '_blank');
        }
    }
};
</script>

<style lang="scss">
    .b-content {
        background: url('/img/bg-1.jpg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
