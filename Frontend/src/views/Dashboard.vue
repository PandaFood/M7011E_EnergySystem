<template>
  <div class="home">
    <Header />
    <Dashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/dashboard/Dashboard.Component.vue'

export default {
  name: 'home',
  components: {
    Dashboard
  }
}
</script>
