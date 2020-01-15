<template>
    <div>
        <UserSettings v-bind:user="user"/>
        <HouseSettings v-bind:house="house"/>
        <HouseControl v-bind:house="house"/>
        
        <span  v-if="admin">
            <h1> Ban user from selling to market </h1>

            <div id="slider-div"> 
                <input v-model="banTime" type="range" name="seconds" min="10" max="100"> 
                <h2> {{banTime}} seconds </h2>
            </div>
            <input class="button" type="button" v-on:click="banUser" value="Ban User"/>     
        </span>

    </div>
</template>

<script>
import axios from 'axios';

import UserSettings from '@/components/user/UserSettings.Component.vue'
import HouseSettings from '@/components/user/HouseSettings.Component.vue';
import HouseControl from '@/components/user/HouseControl.Component.vue';

export default {
    name: 'UserPage',
    data() {
        return {
            admin: localStorage.getItem("role") == "ADMIN" ? true : false,
            userId: this.$route.params.id,
            user: {
                id: null,
                name: null,
                adress: null,
                city: null,
                co: null,
                country: null,
                email: null,
            },
            house: {
                id: null,
                consumption: 0,
                batteryPercentage: 0,
            },
            banTime: 10,
        }
    },
    components: {
        UserSettings,
        HouseSettings,
        HouseControl,
    },
    mounted() {
        const here = this;
        axios.get('/auth/user/' + this.userId, {})
            .then(function (response) {
                let res = response.data[0];
                here.user.id = res.id;
                here.user.name = res.name;
                here.user.adress = res.adress;
                here.user.city = res.city;
                here.user.co = res.co;
                here.user.country = res.country;
                here.user.email = res.email;
                here.user.houseId = res.houseId;
            })
            .catch(function (error) {
                this.flash(error, "error");
            });

        setInterval(() => {

            axios.get('/api/house/' + here.user.houseId, {params: {storageId: here.user.houseId}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
            .then(function (response) {
                let res = response.data[0];
                here.house.id = res.id;
                here.house.consumption = res.consumption;
                here.house.batteryPercentage = res.batteryPercentage;
            })
            .catch(function (error) {
                this.flash(error, "error");
            });
        }, 1000);

    },
    methods: {
        banUser: function() {
            const data = {
                banTime: this.banTime,
                houseId: this.house.id,
            }
            axios.post('http://localhost/api/banUser', {}, {data, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(() => {
                    this.flash('User banned for ' + this.banTime + ' seconds', 'success');
                })
                .catch(err => {
                    this.flash(err.response.data, 'error');
                });
        }
    }

    
}
</script>

<style scoped>

span {
    float: left;
    margin-left: 50px;
}

.button {
    float: right;
}

h2 {
    float: left;
}

</style>