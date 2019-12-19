<template>
  <div class="home">
    <Header />
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/user/Login.Component.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
