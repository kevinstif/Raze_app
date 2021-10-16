<template>
  <v-container>
    <div class="back">
      <v-btn icon color="black">
        <v-icon  @click="retrieveTutorials">fas fa-arrow-left</v-icon>
      </v-btn>
    </div>
    <div class="search rounded-pill">
      <input type="text" placeholder="search" v-model="title">
      <v-btn class="button_search" icon @click="searchTag">
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
import TagsServices from "../../tags/services/tags.sevices";
import PostList from "./post-list";

export default {
  name: "post-manager",
  components: {PostList},
  data:()=>({
    posts:[],
    title:'',
    tag:{
      id:0,
      title:'',
    }
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
    getDisplayTag(tag){
      return {
        id:tag.id,
        title:tag.title
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
    },
    getTag(){
      TagsServices.findByTitle(this.title)
          .then(response=>{
            this.tag=response.data.map(this.getDisplayTag);
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })
    },
    searchTag(){
      this.getTag()
      PostServices.findByTag(this.tag[0].id)
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