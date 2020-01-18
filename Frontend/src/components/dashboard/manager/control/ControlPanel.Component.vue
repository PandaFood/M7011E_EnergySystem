<template>
    <div id="control-panel">
        <div id="button-div"> 
            <h1> Coal Plant Control </h1>
            <button class="button" :disabled=disableStart v-on:click="startCoalPlant">Start Coal Plant</button>
            <button class="button" :disabled=disableStop  v-on:click="stopCoalPlant">Stop Coal Plant</button>
        </div>
        <CurrentState v-bind:coalPlant="coalPlant" v-bind:price="price"/>

        <BatteryControl v-bind:coalPlant="coalPlant" />
        <PriceControl v-bind:price="price" />
    </div>
</template>

<script>

import axios from 'axios'

import CurrentState from '@/components/dashboard/manager/control/CurrentState.Component.vue'
import BatteryControl from '@/components/dashboard/manager/control/BatteryControl.Component.vue'
import PriceControl from '@/components/dashboard/manager/control/PriceControl.Component.vue'


export default {
    name: "ControlPanel",
    components: {
        CurrentState,
        BatteryControl,
        PriceControl,
    },
    data() {
        return {
            coalPlant: {
                status: 'down',
                currentCapacity: 0,
                maxCapacity: 0,
                batteryPercentage: 0,
            },
            price: {
                currentPrice: 0,
                calculatedPrice: 0
            }
        }
    },
    mounted() {
        this.$nextTick(function () {
            setInterval(() => {
                axios.get('/api/coal/status', {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.coalPlant.currentCapacity = response.data.capacity;
                        this.coalPlant.maxCapacity = response.data.maxCapacity;
                        this.coalPlant.status = response.data.status;
                        this.coalPlant.batteryPercentage = response.data.batteryPercentage;

                    });

                axios.get('/api/currentPrice', {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.price.currentPrice = response.data.price;
                        this.price.calculatedPrice = response.data.calculatedPrice;

                    });
            }, 1000);
        });
    },
    methods: {
        startCoalPlant: function() {
            axios.post('/api/coal/start',{}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        },
        stopCoalPlant: function() {
            axios.post('/api/coal/stop',{}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        }
        
    },
    computed: {
        disableStart: function() {
            if(this.coalPlant.status == 'down'){
                return false;
            } else {
                return true;
            }
        },
        disableStop: function() {
            if(this.coalPlant.status == 'up'){
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped>

    #control-panel {
        text-align: left;
        width: 100%;
        font-size: 20px;

    }

    h1 {
        margin-left: 50px;
    }

    #button-div {
        float: left;
        width: 50%;
    }

</style>