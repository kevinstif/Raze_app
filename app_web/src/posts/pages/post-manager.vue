<template>
  <v-container>
    <div class="search rounded-pill">
      <input type="text">
      <v-btn class="button_search" icon>
        <v-icon>fas fa-search</v-icon>
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

.search{
  width: 30%;
  margin: auto;
  border: 1px solid #000000;

}

.search input{
  outline: none;
  padding: 0 20px;
  width: 90%;
  color: #000000;
}

.button_search{
  height: 20px;
  width: auto;
}

</style>