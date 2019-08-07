<template>
  <v-container>
        <v-layout>
            <v-flex xs12 md6 offset-md3>
                <h1>Food Intake</h1>
                <p>Here you can view and log your food intake history including calories.</p>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12 md6 offset-md3>

                <v-card tile>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                color="orange darken-3"
                                dark
                                absolute
                                top
                                right
                                fab
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title>
                                <span class="headline">Log food intake</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field v-model="text" label="Food description" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <v-text-field v-model="number" label="Number of food items" type="number" value="1" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <v-text-field v-model="calories" label="Number of calories per food item" type="number" value="0" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="handleDialogClose">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="handleDialogSave">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-list>
                        <!-- <v-subheader>Monday</v-subheader> -->

                        <v-list-item
                            two-line
                            v-for="(item, i) in itemList"
                            :key="i"
                        >
                            <v-list-item-avatar>
                                <v-icon>mdi-pencil</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.number + ' x ' + item.text }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.number * item.calories }} calories</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="removeItem(item)">
                                    <v-icon color="red">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as uniqid from 'uniqid';
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        created() {
            this.session.getFile(
                '/food.txt',
                {decrypt: true}
            )
                .then((json) => {
                    if (json) {
                        this.items = JSON.parse(json);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
            ;
        },

        data: () => ({
            dialog: false,

            text: null,
            number: null,
            calories: null,

            items: [],
        }),

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),

            itemList() {
                return this.items;
            }
        },

        methods: {
            handleDialogSave() {
                this.dialog = false;

                if (!this.text || !this.number || !this.calories) {
                    return;
                }

                this.items.push({
                    id: uniqid(),
                    number: this.number,
                    text: this.text,
                    calories: this.calories,
                    date: new Date()
                });

                this.text = null;
                this.number = null;
                this.calories = null;

                this.updateBlockchain();
            },

            handleDialogClose() {
                this.dialog = false;
            },

            removeItem(item) {
                this.items = this.items.filter((x) => {
                    return x.id !== item.id;
                });

                this.updateBlockchain();
            },

            updateBlockchain() {
                this.session.putFile(
                    '/food.txt',
                    JSON.stringify(this.items),
                    {encrypt: true}
                )
                    .then(() => {
                        console.log('Food saved on the blockchain.');
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                ;
            }
        }
    }
</script>
