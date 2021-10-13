<template>
  <v-container>
    <AddPost></AddPost>
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
    compareRates(post1, post2){
      return post2.rate - post1.rate;
    },
    getDisplayPost(post, index){
      return {
        id:post.id,
        title:post.title,
        img:post.img,
        description:post.description,
        status: post.published,
        rate: post.rate,
        isMain: (index <= 2)
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
  },
  mounted() {
    this.retrievePosts();
  }
}
</script>

<style scoped>

</style>