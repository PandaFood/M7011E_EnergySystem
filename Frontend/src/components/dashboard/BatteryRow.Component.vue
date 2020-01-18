<template>
    <tr @click='openTab'>
        <td>{{battery.id.split('-')[0]}}...</td>
        <td>{{battery.currentCapacity.toFixed(2)}}</td>
        <td>{{battery.maxCapacity.toFixed(2)}}</td>
        <td>{{(battery.currentCapacity/battery.maxCapacity).toFixed(2)*100}}</td>
    </tr>
</template>

<script>
export default {
    name: "BatteryRow",
    props: ["battery"],

    methods: {
        openTab: function() {
            window.open('/battery?id='+this.battery.id, '_blank');
        }
    }
}
</script>

<style scoped>

</style>