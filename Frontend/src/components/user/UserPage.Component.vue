<template>
    <div>
        <UserSettings v-bind:user="user"/>
        <HouseSettings v-bind:house="house"/>
        <HouseControl v-bind:house="house"/>
        
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
            }
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
                console.log(error);
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
                console.log(error);
            });
        }, 1000);

    },

    
}
</script>

<style scoped>

</style>