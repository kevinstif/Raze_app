<template>
  <v-container>
    <div class="back">
      <v-btn>
        <v-icon @click="onBack">fas fa-arrow-left</v-icon>
      </v-btn>
    </div>

    <div class="center">
      <v-card outlined class="mx-auto">
        <v-img :src="currentPost.img" class="cardImage white--text align-start" height="600px">
          <v-card-title class="white--text title">{{currentPost.title}}</v-card-title>
        </v-img>
        <v-card-text class="text--primary black--text">{{currentPost.description}}</v-card-text>
        <v-card-actions class="pa-3">
          <v-row>
            <v-col class="mx-auto" cols="12" md="3">
              <h5>Post Owner:
                <span class="userLink">{{postOwner.name}}</span>
              </h5>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="mx-auto">
              <h5>Rate this post:
                <v-rating
                    v-model="rated"
                    color="warning"
                    hover
                    length="5"
                    size="150%"
                ></v-rating>
              </h5>
            </v-col>
            <v-spacer></v-spacer>

            <v-col class="mx-auto">
              <h5>Current Rate:</h5>
              <v-icon color="warning" size="150%">mdi-star</v-icon>
              {{currentPost.rate}}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="mx-auto">
              <v-btn @click="RatePost" class="white--text" rounded width="10%" color="#002C3E" >Rate</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <CommentList v-bind:postId="currentPost.id"></CommentList>
    </div>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import UsersService from '../../users/services/users.services'
import CommentList from "../../comments/pages/comment-list";

export default {
  name: "post-detail",
  components: {CommentList},
  data: () => ({
    currentUser: {},
    currentPost: {},
    postOwner: {},
    rated: 0
  }),
  mounted(){
    this.retrieveCurrentUser();
    this.retrieveCurrentPost();
  },
  methods:{
    onBack(){
      this.$router.push('/posts');
    },
    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.userId)
          .then(response=>{
            this.currentUser=response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e)
          })
    },
    retrieveCurrentPost(){
      PostServices.getById(this.$route.params.postId)
          .then(response=>{
            this.currentPost=response.data;
            console.log(response.data);
            UsersService.getById(response.data.userId)
                .then(response=>{
                  this.postOwner=response.data;
                  console.log(response.data);
                })
                .catch(e=>{
                  console.log(e)
                })
          })
          .catch(e=>{
            console.log(e)
          })
    },
    RatePost(){
      var postUpdated = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        img: this.currentPost.img,
        description: this.currentPost.description,
        published: this.currentPost.status,
        tagId: this.currentPost.tagId,
        userId: this.currentPost.userId,
        rateNumber: this.currentPost.rateNumber + 1,
        rate: (((this.currentPost.rate * this.currentPost.rateNumber) + this.rated)/(this.currentPost.rateNumber + 1)).toFixed(1)
      }
      PostServices.update(this.currentPost.id, postUpdated)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      this.$router.push('/posts');
    }
  }
}
</script>

<style scoped>
.userLink:hover{
  color: #78BCC4;
  cursor: pointer;
}
.userLink::after {
  content: '';
  width: 0;
  height: 2px;
  background: #78BCC4;
  display: block;
  margin: auto;
  transition: 0.5s;
}
.userLink:hover::after{
  width: 100%;
}
.title{
  background-image: linear-gradient(rgba(28, 28, 30, 0.7), rgba(35, 35, 37, 0.7));
}
.center {
  width: 90%;
  margin: auto;
}
</style>