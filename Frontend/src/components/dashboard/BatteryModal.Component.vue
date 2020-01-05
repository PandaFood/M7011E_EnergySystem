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
            const data = {
                houseId: this.houseId,
                maxCapacity: this.capacity,
                currentCapacity: 0
            }
            axios.post('http://localhost/api/storage', {data})
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    data() {
        return {
            capacity: 0,
        }
    },
    watch: {
        capacity: function(newVal) {
            if(newVal > 200 || newVal < 0) {
                if(newVal > 200) this.capacity = 200;
                if(newVal < 0) this.capacity = 0;

                console.log("out of limit") // TODO -- add correct error display
            } else if(newVal == "") {
                console.log("not a number") // TODO -- add correct error display
                this.capacity = 0;
            } else {
                this.capacity = newVal;
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