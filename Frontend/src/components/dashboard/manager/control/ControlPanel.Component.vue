<template>
    <div id="control-panel">
        <div id="button-div"> 
            <button class="button" :disabled=disableStart v-on:click="startCoalPlant">Start Coal Plant</button>
            <button class="button" :disabled=disableStop  v-on:click="stopCoalPlant">Stop Coal Plant</button>

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
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        },
        stopCoalPlant: function() {
            axios.post('http://localhost/api/coal/stop')
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

</style>