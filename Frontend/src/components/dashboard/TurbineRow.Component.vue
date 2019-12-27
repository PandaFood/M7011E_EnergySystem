<template>
    <tr>
        <td>{{turbine.producerId.split('-')[0]}}...</td>
        <td>{{turbine.windSpeed.toFixed(2)}}</td>
        <td>{{turbine.energyProduced.toFixed(2)}}</td>
        <td>{{turbine.status}}</td>
    </tr>
</template>

<script>
export default {
    name: "TurbineRow",
    props: ["turbine"]
}
</script>

<style scoped>

</style>