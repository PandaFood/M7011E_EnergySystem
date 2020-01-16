<template>
  <div id="header">
    
    <a id="logo" href="/">
        <img src='../../assets/img/gle.png'/>
    </a>

    <div id="nav">
      <span v-if="isUser"><router-link :to="{path: '/dashboard/'+houseId}">Dashboard</router-link> | </span>
      <span v-if="isAdmin"><router-link to="/manage">Manage</router-link> | </span>
      <router-link to="/about">About</router-link> 
      <span  v-if="userId" > | <a @click="logout" href="/">Log out</a> </span>
    </div>

    <a id="profile" v-bind:href="'/u/'+ this.userId" >
        <img src='../../assets/img/user.png'/>
    </a>
   
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() { 
  return {
      userId: localStorage.getItem("userID"),
      houseId: localStorage.getItem("houseId"),
    }
  },
  computed: {
    isAdmin () {
      return localStorage.getItem("role") == "ADMIN" ? true : false;
    },
    isUser () {
      return localStorage.getItem("role") == "USER" ? true : false;
    },
  },
  methods: {
    logout: function(){
      localStorage.clear();
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
