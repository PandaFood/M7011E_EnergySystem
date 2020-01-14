<template>
    <div id="house-control">
        <h1> House Control </h1>
        <p> Set how much of generated power should go to the battery: </p>
        <div id="slider-div"> 
            <input v-model="newPercentage" type="range" name="percent" min="0" max="100"> 
            <h2> {{this.newPercentage}} % </h2>
        </div>

        <p> Set how much power the house consumes: </p>
        <div class="input"> <b>Consumption:</b> <input v-model.number="consumption" type="number"><br> </div> 
      
      <button class="button" v-on:click="updatePercentage">Update</button>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: "HouseControl",
    props: ['house'],
    data() {
        return {
            newPercentage: this.house.batteryPercentage * 100,
            consumption: this.house.consumption,
        }
    },
    methods: {
        updatePercentage: function() {

            if (typeof(this.consumption) == "string") {
                this.flash("Input consumption is not number", 'warning');
            } else if (this.consumption < 0) {
                this.flash("Input consumption can not be negative", 'warning');
            } else {      
                const data = {
                    batteryPercentage: (this.newPercentage / 100).toFixed(2),
                    consumption: this.consumption,
                }
                axios.post('http://localhost/api/house/'+this.house.id, {}, {data, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.flash(response.data, 'success');
                    })
                    .catch(err => {
                        this.flash(err.response.data, 'error');
                    });
            }
        }
    }
}
</script>

<style scoped>

    #house-control {
        width: 50%;
        text-align: left;
        padding-top: 100px;
        float: right;
    }

    h1 {
        margin-left: 50px;
    }

    #slider-div {
        width: 80%;
        margin: auto;
    }

    .input {
        clear: both;
        font-size: 20px;
        margin-left: 75px;
        margin-bottom: 15px;

    }

    input[type="number"]{
        width: 50%;
        text-align: right;
        padding: 5px;
        margin-right: 50px;
        float: right;
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


    input[type=range] {
        -webkit-appearance: none;
        margin: 18px 0;
        width: 100%;
    }

    input[type=range]:focus {
        outline: none;
    }
    
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        background: #3071a9;
        border-radius: 1.3px;
        border: 0.2px solid #010101;
    }
    
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -14px;
    }
    
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #367ebd;
    }
    
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        background: #3071a9;
        border-radius: 1.3px;
        border: 0.2px solid #010101;
    }
    
    input[type=range]::-moz-range-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }
    
    input[type=range]::-ms-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
    }
    
    input[type=range]::-ms-fill-lower {
        background: #2a6495;
        border: 0.2px solid #010101;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    
    input[type=range]::-ms-fill-upper {
        background: #3071a9;
        border: 0.2px solid #010101;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    
    input[type=range]::-ms-thumb {
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        border: 1px solid #000000;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }
    
    input[type=range]:focus::-ms-fill-lower {
        background: #3071a9;
    }
    
    input[type=range]:focus::-ms-fill-upper {
        background: #367ebd;
    }
</style>