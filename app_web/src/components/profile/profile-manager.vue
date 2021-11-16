<template>
  <div id="app">
    <AvatarInput
        class="rounded-full rounded text-center mt-20 text-lg"
        v-model="form.avatar"
        default-src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"/>
    <div>
      <PostList v-bind:posts="posts" ></PostList>
    </div>
  </div>
</template>

<script>

import AvatarInput from "./profile-picture-input";
import UsersService from "../../users/services/users.services";
import PostServices from "../../posts/services/posts.services";
import PostList from "../../posts/pages/post-list";

export default {
  name: "profile",
  components: {
    PostList,
    AvatarInput,
  },
  data() {
    return {
      posts:[],
      currentUser:{},
      form: {
        avatar: null,
      },
    };
  },
  mounted() {
    this.retrieveCurrentUser()
  },
  methods: {
    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.id)
          .then(response=>{
            console.log(response.data)
            this.currentUser=response.data;
            this.retrievePosts();
          })
          .catch(e=>{
            console.log(e)
          })
    },
    retrievePosts(){
      PostServices.getAllByUserId(this.currentUser.id)
          .then(response=>{
            response.data.sort(this.compareRates);
            this.posts=response.data.map(this.getDisplayPost);
            console.log(this.posts)
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
        img:post.img,
        description:post.description,
        status: post.published,
        rate: post.rate,
        isMain: (index <= 2)
      }
    },
  },
};
</script>

<style>

</style>
