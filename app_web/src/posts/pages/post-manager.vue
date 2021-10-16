<template>
  <v-container>
    <div class="back">
      <v-btn>
        <v-icon @click="retrieveTutorials">fas fa-arrow-left</v-icon>
      </v-btn>
    </div>
    <div class="search rounded-pill">
      <input type="text" placeholder="search" v-model="title">
      <v-btn class="button_search" icon @click="searchTitle">
        <v-icon>fas fa-search</v-icon>
      </v-btn>
    </div><br>

    <div class="center">
      <v-btn to="/addPost" icon color="black">
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
    title:'',
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
    searchTitle(){
      PostServices.findByTitle(this.title)
          .then(response=>{
            this.posts=response.data.map(this.getDisplayTutorial);
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          });
      this.title='';
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
}
</script>

<style scoped>

.center {
  width: 5%;
  margin: auto;
}
.search{
  margin: auto;
  width: 30%;
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

.back{
  width: 5%;
}
</style>