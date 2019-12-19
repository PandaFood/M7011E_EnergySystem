<template>
      <div id="register">
        
        <form action="/auth/user/add" method="post" id="registerform">
          
            <div class="container">
              <label for="name"><b>Name</b> <span class="required">*</span></label>
              <input v-model="form.name" type="text" name="name" required>

              <label for="adress"><b>Adress</b><span class="required">*</span></label>
              <input v-model="form.adress" type="text" name="adress" required>
              
              <label for="co"><b>C/O</b></label>
              <input v-model="form.co" type="text" name="co">

              <label for="city"><b>City</b><span class="required">*</span></label>
              <input v-model="form.city" type="text" name="city" required>

              <label for="country"><b>Country</b><span class="required">*</span></label>
              <input v-model="form.country" type="text" name="country" required>

              <label for="email"><b>Email</b><span class="required">*</span></label>
              <input v-model="form.email" type="email" name="email" required>
          
              <label for="psw"><b>Password</b><span class="required">*</span></label>
              <input v-model="form.password" type="password" name="psw" required>
          
              <button @click.prevent="register">Register</button>
            </div>
          </form> 

          <div class="container" style="background-color:#f1f1f1">
            <form action="/">
              <button type="submit" class="cancelbtn">Cancel</button>
            </form>
          </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        name: null,
        adress: null,
        co: null,
        city: null,
        country: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    register: function() {
      const here = this;
      if(this.form.name == null || 
      this.form.adress == null || 
      this.form.city == null || 
      this.form.country == null || 
      this.form.email == null || 
      this.form.password == null)
        return false;

      axios.post('/auth/user/', {
          name: this.form.name,
          adress: this.form.adress,
          co: this.form.co,
          city: this.form.city,
          country: this.form.country,
          email: this.form.email,
          password: this.form.password
        })
        .then(function () {
          here.$router.push('/login');
        })
        .catch(function (error) {
          console.log(error);
      });
    },

  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div#register {
  width: 20em;
  margin: auto;
} 
 
/* Bordered form */
form#registerform {
  border: 3px solid #f1f1f1;
  margin: auto;
  margin-top: 5em;
}

/* Full-width inputs */
input[type=text], input[type=password], input[type=email] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: rgba(166, 182, 173, 0.856);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: inherit;
  margin: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.qtext {
  padding-top: 4px;
  display: inherit;
}

span.required {
  color: red;
}


</style>
