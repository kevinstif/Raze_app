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
      <v-btn plain to="/about" color="white">ABOUT</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
