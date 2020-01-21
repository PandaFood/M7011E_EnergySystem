<template>
    <modal name="wind-modal" class="wind-modal">
        <h3>Create new Wind Turbine</h3>
        <div id="form-div">
            Please enter coordinates between <b>0</b> and <b>200</b> for the new wind turbine:
            <form>  
                <div class="input"> <b>Latitude:</b> <input v-model.number="lat" type="number"></div> 
                <div class="input"> <b>Longitude:</b> <input v-model.number="lon" type="number"></div>
                <input class="button" id="createButton" type="button" v-on:click="submit" value="Create">
                <input class="button" id="closeButton" type="button" v-on:click="closeModal" value="Close">
            </form>
        </div>
    </modal>
</template>

<script>
import axios from 'axios'

export default {
    name: "WindModal",
    props: ["houseId"],
    methods: {
        submit: function(){
            if((this.lat > 200 || this.lat < 0) || (this.lon > 200 || this.lon < 0)) {
                this.flash("Coordinate out of bounds", 'warning');
            } else if(typeof(this.lat) == "string" || typeof(this.lon) == "string") {
                this.flash("Coordinate is not a number", 'warning');
            } else {

                const data = {
                    houseId: this.houseId,
                    coords: [this.lat, this.lon],
                    type: "Wind Turbine"
                }
                axios.post('/api/producer', {data}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
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
            this.$modal.hide('wind-modal');
        }
    },
    data() {
        return {
            lat: 0,
            lon: 0
        }
    }
}
</script>

<style scoped>

    #form-div {
        padding-top: 20px;
        padding-left: 40px;
    }

    h3 {
        padding-left: 30px;
        padding-top: 10px;
    }

    form b {
        float: left;
    }

    #createButton, #closeButton {
        float: right;
    }

    #closeButton {
        margin-right: -25px;
    }

    .button {
        margin-right: 50px;
        width: 120px;
        height: 70px;
        margin-top: 20px;
    }

    .input{
        margin: 7px;
        float: right;
        margin-right: 50px;
        width: 60%;
    }

    .input input {
        float: right;
    }
</style>