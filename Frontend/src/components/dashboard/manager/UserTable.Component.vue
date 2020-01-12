<template>
    <div id="user-table">
        <h2>Users</h2>
        
        <table>
            <tr id="table-header">
                <th> Id </th>
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
            users: []
        }
    },
    mounted () {
        this.$nextTick(function () {
            axios.get('http://localhost/auth/user/', {params: {}, headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}})
            .then(response => this.users = response.data)
        });
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