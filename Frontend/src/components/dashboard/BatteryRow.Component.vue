<template>
    <tr>
        <td>{{battery.id.split('-')[0]}}...</td>
        <td>{{battery.currentCapacity.toFixed(2)}}</td>
        <td>{{battery.maxCapacity.toFixed(2)}}</td>
        <td>{{battery.fillCapacity*100}}</td>
    </tr>
</template>

<script>
export default {
    name: "BatteryRow",
    props: ["battery"]
}
</script>

<style scoped>

</style>