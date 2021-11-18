<template>
  <v-container>
    <div class="back">
      <v-btn icon>
        <v-icon @click="retrievePosts">fas fa-sync</v-icon>
      </v-btn>
    </div>
    <div class="search rounded-pill">
      <input type="text" placeholder="search" v-model="title">
      <v-btn class="button_search" icon @click="searchTitle">
        <v-icon>fas fa-search</v-icon>
      </v-btn>
    </div><br>

    <div class="center">
      <v-btn :to="{name: 'addPost', params: {userId: currentUser.id}}" icon color="black">
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
    </div>
    <PostList v-bind:posts="posts"></PostList>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import PostList from "./post-list";
import UsersService from "../../users/services/users.services";

export default {
  name: "post-manager",
  components: {PostList},

  data:()=>({
    posts:[],
    title:'',
    currentUser: {}
  }),
  mounted() {
    this.retrievePosts();
    this.retrieveCurrentUser();
  },
  methods:{
    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.userId)
          .then(response=>{
            console.log('Current id user: ' + this.$route.params.userId);
            this.currentUser=response.data;
            console.log('Current user: ' + response.data.name);
          })
          .catch(e=>{
            console.log(e)
          })
    },
    compareRates(post1, post2){
      return post2.rate - post1.rate;
    },
    getDisplayPost(post, index){
      return {
        id:post.id,
        title:post.title,
        img:post.image,
        description:post.description,
        status: post.published,
        rate: post.rate,
        isMain: (index <= 2),
        userId: post.userId
      }
    },
    retrievePosts(){
      PostServices.getAll()
          .then(response=>{
            response.data.sort(this.compareRates);
            this.posts=response.data.map(this.getDisplayPost);
            console.log(response.data);
            console.log(this.posts)
          })
          .catch(e=>{
            console.log(e)
          })
    },

    searchTitle(){
      PostServices.findByTitle(this.title)
          .then(response=>{
            this.posts=response.data.map(this.getDisplayPost);
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          });
      this.title='';
    }
  },

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
