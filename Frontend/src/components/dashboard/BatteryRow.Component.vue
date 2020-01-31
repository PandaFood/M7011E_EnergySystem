<template>
    <tr @click='openBattery'>
        <td>{{battery.id.split('-')[0]}}...</td>
        <td>{{battery.currentCapacity.toFixed(2)}}</td>
        <td>{{battery.maxCapacity.toFixed(2)}}</td>
        <td>{{(battery.currentCapacity/battery.maxCapacity*100).toFixed(2)}}</td>
    </tr>
</template>

<script>
export default {
    name: "BatteryRow",
    props: ["battery"],

    methods: {
        openBattery: function() {
            window.location.href = '/battery?id='+this.battery.id;
        }
    }
}
</script>

<style scoped>

</style>