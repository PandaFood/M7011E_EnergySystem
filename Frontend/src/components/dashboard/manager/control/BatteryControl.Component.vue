<template>
    <div id="battery-control">
        <h1> Battery Control </h1>
        <p> Set how much of generated power should go to the battery: </p>
        <div id="slider-div"> 
            <input v-model="newPercentage" type="range" name="percent" min="0" max="100"> 
            <h2> {{this.newPercentage}} % </h2>
        </div>

      <button class="button" v-on:click="updatePercentage">Update</button>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: "BatteryControl",
    props: ['coalPlant'],
    data() {
        return {
            newPercentage: this.coalPlant.batteryPercentage * 100
        }
    },
    methods: {
        updatePercentage: function() {
            const data = {
                newPercentage: this.newPercentage/100
            }
            axios.post('http://localhost/api/coal/battery', {}, {data, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
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