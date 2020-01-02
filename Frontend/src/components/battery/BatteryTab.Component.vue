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
        axios.get('http://localhost/api/storage/'+this.batteryId)
            .then(response => {
                this.battery.currentCapacity = response.data[0].currentCapacity;
                this.battery.maxCapacity = response.data[0].maxCapacity;
            })
        setInterval(() => {
            axios.get('http://localhost/api/storageEvent/latest', {params: {storageId: this.batteryId}})
                .then(response => {
                    this.battery.currentCapacity = response.data[0].currentCapacity;

                    this.$refs.graph.addData(response.data[0].currentCapacity, Date.parse(response.data[0].timestamp));
                })
                .catch((err) => {
                    console.log("ERROR: Can not fetch latest storage event. " + err);
                });
        }, 1000);
    }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
