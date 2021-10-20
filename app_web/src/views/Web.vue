<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>
        <v-img :src="require('./img/Logo.png')"/>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <h3 >User Name</h3>
      <v-btn icon>
        <div>
          <v-img alt="photo of profile"></v-img>
        </div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn plain to="/home" color="white">HOME</v-btn>
      <v-btn plain to="/Posts" color="white">Posts</v-btn>
      <v-btn plain to="/Chat" color="white">Chat</v-btn>
      <v-btn plain to="/about" color="white">ABOUT</v-btn>

    </v-app-bar>
    <v-main>
      <v-container fluid>
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
  name: 'Web',
}
</script>

<style>
body {
  background-color: #F7F8F3;
}
</style>
