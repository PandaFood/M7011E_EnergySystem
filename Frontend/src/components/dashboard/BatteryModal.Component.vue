<template>
    <modal name="battery-modal" class="battery-modal">
        <h3>Create new Battery</h3>
        <div id="form-div">
            Please enter Maximum Capacity betweeon <b>1</b> and <b>200</b> for the new battery:
            <form>  
                <div class="input"> <b>Maximum Capacity:</b> <input id="input" v-model.number="capacity" type="number"><br> </div> 
                <input class="button" id="createButton" type="button" v-on:click="submit" value="Create">
                <input class="button" id="closeButton" type="button" v-on:click="closeModal" value="Close">
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

            if(this.capacity > 200 || this.capacity <= 0) {
                this.flash("Size out of bounds", 'warning');
            } else if(typeof(this.capacity) == "string") {
                this.flash("Size is not a number", 'warning');
            } else {
                const data = {
                    houseId: this.houseId,
                    maxCapacity: this.capacity,
                    currentCapacity: 0
                }
                axios.post('/api/storage', {data}, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
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
            this.$modal.hide('battery-modal');
        }
    },
    data() {
        return {
            capacity: 1,
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

    #createButton, #closeButton {
        float: right;
    }

    #closeButton {
        margin-right: -25px;
    }

    #input {
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