<template>
  <div id="current-state">
    <div> 
        <b> Coal Plant Status:  </b> <span>{{coalPlant.status}} </span><br>
        <b> Current Coal Capacity: </b> <span>{{coalPlant.currentCapacity.toFixed(2)}} kWh </span><br>
        <b> Max Coal Capacity:  </b> <span>{{coalPlant.maxCapacity.toFixed(2)}} kWh </span><br>
        <b> Buffer Percentage:  </b> <span>{{coalPlant.batteryPercentage.toFixed(2)*100}}% </span><br>

        <b> Current House Consumption:  </b> <span>{{currentConsumption.toFixed(2)}} kWh </span><br> 
        <b> System Power:  </b> <span>{{currentPower.toFixed(2)}} kWh </span><br> 
        <b> Current Price:  </b> <span>{{currentPrice.toFixed(2)}} sek/kWh </span><br> 
    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'CurrentState',
    props: ['coalPlant'],
    data() {
        return {
            currentConsumption: 0,
            currentPower: 0,
            currentPrice: 0,
        }
    },
    mounted() {
        setInterval(() => {
            axios.get('http://localhost/api/house')
                .then(response => {
                    this.currentConsumption = response.data.reduce((accumulated, currentRow) => accumulated + parseInt(currentRow.consumption), 0);
                });
            axios.get('http://localhost/api/systemPower')
                .then(response => {
                    this.currentPower = response.data.power;
                });
            axios.get('http://localhost/api/currentPrice')
                .then(response => {
                    this.currentPrice = response.data.price;
                });
        }, 1000);
        
    }
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
