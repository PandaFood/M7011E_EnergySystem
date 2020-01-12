<template>
    <div id="price-control">
        <h1>Price Control </h1>

        <div id="price-div">
            <div id="current-price">
                <b> Current Price:  </b> <span>{{price.currentPrice.toFixed(2)}} sek/kWh </span><br> 
                <b> Calculated Price:  </b> <span>{{price.calculatedPrice.toFixed(2)}} sek/kWh </span><br> 
            </div>


            <div id="price-input">
                <label id="number">New Manual Price: <input type="number" v-model="newPrice" min="0"> Sek/kWh </label> 
                <br>
                <br>
                <label id="checkbox">Use Calculated Price <input type="checkbox" v-model="useCalculatedPrice"> </label>
            </div>
            <button class="button" v-on:click="updatePrice">Update</button>

        </div>
    </div>
</template>

<script>

import axios from 'axios'


export default {
    name: "PriceControl",
    props: ['price'],
    data() {
        return {
            newPrice: 0,
            useCalculatedPrice: false
        }
    },
    methods: {
        updatePrice: function() {
            const data = {
                price: this.newPrice,
                useCalculatedPrice: this.useCalculatedPrice
            }
            axios.post('http://localhost/api/currentPrice', {data, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.flash(response.data, 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        }
    },
    watch: {
        newPrice: function(newVal) {
            if(newVal < 0) {
                this.newPrice = 0

                this.flash("Price set to negative value", 'warning');
            } else if(newVal == "") {
                this.newPrice = 0;
                this.flash("Price is not a number", 'warning');
            } else {
                this.newPrice = parseInt(newVal);
            }
        }
    }
}
</script>

<style scoped>

    #price-control {
        width: 40%;
        float: right;
        text-align: left;
        padding-top: 50px;
    }

    button {
        float: right;
        margin-right: 50px;
        height: 60px;
    }

    #price-div {
        margin-left: 25px;
    }

    #current-price {
        margin-bottom: 40px;
    }

    #number input{
        text-align: right;
        padding: 5px;
        font-size: 18px;
        width: 30%;
    }

    #checkbox {
        height: 50px;
    }

    #number {
        height: 50px;
    }

    #price-input {
    }

</style>