<template>
  <div id="current-state">
    <div> 
        <b> Current Production:  </b> <span>{{currentProduction.toFixed(2)}} kWh </span><br>
        <b> Current Consumption:  </b> <span>{{currentConsumption.toFixed(2)}} kWh </span><br> 
        <b> Net Production:  </b> <span>{{(currentProduction - currentConsumption).toFixed(2)}} kWh </span><br> 
        <b> Current Price:  </b> <span>{{currentPrice.toFixed(2)}} sek/kWh </span><br> 
    </div>

  </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'CurrentState',
    data() {
        return {
            currentProduction: 0,
            currentConsumption: 0,
            currentPrice: 0,
            interval: {},
        }
    },
    props: ["houseId"],
    mounted() {
        this.$nextTick(function () {
            this.interval = setInterval(() => {
                
                axios.get('/api/allLatestProducerEvent', { params: {houseId: this.houseId,}, headers: {Authorization:'Bearer ' + localStorage.getItem('jwt') }})
                    .then(response => {
                        let currentProduction = 0;
                        response.data.forEach((producer) => {
                            currentProduction += producer.energyProduced;
                        });
                        this.currentProduction = currentProduction;
                    }).catch(err => {
                        this.flash(err, 'error');
                    });
                
                axios.get('/api/house/'+this.houseId, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        if(response.data.length > 0){
                            this.currentConsumption = response.data[0].consumption;
                        } else {
                            throw "ERROR: Could not fetch house, wrong ID";
                        }
                    }).catch(err => {
                        this.flash(err, 'error');
                    });
                axios.get('/api/currentPrice', {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.currentPrice = response.data.price;
                    }).catch(err => {
                        this.flash(err, 'error');
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
