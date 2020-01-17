<template>
    <div>
        <CurrentBattery v-bind:battery="battery" />
        <Graph ref="graph" v-bind:batteryId="batteryId"/>
    </div>
</template>

<script>
import Graph from '@/components/battery/Graph.Component.vue'
import CurrentBattery from '@/components/battery/CurrentBattery.Component.vue'

import axios from 'axios'

export default {
    name: 'BatteryTab',
    components: {
        CurrentBattery,
        Graph
    },
    data() {
        return {
            battery: {
                currentCapacity: 0,
                maxCapacity: 100,
            },
            batteryId: this.$route.query.id,
        }
    },
    mounted() {
        this.$nextTick(function () {
            axios.get('/api/storage/'+this.batteryId, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.battery.currentCapacity = response.data[0].currentCapacity;
                    this.battery.maxCapacity = response.data[0].maxCapacity;
                })
                .catch(err => {
                    this.flash(err, 'error');
                });
            setInterval(() => {
                axios.get('/api/storageEvent/latest', {params: {storageId: this.batteryId}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.battery.currentCapacity = response.data[0].currentCapacity;

                        this.$refs.graph.addData(response.data[0].currentCapacity, Date.parse(response.data[0].timestamp));
                    })
                    .catch(err => {
                        this.flash(err, 'error');
                    });
            }, 1000);
        });
    }

}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
