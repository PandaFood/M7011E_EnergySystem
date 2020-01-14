<template>
  <div>
    <h2>House settings</h2>
    <span> Consumption: {{house.consumption}} kWh <br/></span>
    <span> Battery Percentage: {{house.batteryPercentage.toFixed(2) * 100}}% <br/></span>
  </div>
</template>

<script>
//import CurrentState from '@/components/dashboard/CurrentState.Component.vue'


export default {
  name: 'HouseSettings',
  components: {
  },
  props: ['house'],
  created() {
    
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  div{
    float: right;
    /* height: 300px; */
    width: 50%;
    padding-top: 50px;
    
    /* padding-left: 100px; */
    font-size: 20px;
    text-align: left;
    /* padding-right: 100px; */
  }

  span {
    margin-left: 75px;
  }

  h2 {
    margin-left: 50px;
  }

    

</style>
