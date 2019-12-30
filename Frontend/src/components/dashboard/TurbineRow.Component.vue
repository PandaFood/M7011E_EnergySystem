<template>
    <tr @click='openTab'>
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
            window.open('http://localhost/wind?id='+this.turbine.producerId, '_blank');
        }
    }

}
</script>

<style scoped>

</style>