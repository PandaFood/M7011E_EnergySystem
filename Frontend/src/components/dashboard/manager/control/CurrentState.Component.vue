<template>
  <div id="current-state">
        <h1> Current State </h1> 
    <div>
        <b> Coal Plant Status:  </b> <span>{{coalPlant.status}} </span><br>
        <b> Current Coal Capacity: </b> <span>{{coalPlant.currentCapacity.toFixed(2)}} kWh </span><br>
        <b> Max Coal Capacity:  </b> <span>{{coalPlant.maxCapacity.toFixed(2)}} kWh </span><br>
        <b> Battery Percentage:  </b> <span>{{coalPlant.batteryPercentage}}% </span><br>

        <b> Current House Consumption:  </b> <span>{{currentConsumption.toFixed(2)}} kWh </span><br> 
        <b> System Power:  </b> <span>{{currentPower.toFixed(2)}} kWh </span><br> 
        <b> Current Price:  </b> <span>{{price.currentPrice.toFixed(2)}} sek/kWh </span><br> 
    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'CurrentState',
    props: ['coalPlant', 'price'],
    data() {
        return {
            currentConsumption: 0,
            currentPower: 0,
            interval: {},
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.interval = setInterval(() => {
                axios.get('/api/house', {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.currentConsumption = response.data.reduce((accumulated, currentRow) => accumulated + parseInt(currentRow.consumption), 0);
                    });
                axios.get('/api/systemPower', {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.currentPower = response.data.power;
                    });
                
            }, 1000);
        });
    },
    destroyed() {
        clearInterval(this.interval);
    }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #current-state {
        width: 40%;
        /* height: 10vw; */
        text-align: left;
        float: right;
    }

    #current-state div {
        margin-left: 20px;
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
