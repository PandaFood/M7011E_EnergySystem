<template>
  <div class="home">
    <Header />
    <Manager/>
  </div>
</template>

<script>
// @ is an alias to /src
import Manager from '@/components/dashboard/manager/ManagerDashboard.Component.vue'

export default {
  name: 'manager',
  components: {
    Manager
  }
}
</script>
