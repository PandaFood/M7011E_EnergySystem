<template>
    <tr>
        <td>{{battery.id}}</td>
        <td>{{battery.currentCapacity}}</td>
        <td>{{battery.maxCapacity}}</td>
        <td>{{battery.fillPercentage}}</td>
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