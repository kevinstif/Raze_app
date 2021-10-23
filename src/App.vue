<template>
  <v-app>
    <v-main class="bc">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.bc{
  background-color: #F7F8F3;
}
</style>