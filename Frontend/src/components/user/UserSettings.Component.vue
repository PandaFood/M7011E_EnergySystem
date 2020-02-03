<template>
  <div id="user-settings">
    <div id="settings-div">
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <label>Upload Picture</label><br/>
              <input 
                type="file"
                ref="file"
                @change="onSelect"
              />
              <button>Submit</button>
              <h5>{{message}}</h5>
        </form>

      <h2>User settings</h2>
      <span> Name: {{user.name}} <br/></span>
      <span> Email: {{user.email}} <br/></span>
      <span> Adress: {{user.adress}} <br/></span>
      <span> City: {{user.city}} <br/></span>
      <span> C/O: {{user.co != null ? user.co : "N/A" }} <br/></span>
    </div>

    <div v-if="isUser" id="button-div">
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
      file: null,
      message: '',
    }
  },
  methods: {
     clicked : function(e) {
        if(!confirm('Are you sure?')){
          e.preventDefault();
        } else {
          Axios.delete('/auth/user/' + this.user.id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}}).then(() => {
            this.$router.push('/');
          })
        }
     },
     onSelect: function() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(file);
      if(!allowedTypes.includes(file.type)){
        this.message = "Filetype is wrong!!"
      }
      if(file.size>500000){
        this.message = 'Too large, max size allowed is 500kb'
      }
    },
      onSubmit: async function(){
        const formData = new FormData();
        formData.append('file',this.file);
        console.log(formData);
        try{
          await Axios.post('/auth/user/avatar', formData , { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}});
          this.message = 'Uploaded'
        }
        catch(err){
          console.log(err);
          this.message = err.response.data.error
        }
      }
  },
  computed: {
    isUser () {
      return this.userId == this.user.id ? false : true;
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #user-settings{
    float: left;
    height: 300px;
    padding-top: 50px;
    padding-left: 100px;
    font-size: 20px;
    text-align: left;
    width: 40%;
    display: inline-block;
  }

  span {
    padding-left: 20px;
  }

  #settings-div {
    float: left;
  }

  #button-div {
    margin-top: 170px;
    float: right;
    margin-left: 0;

    margin-right: 10%;
  }
    

  .button {
    margin-left: -100px;
  }


</style>
