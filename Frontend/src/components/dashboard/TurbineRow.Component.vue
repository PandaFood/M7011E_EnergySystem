<template>
    <tr>
        <td>{{turbine.id}}</td>
        <td>{{turbine.windSpeed}}</td>
        <td>{{turbine.currentProduction}}</td>
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