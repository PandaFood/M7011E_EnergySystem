<template>
  <div id="dashboard">
    <WindModal v-bind:houseId="houseId"/>
    <CurrentState v-bind:houseId="houseId"/>

    <div id="button-div"> 
      <button v-on:click="openModal">Add Wind Turbine</button>
      <button v-on:click="openModal">Add Battery</button>
    </div>
    <div id="table-div">
      <TurbineTable v-bind:houseId="houseId"/>
      <BatteryTable v-bind:houseId="houseId"/>
    </div>
  </div>
</template>

<script>
import CurrentState from '@/components/dashboard/CurrentState.Component.vue'
import TurbineTable from '@/components/dashboard/TurbineTable.Component.vue'
import BatteryTable from '@/components/dashboard/BatteryTable.Component.vue'
import WindModal from '@/components/dashboard/WindModal.Component.vue'

export default {
  name: 'Dashboard',
  components: {
    CurrentState,
    TurbineTable,
    BatteryTable,
    WindModal,
  },
  data() {
    return {
      houseId: 'b2c1509a-8447-4a87-9373-d483700fc887'
    }
  },
  methods: {
    openModal: function () {
      this.$modal.show('wind-modal');
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #table-div {
    clear: both;
    height: 300px;
    padding-top: 50px;
  }


  #table-header {
      background: lightgray;
  }

  table {
      border: 1px solid #444;
      border-spacing: 0px;
      width: 90%;
      margin: auto;

  }
  tbody {
      overflow: auto;
      height: 100%;

  }
  td {
      border-bottom: 1px solid #444;

  }

  th, td{
      padding: 10px;
      font-size: 18px;
  }

  tr:hover{
      background: #eee;
  }
  
  button {
    widows: 80px;
    height: 60px;
    margin: 20px;
    float: left;
  }

  #button-div {
    margin-left: 50px;
  }


</style>
