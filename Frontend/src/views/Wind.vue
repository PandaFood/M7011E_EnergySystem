<template>
  <div class="home">
    <Header />
    <Graph/>
  </div>
</template>

<script>
// @ is an alias to /src
import Graph from '@/components/wind/Graph.Component.vue'

export default {
  name: 'home',
  components: {
    Graph
  }
}
</script>
