<template>
  <div>
    <div>
      <h2>User settings</h2>
      <span> Name: {{user.name}} <br/></span>
      <span> Email: {{user.email}} <br/></span>
      <span> Adress: {{user.adress}} <br/></span>
      <span> City: {{user.city}} <br/></span>
      <span> C/O: {{user.co != null ? user.co : "N/A" }} <br/></span>
    </div>
    <div>
      <input class="button" type="button" v-on:click="clicked(event)" value="Delete Account">
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'UserSettings',
  components: {
  },
  props: ['user'],
  data() { 
  return {
      userId: localStorage.getItem("userID"),
    }
  },
  methods: {
     clicked : function(e) {
        if(!confirm('Are you sure?')){
          e.preventDefault();
        } else {
          Axios.delete('/auth/user/' + this.userId, {headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}}).then(() => {
            localStorage.clear();
            window.location.href = "/";
          })
        }
      }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  div{
    float: left;
    height: 300px;
    padding-top: 50px;
    padding-left: 100px;
    font-size: 20px;
    text-align: left;
  }

  span {
    padding-left: 20px;
  }

    

</style>
