<template>
  <v-app>
    <v-app-bar app color="#f7855f">
      <div class="d-flex align-center mr-2">
        Raze
      </div>
      <!--
      <v-btn to="/interests" text>
        Interests
      </v-btn> -->

    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>