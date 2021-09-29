<template>
  <v-main>
    <div v-for="post in posts" v-bind:key="post.id">
      <PostItem v-bind:post="post"></PostItem>
    </div>
  </v-main>
</template>

<script>
import PostItem from "./post-item";
export default {
  name: "post-list",
  components: {PostItem},
  props:[
    "posts"
  ]
}
</script>

<style scoped>

</style>