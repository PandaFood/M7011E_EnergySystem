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

export default {
    name: "TurbineTable",
    components: {
        TurbineRow
    },
    data() {
        return {
            turbines: [
                {
                    id: 1,
                    windSpeed: 10,
                    currentProduction: 20,
                    status: "running"
                },
                {
                    id: 2,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 3,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 4,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 5,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 6,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 7,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
                {
                    id: 8,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },{
                    id: 9,
                    windSpeed: 7,
                    currentProduction: 13,
                    status: "running"
                },
            ]
        }
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