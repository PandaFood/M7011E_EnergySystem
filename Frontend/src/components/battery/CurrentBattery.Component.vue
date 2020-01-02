<template>
  <div id="current-battery">
    <div> 
        <b> Current Capacity:  </b> <span>{{battery.currentCapacity.toFixed(2)}} kWh </span><br>
        <b> Max Capacity:  </b> <span>{{battery.maxCapacity.toFixed(2)}} kWh </span><br> 
        <b> Fill Percentage:  </b> <span>{{(battery.currentCapacity/battery.maxCapacity).toFixed(2)}} % </span><br> 
    </div>

  </div>
</template>

<script>


export default {
    name: 'CurrentBattery',
    props: ['battery'],
}

</script>

<style scoped>
    #current-battery {
        width: 100vw;
        font-size: 25px;
        margin-top: 50px;
        display: block;

    }

    #current-battery div {
        float: right;
        margin-right: 100px;
        width: 400px;
    }

    b {
        float: left;
    }
    span {
        float: right;
    }
</style>
