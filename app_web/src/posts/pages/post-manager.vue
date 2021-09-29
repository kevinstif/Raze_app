<template>
  <v-container>
    <AddPost v-on:add-post="addPost"></AddPost>
    <PostList v-bind:posts="posts" ></PostList>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import AddPost from "./add-post";
import PostList from "./post-list";

export default {
  name: "post-manager",
  components: {PostList, AddPost},
  data:()=>({
    posts:[],
  }),
  methods:{
    getDisplayTutorial(post){
      return {
        id:post.id,
        title:post.title,
        img:post.img,
        description:post.description,
        status: post.published
      }
    },
    retrieveTutorials(){
      PostServices.getAll()
          .then(response=>{
            this.posts=response.data.map(this.getDisplayTutorial);
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })
    },
    addPost(newPost) {
      PostServices.create(newPost)
          .then(response=>{
            newPost.id=response.data.id;
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
}
</script>

<style scoped>

</style>