<template>
    <tr @click='openTab'>
        <td>{{user.id}}</td>
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

    methods: {
        openTab: function() {
            window.open('http://localhost/user?id='+this.user.id, '_blank');
        }
    }
}
</script>

<style scoped>

</style>