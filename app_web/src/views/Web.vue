<template>
  <v-app>
    <nav class="nav-bar">
      <img src="../img/Logo.png" alt="RazeApp Logo">
      <div class="nav-links" id="navLinks">
        <ul>
          <li>
            <v-btn icon class="white--text transparent btn" :to="{name:'Posts',params:{userId:currentUser.id}}">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </li>
          <li class="v-size--small">
            <v-btn icon :to="{name:'profile', params:{userId:currentUser.id}}">
              <img class="profile" v-bind:src="currentUser.imgProfile" width="10px">
            </v-btn>
          </li>
          <li>
            <v-btn icon class="white--text transparent" @click="logOut">
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-btn>
          </li>
        </ul>
      </div>
    </nav>


    <v-main class="main">
      <v-container class="container" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/compat";
import UserService from "../users/services/users.services"
import AuthService  from "../security/services/auth.service"
import router from "../router";

export default {
  name: 'Web',
  data() {
    return {
      currentUser: {},
      user: firebase.auth().currentUser
    }
  },
  mounted() {
    console.log('Current user id: ' + this.$route.params.id);
    this.retrieveCurrentUser();
  },
  methods: {
    retrieveCurrentUser(){
      UserService.getById(this.$route.params.userId)
          .then(response=>{
            console.log(response.data)
            this.currentUser=response.data;
          })
          .catch(e=>{
            console.log('Error: ' + e)
          })
    },
    logOut(){
      AuthService.logout()
      router.push('/');
    }
  }
}
</script>

<style lang="css">
.main {
  background-color: #F7F8F3;
  margin-top: 50px;
}
.container{
  width: 100%;
  margin: 0;
}
nav{
  max-height: 9vh;
  display: flex;
  padding: 0 2%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: #F7444E;

}
nav img{
  width: 120px;
  margin: 2% 1% 1%;
}

.nav-links{
  flex: 1;
  text-align: right;
}

.nav-links ul li{
  list-style: none;
  display: inline-block;
  padding: 8px 12px;
  position: relative;
}
.nav-links ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 13px;
}
.nav-links ul li::after {
  content: '';
  width: 0;
  height: 2px;
  background: #78BCC4;
  display: block;
  margin: auto;
  transition: 0.5s;
}
.nav-links ul li:hover::after{
  width: 100%;
}
.profile{
  height: 50px;
  width: 50px;
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
}
body {
  background-color: #F7F8F3;
}

.nav-bar{
  position: fixed;
  width: 100%;
  z-index: 100;
  box-shadow:  0 10px 10px  rgba(0, 0, 0, 0.2);
}

.btn{
  z-index: 100;
}
</style>
