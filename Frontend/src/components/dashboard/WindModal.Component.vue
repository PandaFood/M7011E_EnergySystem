<template>
    <modal name="wind-modal" class="wind-modal">
        <h3>Create new Wind Turbine</h3>
        <div id="form-div">
            Please enter coordinates between <b>0</b> and <b>200</b> for the new wind turbine:
            <form>  
                <div class="input"> <b>Latitude:</b> <input v-model.number="lat" type="number"><br> </div> 
                <div class="input"> <b>Longitude:</b> <input v-model.number="lon" type="number"><br> </div>
                <input class="button" type="button" v-on:click="submit" value="Create">
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
            const data = {
                houseId: this.houseId,
                coords: [this.lat, this.lon],
                type: "Wind Turbine"
            }
            axios.post('http://localhost/api/producer', {data, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {
                    this.flash(response, 'success');
                })
                .catch(err => {
                    this.flash(err, 'error');
                });
        }
    },
    data() {
        return {
            lat: 0,
            lon: 0
        }
    },
    watch: {
        lat: function(newVal) {
            if(newVal > 200 || newVal < 0) {
                if(newVal > 200) this.lat = 200;
                if(newVal < 0) this.lat = 0;

                this.flash("Coordinate out of bounds", 'warning');
            } else if(newVal == "") {
                this.flash("Coordinate is not a number", 'warning');
                this.lat = 0;
            } else {
                this.lat = newVal;
            }
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

    input {
        float: right;
    }

    .button {
        margin-right: 50px;
        width: 80px;
        height: 50px;
        margin-top: 20px;
    }

    .input{
        margin: 20px;
    }
</style>