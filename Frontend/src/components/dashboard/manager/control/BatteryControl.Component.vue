<template>
    <div id="battery-control">
        <h1> Battery Control </h1>
        <p> Set how much of generated power should go to the battery: </p>
        <div id="slider-div"> 
            <input v-model="percentage" type="range" name="percent" min="0" max="100"> 
            <h2> {{percentage}} % </h2>
        </div>

      <button class="button" v-on:click="updatePercentage">Update</button>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: "BatteryControl",
    props: ['coalPlant', 'batteryPercentage'],
    data() {
        return {
            percentage: this.batteryPercentage,
            loadNew: true,
        }
    },
    methods: {
        updatePercentage: function() {
            const data = {
                newPercentage: this.percentage/100
            }
            axios.post('/api/coal/battery', {data}, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.loadNew = true;
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        }
    },
    watch: {
        batteryPercentage: function(percentage) {
            if(this.loadNew){
                this.percentage = percentage;
                this.loadNew = false;
            }

        }
    }
}
</script>

<style scoped>

    #battery-control {
        width: 40%;
        text-align: left;
        padding-top: 50px;
        float: left;
    }

    h1 {
        margin-left: 50px;
    }

    #slider-div {
        width: 80%;
        margin: auto;
    }

    input {
        width: 100%;    
    }

    h2 {
        float: left;
        margin-left: 25px;
    }
    
    p {
        float: left;
        width: 70%;
        margin-left: 75px;
        font-size: 18px;
        text-align: left;
        margin-bottom: 30px;
    }

    button {
        float: right;
        margin-right: 50px;
        height: 60px;
    }
</style>