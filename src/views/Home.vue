<template>
    <v-container>
        <v-layout text-center wrap>
            <v-flex xs12>
                <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
            </v-flex>

            <v-flex xs12 mb-4>
                <h1 class="display-2 font-weight-bold mb-3">Healthy Living</h1>
                <p class="subheading font-weight-regular">
                    Track your food intake and sport activity for a healthy life.
                </p>
            </v-flex>

            <v-flex xs12>
                <v-btn @click="handleButtonClick" color="primary" large>
                    Sign In with Blockstack
                </v-btn>
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
            handleButtonClick() {
                this.session.redirectToSignIn();
            }
        }
    };
</script>
