<template>
  <div id="dashboard">
    <CurrentState />
    <div id="table-div">
      <TurbineTable />
      <BatteryTable />
    </div>
  </div>
</template>

<script>
import CurrentState from '@/components/dashboard/CurrentState.Component.vue'
import TurbineTable from '@/components/dashboard/TurbineTable.Component.vue'
import BatteryTable from '@/components/dashboard/BatteryTable.Component.vue'

export default {
  name: 'Dashboard',
  components: {
    CurrentState,
    TurbineTable,
    BatteryTable,
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

</style>
