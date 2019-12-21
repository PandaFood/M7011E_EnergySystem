<template>
  <div id="current-state">
    <div> 
        <b> Current Production:  </b> <span>{{currentProduction}} kWh </span><br>
        <b> Current Consumption:  </b> <span>{{currentConsumption}} kWh </span><br> 
        <b> Net Production:  </b> <span>{{netProduction}} kWh </span><br> 
        <b> Current Price:  </b> <span>{{currentPrice}} sek/kWh </span><br> 
    </div>

  </div>
</template>

<script>

export default {
    name: 'CurrentState',
    data() {
        return {
            currentProduction: 10,
            currentConsumption: 5,
            netProduction: 5,
            currentPrice: 10

        }
    },
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #current-state {
        width: 100vw;
        font-size: 20px;
        /* height: 10vw; */
        margin-top: 5vh;
        display: block;

    }

    #current-state div {
        float: right;
        margin-right: 5vw;
        width: 400px;
    }

    b {
        float: left;
    }
    span {
        float: right;
    }
</style>
