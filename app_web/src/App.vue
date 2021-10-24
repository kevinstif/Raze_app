<template>

  <v-app>
    <nav>
      <img src="./img/Logo.png" alt="RazeApp Logo">
      <div class="nav-links" id="navLinks">
        <ul>
          <li>
            <v-btn class="white--text transparent" to="/">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </li>
          <li><v-btn class="white--text" text to="/interests">Interest</v-btn></li>
          <li><h3 class="white--text">User Name</h3></li>
          <li><v-btn icon>
            <img class="profile" src="./img/img.png">
          </v-btn></li>
        </ul>
      </div>
    </nav>


    <v-main class="main">
      <v-container class="container" fluid>
        <router-view/>
      </v-container>
    </v-main>
    <!--Razze chat
   <div id="app">

</div>
-->
  </v-app>
</template>

<script>
import firebase from "firebase/compat";
export default {
  data() {
    return {
      user: firebase.auth().currentUser
    }
  },
  name: 'App',
}
</script>

<style lang="css">
.main {
  background-color: #F7F8F3;
}
.container{
  width: 85%;
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
  width: 25%;
  margin: 0;
}
</style>
