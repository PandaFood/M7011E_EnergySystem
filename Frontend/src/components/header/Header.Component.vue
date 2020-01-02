<template>
  <div id="header">
    
    <a href="/">
        <img src='../../assets/img/gle.png'/>
    </a>

    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link> | 
      <a @click="logout" href="/">Log out</a>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout: function(){
      localStorage.removeItem("jwt");
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


</style>
