<template>
  <div id="house-settings">
    <h2>House settings</h2>
    
    <div id="info"> 
      <span> Consumption: {{house.consumption}} kWh <br/></span>
      <span> Battery Percentage: {{house.batteryPercentage.toFixed(2) * 100}}% <br/></span>
    </div>

    <div v-if="isAdmin">
        <input class="button" type="button" v-on:click="openTab" value="Open Dashboard">
    </div>
  </div>
</template>

<script>
//import CurrentState from '@/components/dashboard/CurrentState.Component.vue'


export default {
  name: 'HouseSettings',
  components: {
  },
  props: ['house'],
  methods: {
      openTab: function() {
          window.location.href = '/dashboard/'+this.house.id;
      }
  },
  computed: {
    isAdmin () {
      return localStorage.getItem("role") == "ADMIN" ? true : false;
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #house-settings{
    float: right;
    width: 50%;
    padding-top: 50px;
    
    font-size: 20px;
    text-align: left;
    height: 300px;
  }

  span {
    margin-left: 75px;
  }

  h2 {
    margin-left: 50px;
  }

  #info {
    float: left;
    width: 100%;
  }

  .button {
    float: right;
    margin-right: 50px;
  }

</style>
