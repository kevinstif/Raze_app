<template>

  <v-main>
    <v-row>
      <v-col class="cardColumn mx-auto" :cols="post.isMain ? '12' : '6'" :md="post.isMain ? '4' : '3'"  v-for="post in posts" v-bind:key="post.id">
        <PostItem v-bind:post="post"></PostItem>
      </v-col>
    </v-row>

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
@media (max-width: 940px) {
  v-col{
    columns: 12;
  }
}
</style>