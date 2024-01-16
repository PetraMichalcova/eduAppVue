<script setup lang="ts">
import AppButton from '../components/AppButton.vue'
</script>

<template>
  <div class="holder p">
    <img src="../assets/logo.png" width="200" height="200">
  </div>

  <div class="holder p">
    <h2 class="realistic-marker-highlight">
      ¡Bienvenidos!
    </h2>
  </div>

  <div class="holder p3">
    <div class="col-lg-4">

      <div>
        <div class="form-group">
          <div class="input-group mt-4 mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg></span>
            </div>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Email" ref="userMailRef">
          </div>
        </div>

        <div class="form-group mt-4 mb-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                  <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                </svg></span>
            </div>
            <input type="password" class="form-control mt-4" id="exampleInputPassword1" placeholder="Password"
              ref="userPasswdRef">
          </div>
        </div>

        <div class="sub-holder">
          <AppButton :text="dynamicTextBtn" @click="verify()"></AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      dynamicTextBtn: "Log In"
    };
  },
  methods: {
    verify() {
      const url = 'http://localhost/php/php_vue/verify.php';
      const userPasswdValue = this.$refs.userPasswdRef.value;
      const userMailValue = this.$refs.userMailRef.value;
      const data = JSON.stringify({
        key1: userMailValue,
        key2: userPasswdValue
      });
      axios.post(url, data)
        .then(response => {
          if (response.data == true)
            this.$router.push('/navigation');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
}
</script>

<style scoped>
.p {
  padding-top: 50px;
}

.sub-holder {
  width: 100;
  display: flex;
  justify-content: center;
  margin-top: 10%;
}

.holder {
  display: flex;
  justify-content: center;
}

form {
  margin-top: 30px;
}

.form-control {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
  border-bottom: 1px solid rgb(85, 107, 47);
  ;
  background-color: transparent;
  color: white;
}

.form-control:focus {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
  border-bottom: 1px solid rgb(85, 107, 47);
  background-color: transparent;
  color: rgb(85, 107, 47);
  box-shadow: none !important;
  transition: none;
}

.form-control::placeholder {
  color: rgb(85, 107, 47);
  font-size: large;
}

#btn-oval {
  border-radius: 50%;
  background-color: rgb(85, 107, 47);
  ;
  color: white;
  width: 30%;
  font-size: larger;
  font-weight: 700;
  border: 0;
  box-shadow: none;
}

#btn-oval:hover {
  border-radius: 50%;
  background-color: rgb(85, 107, 47);
  ;
  color: white;
  width: 30%;
  font-size: larger;
  font-weight: 700;
  border: 0;
  box-shadow: none;
}

a:hover {
  box-shadow: none !important;
  background-color: transparent;
}

.btn {
  margin-bottom: 4% !important;
  font-size: large;
  color: white;
}

h2 {
  color: rgb(85, 107, 47);
  ;
  font-weight: bold;
  font-size: 50px;
}


.realistic-marker-highlight {
  position: relative;
}

.realistic-marker-highlight:before {
  content: "";
  background-color: #e8ccd7;
  width: 100%;
  height: 1em;
  position: absolute;
  z-index: -1;
  filter: url(#marker-shape);
  left: -0.25em;
  top: 0.5em;
  padding: 0 0.25em;
  border: solid;
  border-color: #e8ccd7;
  border-radius: 40%;
}

.input-group-text {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgb(85, 107, 47);
  ;
  border-radius: 0px;
}

* {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 25px;
  font-weight: 500;
  color: rgb(85, 107, 47);
}</style>  

