<template>
  <div class="home">
    <Header />
    <BatteryTab/>
  </div>
</template>

<script>
// @ is an alias to /src
import BatteryTab from '@/components/battery/BatteryTab.Component.vue'

export default {
  name: 'home',
  components: {
    BatteryTab
  }
}
</script>
