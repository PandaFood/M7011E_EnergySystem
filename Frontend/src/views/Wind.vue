<template>
  <div class="home">
    <Header />
    <WindTab/>
  </div>
</template>

<script>
// @ is an alias to /src
import WindTab from '@/components/wind/WindTab.Component.vue'

export default {
  name: 'home',
  components: {
    WindTab
  }
}
</script>
