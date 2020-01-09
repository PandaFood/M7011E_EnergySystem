<template>
    <div id="control-panel">
        <div id="button-div"> 
            <button v-on:click="startCoalPlant">Start Coal Plant</button>
            <button v-on:click="stopCoalPlant">Stop Coal Plant</button>

        </div>
        <CurrentState v-bind:coalPlant="coalPlant"/>
    </div>
</template>

<script>

import axios from 'axios'

import CurrentState from '@/components/dashboard/manager/control/CurrentState.Component.vue'


export default {
    name: "ControlPanel",
    components: {
        CurrentState,
    },
    data() {
        return {
            coalPlant: {
                status: 'down',
                currentCapacity: 0,
                maxCapacity: 0,
                batteryPercentage: 0,
            }
        }
    },
    mounted() {
        setInterval(() => {
            axios.get('http://localhost/api/coal/status')
                .then(response => {
                    this.coalPlant.currentCapacity = response.data.capacity;
                    this.coalPlant.maxCapacity = response.data.maxCapacity;
                    this.coalPlant.status = response.data.status;
                    this.coalPlant.batteryPercentage = response.data.batteryPercentage;

                });
        }, 1000);
    },
    methods: {
        startCoalPlant: function() {
            axios.post('http://localhost/api/coal/start')
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);

                });
        },
        stopCoalPlant: function() {
            axios.post('http://localhost/api/coal/stop')
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);

                });
        }
    },
}
</script>

<style scoped>

</style>