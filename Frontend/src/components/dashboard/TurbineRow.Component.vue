<template>
    <tr @click='openTab' v-bind:class="{'blackout-row' : turbine.status == 'down'}">
        <td>{{turbine.producerId.split('-')[0]}}...</td>
        <td>{{turbine.windSpeed.toFixed(2)}}</td>
        <td>{{turbine.energyProduced.toFixed(2)}}</td>
        <td>{{turbine.status}}</td>
    </tr>
</template>

<script>
export default {
    name: "TurbineRow",
    props: ["turbine"],
    methods: {
        openTab: function() {
            window.open('/wind?id='+this.turbine.producerId, '_blank');
        }
    }

}
</script>

<style scoped>


.broken-row {
    background: #ff8282;
}

.broken-row:hover {
    background: #e97878;
}

</style>