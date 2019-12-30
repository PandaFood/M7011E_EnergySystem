<template>
    <div>
        <CurrentWind v-bind:windData="windData" />
        <Graph ref="graph" v-bind:turbineId="turbineId"/>
    </div>
</template>

<script>
import Graph from '@/components/wind/Graph.Component.vue'
import CurrentWind from '@/components/wind/CurrentWind.Component.vue'

import axios from 'axios'

export default {
    name: 'WindTab',
    components: {
        CurrentWind,
        Graph
    },
    data() {
        return {
            windData: {
                windSpeed: 0,
                power: 0,
                status: ""
            },
            turbineId: this.$route.query.id,
        }
    },
    mounted() {
        setInterval(() => {
            axios.get('http://localhost/api/latestProducerEvent', {params: {producerId: this.$route.query.id,}})
                .then(response => {
                    this.windData.windSpeed = response.data[0].windSpeed;
                    this.windData.power = response.data[0].energyProduced;
                    this.windData.status = response.data[0].status;

                    this.$refs.graph.addData(response.data[0].windSpeed,response.data[0].energyProduced, Date.parse(response.data[0].timestamp));
                });
        }, 1000);
    }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
