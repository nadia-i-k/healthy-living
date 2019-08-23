<template>
    <v-container class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="5" lg="4">

                <v-card class="elevation-2">
                    <v-img :src="require('../assets/blockstack.png')" height="200px"></v-img>

                    <v-card-title>Please sign in first!</v-card-title>

                    <v-card-text>
                        <span class="text--primary">In order to use Healthy Living, you have to first authenticate using your Blockstack ID.</span>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-btn @click="signIn" color="primary" large>
                            <v-icon left>mdi-login</v-icon>
                            Sign In with Blockstack
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    components: {},

    computed: {
        ...mapGetters(["session", "username"])
    },

    methods: {
        ...mapMutations(["setSession", "setUsername"]),

        signIn() {
            this.session.redirectToSignIn(window.location.origin);
        },

        signOut() {
            this.session.signUserOut();

            this.setSession(null);
            this.setUsername(null);

            window.location = window.location.origin;
        }
    }
};
</script>
