<template>
    <div>
        <CurrentBattery v-bind:battery="battery" />
        <!-- <Gauge ref="gauge" v-bind:batteryId="batteryId"/> -->
    </div>
</template>

<script>
// import Gauge from '@/components/battery/Gauge.Component.vue'
import CurrentBattery from '@/components/battery/CurrentBattery.Component.vue'

// import axios from 'axios'

export default {
    name: 'BatteryTab',
    components: {
        CurrentBattery,
        // Gauge
    },
    data() {
        return {
            battery: {
                currentCapacity: 0,
                maxCapacity: 100,
                fillPercentage: 0.75
            },
            batteryId: this.$route.query.id,
        }
    },
    mounted() {
        // setInterval(() => {
        //     axios.get('http://localhost/api/latestProducerEvent', {params: {storageId: this.$route.query.batteryId,}})
        //         .then(response => {
        //             this.windData.windSpeed = response.data[0].windSpeed;
        //             this.windData.power = response.data[0].energyProduced;
        //             this.windData.status = response.data[0].status;

        //             this.$refs.graph.addData(response.data[0].windSpeed,response.data[0].energyProduced, Date.parse(response.data[0].timestamp));
        //         });
        // }, 1000);
    }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
