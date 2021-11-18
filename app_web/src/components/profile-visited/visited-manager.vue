<template>
  <div class="relative inline-block overflow-hidden">
    <div class="center">
      <img :src="currentUser.imgProfile" alt="MyProfile" class="my-avatar"/>
    </div>
    <div class="center">
      <v-btn class="" color="#002C3E" icon to="/Chat">
        <v-icon>mdi-message</v-icon>
      </v-btn>
    </div>
    <div class="center">
      <h3>{{currentUser.name}}</h3>
    </div>
    <div class="center">
      <AccessCalendar></AccessCalendar>
    </div>
    <PostList  v-bind:posts="posts"></PostList>
  </div>
</template>

<script>
import UsersService from "../../users/services/users.services";
import AccessCalendar from "../calendar/pages/access-calendar";
import PostList from "../../posts/pages/post-list";
import PostServices from "../../posts/services/posts.services";

export default {
  name: "visited-manager",
  components:{
    PostList,
    AccessCalendar
  },
  data:()=>({
    posts:[],
    currentUser:{}
  }),
  mounted() {
    this.retrieveCurrentUser();
  },
  methods: {

    retrieveCurrentUser() {
      UsersService.getById(this.$route.params.visitedId)
          .then(response => {
            console.log((this.$route.params.id))
            this.currentUser = response.data
            this.retrievePosts()
          })
          .catch(e => {
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
        isMain: (index <= 2),
        userId: post.userId
      }
    },
  }
}
</script>

<style scoped>

.my-avatar{
  text-align: center;
  height: 170px;
  width: 170px;
  border-radius: 100%;
  left: 50%;
  margin-top: 40px;
  object-fit: cover;
  object-position: center;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
