<template>
    <div id="user-table">
        <h2>Users</h2>
        
        <table>
            <tr id="table-header">
                <th> Status </th>
                <th> Name</th>
                <th> Adress</th>
                <th> Email </th>
                <th> Role </th>
            </tr>
            <tbody v-bind:key="user.id" v-for="user in users">
                <UserRow v-bind:user="user" /> 
            </tbody>
        </table>
    </div>

</template>


<script>

import UserRow from '@/components/dashboard/manager/UserRow.Component.vue'
import axios from 'axios'

export default {
    name: "UserTable",
    components: {
        UserRow
    },
    data() {
        return {
            users: [],
        }
    },
    mounted () {
        
        setInterval(() => {

            axios.get('/auth/user/', {params: {},headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                .then(response => {

                    axios.get('/api/blackout/', {params: {},headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
                        .then(res => {                            
                            this.users = response.data;
                            
                            this.users.forEach(user => {
                                if (typeof(res.data[user.houseId]) !== 'undefined') {
                                    user.blackout = res.data[user.houseId];
                                } else {
                                    user.blackout = false;
                                }

                            });
                        }).catch(err => this.flash(err, 'error'));
                 })
                .catch(err => this.flash(err, 'error'));   
            
        }, 1000);
    },
}
</script>

<style>
    #user-table {
        width:auto;
        

        height: 100%;
    }   
    #user-table h2 {
        text-align: left;
        margin-left: 50px;
    }
    #user-table table {
        text-align: right;

    } 
</style>