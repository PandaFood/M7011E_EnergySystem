<template>
      <div id="login-module">
        
        <form action="" method="post">
          
            <div class="container">
              <label for="email"><b>Email</b></label>
              <input type="email" v-model="form.email" placeholder="Enter Email" name="email" required>
          
              <label for="psw"><b>Password</b></label>
              <input type="password" v-model="form.password" placeholder="Enter Password" name="psw" required>
          
              <button @click.prevent="getLogin">Login</button>
              <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
              </label>
            </div>
          
            <div class="container" style="background-color:#f1f1f1">
              <span class="qtext">Forgot <a href="#">password?</a></span>
              <span class="qtext">Create <a href="/register">new account!</a></span>
            </div>
          </form> 

    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    getLogin: function() {
      const here = this;
      if(this.form.email == null || this.form.password == null)
        return false;

      axios.post('/auth/oauth/token/new', {
          email: this.form.email,
          password: this.form.password
        })
        .then(function (response) {
          localStorage.setItem("jwt", response.data.accesstoken);
          here.$router.push('/');
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

 /* Bordered form */
 form {
  border: 3px solid #f1f1f1;
  width: 20em;
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
  width: auto;
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




</style>
