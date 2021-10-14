<template>
  <v-container>
    <div class="center">
      <v-btn to="/addPost" icon color="black" >
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
    </div>
    <PostList v-bind:posts="posts" ></PostList>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import PostList from "./post-list";

export default {
  name: "post-manager",
  components: {PostList},
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
  },
  mounted() {
    this.retrieveTutorials();
  }
}
</script>

<style scoped>



.center{
  width: 5%;
  margin: auto;
}

</style>