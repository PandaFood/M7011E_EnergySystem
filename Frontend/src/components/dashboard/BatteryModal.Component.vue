<template>
    <modal name="battery-modal" class="battery-modal">
        <h3>Create new Battery</h3>
        <div id="form-div">
            Please enter Maximum Capacity betweeon <b>0</b> and <b>200</b> for the new battery:
            <form>  
                <div class="input"> <b>Maximum Capacity:</b> <input v-model.number="capacity" type="number"><br> </div> 
                <input class="button" type="button" v-on:click="submit" value="Create">
            </form>
        </div>
    </modal>
</template>

<script>
import axios from 'axios'

export default {
    name: "BatteryModal",
    props: ["houseId"],
    methods: {
        submit: function(){

            if(this.capacity > 200 || this.capacity < 0) {
                this.flash("Size out of bounds", 'warning');
            } else if(typeof(this.capacity) == "string") {
                this.flash("Size is not a number", 'warning');
            } else {
                const data = {
                    houseId: this.houseId,
                    maxCapacity: this.capacity,
                    currentCapacity: 0
                }
                axios.post('http://localhost/api/storage', {data}, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                    .then(response => {
                        this.flash(response.data, 'success');
                    })
                    .catch(err => {
                        this.flash(err.response.data, 'error');
                    });
            }
        }
    },
    data() {
        return {
            capacity: 0,
        }
    },
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
        width: 120px;
        height: 70px;
        margin-top: 20px;
    }

    .input{
        margin: 20px;
    }
</style>