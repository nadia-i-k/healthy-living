<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" md="6">
                <h1>Food Intake</h1>
                <p>Here you can log your food intake including quantity and calories.</p>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" md="6">

                <v-card tile class="elevation-2">
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
                                            <v-text-field v-model="number" label="Number of food items" type="number" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <v-text-field v-model="calories" label="Number of calories per food item" type="number" required></v-text-field>
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

                    <div v-if="isLoading">
                        <v-progress-linear
                            indeterminate
                            color="orange darken-3"
                        >
                        </v-progress-linear>
                    </div>

                    <div v-else>
                        <div v-if="items.length > 0">
                            <v-list v-for="group in groups" :key="group.date">
                                <v-subheader>{{ group.formattedDate }}</v-subheader>

                                <v-list-item
                                    two-line
                                    v-for="(item, i) in group.items"
                                    :key="i"
                                >
                                    <v-list-item-avatar>
                                        <v-icon color="primary">mdi-pencil</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.number + ' x ' + item.text }}</v-list-item-title>
                                        <v-list-item-subtitle>Consumed {{ item.number * item.calories }} calories</v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-btn icon @click="removeItem(item)">
                                            <v-icon color="red">mdi-close</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </div>

                        <div v-else>
                            <p class="text-center subtitle pa-2">No food intake is logged yet.</p>
                        </div>
                    </div>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import * as uniqid from 'uniqid';
    import { mapGetters, mapMutations, mapActions } from "vuex";
    import groupUtility from "../utilities/group";

    export default {
        created() {
            this.session.getFile(
                '/food.txt',
                {decrypt: true}
            )
                .then((json) => {
                    if (json) {
                        const data = JSON.parse(json);

                        if (Array.isArray(data)) {
                            this.items = data;
                        }
                    }

                    this.isLoading = false;

                    console.log('Food loaded from the blockchain.')
                })
                .catch((err) => {
                    this.isLoading = false;

                    console.error(err);
                })
            ;
        },

        data: () => ({
            isLoading: true,
            dialog: false,

            text: '',
            number: 1,
            calories: 100,

            items: [],
        }),

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),

            groups() {
                return groupUtility.getGroupsByDate(this.items);
            },

            itemList() {
                return this.items;
            }
        },

        methods: {
            handleDialogSave() {
                this.dialog = false;

                if (!this.text.length > 0 || !this.number || !this.calories) {
                    return;
                }

                this.items.push({
                    id: uniqid(),
                    number: this.number,
                    text: this.text,
                    calories: this.calories,
                    date: new Date()
                });

                this.text = '';
                this.number = 1;
                this.calories = 100;

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
