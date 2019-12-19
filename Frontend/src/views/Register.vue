<template>
  <div class="home">
    <Header />
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/user/Register.Component.vue'

export default {
  name: 'home',
  components: {
    Register
  }
}
</script>
