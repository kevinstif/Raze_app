<template>
  <v-main>
    <v-row>
      <v-col class="mx-auto" v-for="comment in comments" v-bind:key="comment.id">
        <v-card outlined class="mx-auto">
          <v-card-title>{{ comment.userName }}</v-card-title>
          <v-card-text class="text--primary black--text">{{comment.text}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import PostServices from "../../posts/services/posts.services";

export default {
  name: "comment-list",
  data:()=>({
    comments:[]
  }),
  props:[
    "postId"
  ],
  mounted() {
    this.retrieveComments();
  },
  methods:{
    retrieveComments(){
      PostServices.getComments(this.postId)
          .then(response=>{
            this.comments=response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e)
          })
    }
  }
}
</script>

<style scoped>

</style>