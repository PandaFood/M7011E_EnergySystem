<template>
    <modal name="house-modal" :width="800" :height="550">
        <div id="house-control">
            <h1> House Control </h1>
            <p> Set how much of generated power should go to the battery: </p>
            <div id="slider-div"> 
                <input v-model="newPercentage" type="range" name="percent" min="0" max="100"> 
                <h2> {{this.newPercentage}} % </h2>
            </div>

            <br>

            <p> Set how much power the house consumes: </p>
            <div class="input"> <b>Consumption:</b> <input v-model.number="consumption" type="number"><br> </div> 

            <input class="button" id="updateButton" type="button" v-on:click="update" value="Update">
            <input class="button" id="closeButton" type="button" v-on:click="closeModal" value="Close">
        </div>
    </modal>
</template>

<script>

import axios from 'axios'


export default {
    name: "HouseControl",
    props: ['houseId'],
    data() {
        return {
            newPercentage: 0,
            consumption: 0,
        }
    },
    methods: {
        update: function() {

            if (typeof(this.consumption) == "string") {
                this.flash("Input consumption is not number", 'warning');
            } else if (this.consumption < 0) {
                this.flash("Input consumption can not be negative", 'warning');
            } else {      
                const data = {
                    batteryPercentage: (this.newPercentage / 100).toFixed(2),
                    consumption: this.consumption,
                }
                axios.post('/api/house/'+this.houseId, {data}, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.flash(response.data, 'success');
                        this.closeModal();
                    })
                    .catch(err => {
                        this.flash(err.response.data, 'error');
                    });
            }
        },
        closeModal: function() {
            this.$modal.hide('house-modal');
        }
    },
    mounted() {
        axios.get('/api/house/'+this.houseId, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
            .then(response => {
                this.newPercentage = response.data[0].batteryPercentage * 100;
                this.consumption = response.data[0].consumption;
            })
            .catch(err => {
                this.flash(err.response.data, 'error');
            });
    }
}
</script>

<style scoped>

    #house-control {
        /* width: 50%; */
        text-align: left;
        padding-top: 40px;
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
        width: 100%;
        margin-left: 75px;
        font-size: 18px;
        text-align: left;
        margin-bottom: 30px;
    }

    .button {
        margin-right: 50px;
        width: 120px;
        height: 70px;
        margin-top: 20px;
    }


    #updateButton, #closeButton {
        float: right;
    }
</style>