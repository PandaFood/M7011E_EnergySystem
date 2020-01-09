<template>
  <div class="home">
    <Header />
    <ControlPanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import ControlPanel from '@/components/dashboard/manager/control/ControlPanel.Component.vue'

export default {
  name: 'manager',
  components: {
    ControlPanel
  }
}
</script>
