<template>
  <div id="dashboard">
    <div id="button-div"> 
      <button class="button" v-on:click="openTab">Control Panel</button>
    </div>
    <div id="table-div">
      <UserTable />
    </div>
  </div>
</template>

<script>
import UserTable from '@/components/dashboard/manager/UserTable.Component.vue'

export default {
  name: 'ManagerDashboard',
  components: {
    UserTable,
  },
  methods: {
        openTab: function() {
            window.open('/manage/control', '_blank');
        }
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

    #button-div {
      float: left;
      margin-left: 100px;
    }

</style>
