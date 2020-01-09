<template>
  <div id="app">
    <flash-message class="flash-message"></flash-message>
    <Header />
     <router-view/>
  </div>
</template>


<script>
// @ is an alias to /src
import Header from '@/components/header/Header.Component.vue'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.flash-message {
  width: 30%;
  position: absolute;
  right: 10px;
}

</style>
