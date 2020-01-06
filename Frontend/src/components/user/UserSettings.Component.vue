<template>
  <div id="">
    <h2>User settings page</h2>
    <span> Name: {{userInfo.name}} <br/></span>
    <span> Email: {{userInfo.email}} <br/></span>
    <span> Adress: {{userInfo.adress}} <br/></span>
    <span> Name: {{userInfo.city}} <br/></span>
    <span> C/O: {{userInfo.co != null ? userInfo.co : "N/A" }} <br/></span>
  </div>
</template>

<script>
//import CurrentState from '@/components/dashboard/CurrentState.Component.vue'
import axios from 'axios';


export default {
  name: 'UserSettings',
  components: {
  },
  data() {
    return {
      userInfo: {
        id: null,
        name: null,
        adress: null,
        city: null,
        co: null,
        country: null,
        email: null,
      }
    }
  },
  created() {
    const here = this;
    console.log(this.$route);
    axios.get('/auth/user/' + here.$route.params.id, {
        })
        .then(function (response) {
          console.log(response.data);
          let res = response.data[0];
          here.userInfo.id = res.id;
          here.userInfo.name = res.name;
          here.userInfo.adress = res.adress;
          here.userInfo.city = res.city;
          here.userInfo.co = res.co;
          here.userInfo.country = res.country;
          here.userInfo.email = res.email;

        })
        .catch(function (error) {
          console.log(error);
      });
  },


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
