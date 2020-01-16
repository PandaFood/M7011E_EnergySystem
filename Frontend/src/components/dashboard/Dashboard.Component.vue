<template>
  <div id="dashboard">
    <WindModal v-bind:houseId="houseId"/>
    <BatteryModal v-bind:houseId="houseId"/>

    <CurrentState v-bind:houseId="houseId"/>

    <div v-if="isUser" id="button-div"> 
      <button class="button" v-on:click="openWindModal">Add Wind Turbine</button>
      <button class="button" v-on:click="openBatteryModal">Add Battery</button>
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
import BatteryModal from '@/components/dashboard/BatteryModal.Component.vue'

export default {
  name: 'Dashboard',
  components: {
    CurrentState,
    TurbineTable,
    BatteryTable,
    WindModal,
    BatteryModal,
  },
  data() {
    return {
      houseId: this.$route.params.houseId
    }
  },
  methods: {
    openWindModal: function () {
      this.$modal.show('wind-modal');
    },
    openBatteryModal: function () {
      this.$modal.show('battery-modal');
    },
  },
  mounted() {
    this.houseId = this.$route.params.houseId;
  },
  computed: {
        isUser () {
            return localStorage.getItem("role") == "USER" ? true : false;
        }
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  * {
    box-sizing: border-box;
  }
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

  

  #button-div {
    margin-left: 50px;
  }


</style>
