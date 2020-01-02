<template>
    <div id="battery-table">
        <h2>Batteries</h2>
        
        <table>
            <tr id="table-header">
                <th> Id </th>
                <th> Current Capacity (kWh)</th>
                <th> Max Capacity (kWh)</th>
                <th> Fill Percentage (%) </th>

            </tr>
            <tbody v-bind:key="battery.id" v-for="battery in batteries">
                <BatteryRow v-bind:battery="battery" /> 
            </tbody>
        </table>
    </div>

</template>


<script>

import BatteryRow from '@/components/dashboard/BatteryRow.Component.vue'
import axios from 'axios'

export default {
    name: "BatteryTable",
    components: {
        BatteryRow
    },
    data() {
        return {
            batteries: []
        }
    },
    mounted () {
        setInterval(() => {
            axios.get('http://localhost/api/storage', {params: {houseId: "0c988e3b-f1c2-404b-85b5-ac6b22b30948",}})
            .then(response => this.batteries = response.data)
        },1000);
    },
}
</script>

<style>
    #battery-table {
        width:48vw;
        float:right;

        height: 100%;
    }   
    #battery-table h2 {
        text-align: left;
        margin-left: 50px;
    }
    #battery-table table {
        text-align: right;

    } 
</style>