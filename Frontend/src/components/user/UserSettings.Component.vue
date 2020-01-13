<template>
  <div>
    <h2>User settings</h2>
    <span> Name: {{user.name}} <br/></span>
    <span> Email: {{user.email}} <br/></span>
    <span> Adress: {{user.adress}} <br/></span>
    <span> City: {{user.city}} <br/></span>
    <span> C/O: {{user.co != null ? user.co : "N/A" }} <br/></span>
  </div>
</template>

<script>

export default {
  name: 'UserSettings',
  components: {
  },
  props: ['user'],
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
