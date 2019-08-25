<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" md="6">
                <h1>Dashboard</h1>
                <p>Here you can view a day-by-day analysis of your calorie intake and output.</p>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" md="6">
                <v-card class="elevation-2">
                    <v-card-title>Calories Eaten vs Burned</v-card-title>
                    <v-card-text>
                        <line-chart :chart-data="data"></line-chart>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import dayjs from 'dayjs';
    import { mapGetters, mapMutations, mapActions } from "vuex";
    import LineChart from '../components/LineChart';
    import groupUtility from "../utilities/group";

    export default {

        components: {
            LineChart
        },

        created() {
            this.session.getFile(
                '/food.txt',
                {decrypt: true}
            )
                .then((json) => {
                    if (json) {
                        const data = JSON.parse(json);

                        if (Array.isArray(data)) {
                            this.foodItems = data;
                        }
                    }

                    console.log('Food loaded from the blockchain.')
                })
                .catch((err) => {
                    console.error(err);
                })
            ;

            this.session.getFile(
                '/sport.txt',
                {decrypt: true}
            )
                .then((json) => {
                    if (json) {
                        const data = JSON.parse(json);

                        if (Array.isArray(data)) {
                            this.sportItems = data;
                        }
                    }

                    console.log('Sport loaded from the blockchain.')
                })
                .catch((err) => {
                    console.error(err);
                })
            ;
        },

        data: () => ({
            foodItems: [],
            sportItems: []
        }),

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),

            data() {
                const foodGroups = groupUtility.getGroupsByDate(this.foodItems);
                const sportGroups = groupUtility.getGroupsByDate(this.sportItems);
                const map = {};

                let date = dayjs().subtract(6, 'day');

                for (let i=0; i < 7; i++) {
                    const dateFormatted = date.format('YYYY-MM-DD');
                    date = date.add(1, 'day');

                    map[dateFormatted] = {
                        eaten: 0,
                        burned: 0
                    };
                }

                for (const group of foodGroups) {
                    for (const item of group.items) {
                        map[group.date].eaten += item.number * item.calories;
                    }
                }

                for (const group of sportGroups) {
                    for (const item of group.items) {
                        map[group.date].burned += item.calories;
                    }
                }

                const labels = [];
                const foodData = [];
                const sportData = [];

                for (const date in map) {
                    labels.push(dayjs(date).format('ddd, D MMM'));
                    foodData.push(map[date].eaten);
                    sportData.push(map[date].burned);
                }

                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Calories Eaten',
                            fill: false,
                            backgroundColor: 'red',
                            borderColor	: 'red',
                            borderWidth: '5',
                            data: foodData
                        },
                        {
                            label: 'Calories Burned',
                            fill: false,
                            backgroundColor: 'green',
                            borderColor	: 'green',
                            borderWidth: '5',
                            data: sportData
                        }
                    ]
                }
            }
        },

        methods: {

        }
    }
</script>
