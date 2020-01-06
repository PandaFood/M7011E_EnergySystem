<template>
  <div id="header">
    
    <a id="logo" href="/">
        <img src='../../assets/img/gle.png'/>
    </a>

    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <span  v-if="admin"><router-link to="/manage">Manage</router-link> | </span>
      <router-link to="/about">About</router-link> | 
      <a @click="logout" href="/">Log out</a>
    </div>

    <a id="profile" v-bind:href="'/u/'+ this.userID" >
        <img src='../../assets/img/user.png'/>
    </a>
   
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() { 
  return {
    admin: localStorage.getItem("role") == "ADMIN" ? true : false,
    userID: localStorage.getItem("userID"),
    }
  },
  methods: {
    logout: function(){
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      this.admin = false;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#header img{
  height: 5em;
}

#header {
  background-color: #DADADA;
  width: 100%;
}

#nav {
  display: inline-block;
}

.logo {
  float: left;
}

.profile {
  float: right;
}


</style>
