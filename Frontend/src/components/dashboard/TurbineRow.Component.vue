<template>
    <tr @click='openTurbine' v-bind:class="{'blackout-row' : turbine.status == 'down'}">
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
        openTurbine: function() {
            window.location.href = '/wind?id='+this.turbine.producerId;
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