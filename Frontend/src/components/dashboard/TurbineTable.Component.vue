<template>
    <div id="turbine-table">
        <h2>Wind Turbines </h2>
        <table>
            <tr id="table-header">
                <th> Id </th>
                <th> Wind Speed (m/s)</th>
                <th> Current Production (kWh)</th>
                <th> Status </th>
            </tr>
            <tbody v-bind:key="turbine.id" v-for="turbine in turbines">
                <TurbineRow v-bind:turbine="turbine" /> 
            </tbody>
        </table>
    </div>

</template>


<script>

import TurbineRow from '@/components/dashboard/TurbineRow.Component.vue'
import axios from 'axios'

export default {
    name: "TurbineTable",
    components: {
        TurbineRow
    },
    props: ["houseId"],
    data() {
        return {
            turbines: [],
            interval: {},
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.interval = setInterval(() => {
                axios.get('/api/allLatestProducerEvent', {params: {houseId: this.houseId,}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}} )
                    .then(response => {
                        this.turbines = response.data;
                        this.turbines.sort(function(a, b){return ('' + a.producerId).localeCompare(b.producerId);});
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

<style>
    #turbine-table {
        width:48vw;
        float: left;

        height: 100%;
    }   
    #turbine-table h2 {
        text-align: left;
        margin-left: 50px;
    }
    #turbine-table table {
        text-align: right;

    }
    
</style>