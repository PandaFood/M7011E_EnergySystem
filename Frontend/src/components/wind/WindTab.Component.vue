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
            interval: {},
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.interval = setInterval(() => {
                axios.get('/api/latestProducerEvent', {params: {producerId: this.turbineId,}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.windData.windSpeed = response.data[0].windSpeed;
                        this.windData.power = response.data[0].energyProduced;
                        this.windData.status = response.data[0].status;

                        if(this.$refs.graph) {
                            this.$refs.graph.addData(response.data[0].windSpeed,response.data[0].energyProduced, Date.parse(response.data[0].timestamp));
                        }
                    })
                    .catch(err => {
                        this.flash(err, 'error');
                    });
            }, 1000);
        });
    },
    destroyed() {
        clearInterval(this.interval);
    }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
