<template>
    <tr @click='openTab' v-bind:class="{'blackout-row' : user.blackout}">
        <td>{{status}}</td>
        <td>{{user.name}}</td>
        <td>{{user.adress}} - {{user.city}} - {{user.country}}</td>
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
    </tr>
</template>

<script>
export default {
    name: "UserRow",
    props: ["user"],
    data() {
        return {
            status: "Working",
        }
    },
    methods: {
        openTab: function() {
            window.open('/u/'+this.user.id, '_blank');
        }
    },
    mounted() {
        if (this.user.blackout) {
            this.status = "BLACKOUT";
        } else {
            this.status = "Working";
        }
    },
    watch: {
        user: function(newUser) {
            if (newUser.blackout) {
                this.status = "BLACKOUT";
            } else {
                this.status = "Working";
            }
        }
    }
}
</script>

<style scoped>

.blackout-row {
    background: #ff8282;
}

.blackout-row:hover {
    background: #e97878;
}

</style>