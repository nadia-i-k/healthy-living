<template>
    <v-container>
        <v-layout text-center column>
            <v-flex xs12>
                <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
            </v-flex>

            <v-flex xs12>
                <h1 class="display-2 font-weight-bold mb-3">Healthy Living</h1>
                <p class="subheading font-weight-regular">
                    The most secure way to track your food intake and sport activity every day.
                </p>
            </v-flex>
        </v-layout>

        <v-layout column mt-12>
            <v-flex xs12 text-center>
                <v-btn v-if="username" @click="signOut" color="primary" large>
                    <v-icon left>mdi-login</v-icon>
                    Sign Out
                </v-btn>

                <v-btn v-else @click="signIn" color="primary" large>
                    <v-icon left>mdi-login</v-icon>
                    Sign In with Blockstack
                </v-btn>
            </v-flex>
        </v-layout>

        <v-layout column mt-12>
            <v-flex xs12 text-center>
                <h1 class="display-1">Why using this app?</h1>
            </v-flex>

            <v-container mt-4 grid-list-lg>
                <v-layout wrap row>
                    <v-flex xs12 md4>
                        <v-card>
                            <v-img
                                height="200px"
                                :src="require('../assets/mobile.jpg')"
                            />

                            <v-card-title>You own your data</v-card-title>

                            <v-card-text>
                                <p class="text--primary">
                                    This app is 100% private by default.
                                    You have full control over your data because everything is stored on the blockchain.
                                    There is no evil corporation behind that can use your personal data for profit.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 md4>
                        <v-card>
                            <v-img
                                height="200px"
                                :src="require('../assets/security.jpg')"
                            />
                            <v-card-title>Completely secure</v-card-title>
                            <v-card-text>
                                <p class="text--primary">
                                    Our app offers the highest level of security as it relies on world-class end-to-end encryption technology.
                                    All data communication and files stored on the blockchain are fully encrypted.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs12 md4>
                        <v-card>
                            <v-img
                                height="200px"
                                :src="require('../assets/innovation.jpg')"
                            />
                            <v-card-title>Innovative and user-friendly</v-card-title>
                            <v-card-text>
                                <p class="text--primary">
                                    This app offers innovative and user-friendly user interface that everyone can use. It does not need
                                    any installation and it works equally well on desktop and mobile devices.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>

        <v-layout column mt-12>
            <v-flex xs12>
                <v-flex xs12 text-center>
                    <h1 class="display-1">Frequently asked questions</h1>
                </v-flex>

                <v-expansion-panels class="mt-4">
                    <v-expansion-panel>
                        <v-expansion-panel-header>Who developed this app?</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            This awesome app was developed by Nadia Kaloyanova.
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>What is this app about?</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            This app helps you track your food intake and sport activity every day.
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>What is unique about this app?</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            This app is unique because it is 100% secure and private. When you use this app you do not share your private information
                            with anyone else. It is all yours, it is fully encryped and stored on the blockchain.
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>How do I register for this app?</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            All you need to do is to sign in using your Blockstack id.
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>What is the pricing?</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            At this moment in time, the app is completely free to use.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        components: {},

        computed: {
            ...mapGetters([
                'session'
            ]),
        },

        methods: {
            signIn() {
                console.log(window.location.origin);
                this.session.redirectToSignIn(window.location.origin);
            },

            signOut() {
                this.session.signUserOut();
            }
        }
    };
</script>
