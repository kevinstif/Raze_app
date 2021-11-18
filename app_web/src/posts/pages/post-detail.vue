<template>
  <v-container>
    <div class="back">
      <v-btn>
        <v-icon @click="onBack">fas fa-arrow-left</v-icon>
      </v-btn>
    </div>

    <div class="center">
      <v-card outlined class="mx-auto">
        <v-img :src="currentPost.image" class="cardImage white--text align-start cardImg">
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
            <v-col class="mx-auto">
              <router-link :to="{name:'visited', params:{userId: currentUser.id, visitedId:postOwner.id}}" >
                <v-btn v-if="currentUser.id!=postOwner.id" class="white--text" rounded color="#002C3E" >
                  Contact
                </v-btn>
              </router-link>
              <router-link :to="{name:'profile', params:{userId: currentUser.id}}" >
                <v-btn v-if="currentUser.id==postOwner.id" class="white--text" rounded color="#002C3E" >
                  Profile
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <div v-for="comment in comments" v-bind:key="comment.id" class="wrap_text">
        <v-card outlined class="mx-auto comment" color="#adadad">
          <div v-for="user in users" v-bind:key="user.id">
            <div v-if="user.id === comment.userId">
              <v-card-title class="white--text justify-lg-start">{{user.name}}</v-card-title>
            </div>
          </div>
          <p class="text">{{comment.text}}</p>
        </v-card>
      </div>
      <v-card outlined class="mx-auto comment" color="#adadad">
        <v-card-title class="white--text justify-end">What do you think about the post</v-card-title>
        <v-container fluid>
          <v-textarea
              name="input-7-1"
              filled
              label="Write a comment here..."
              auto-grow
              background-color="white"
              clearable
              v-model="comment"
          ></v-textarea>
          <v-col class="mx-auto justify-end">
            <v-btn @click="AddComment" class="white--text" rounded width="10%" color="#002C3E" >Comment</v-btn>
          </v-col>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import UsersService from '../../users/services/users.services'
import CommentService from '../../comments/services/comments.services'

export default {
  name: "post-detail",
  data: () => ({
    currentUser: {},
    currentPost: {},
    postOwner: {},
    comments: [],
    users: [],
    rated: 0,
    comment: '',
  }),
  mounted(){
    this.retrieveCurrentUser();
    this.retrieveCurrentPost();
    this.retrieveUsers();
  },
  methods:{
    onBack(){
      this.$router.push(`/web/${this.currentUser.id}/posts`);
    },
    AddComment(){
      const newComment={
        "text": this.comment,
        "userId": this.currentUser.id,
        "postId": this.currentPost.id,
      }
      CommentService.create(newComment)
      .then(response => {
        console.log(response);
        this.comment = '';
        this.$router.go(0);
      })
      .catch(e => {
        console.log(e);
      })
    },
    retrieveUsers(){
      UsersService.getAll()
      .then(response => {
        this.users = response.data;
        console.log(this.users);
      })
      .catch(e=>{
        console.log(e);
      })
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
            CommentService.getAll(this.$route.params.postId)
            .then(response => {
              this.comments = response.data;
              console.log(response.data);
            })
            .catch(e=>{
              console.log(e);
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
        image: this.currentPost.image,
        description: this.currentPost.description,
        published: this.currentPost.status,
        tagId: this.currentPost.tagId,
        interestId: this.currentPost.interestId,
        userId: this.currentPost.userId,
        numberOfRates: this.currentPost.numberOfRates + 1,
        rate: (((this.currentPost.rate * this.currentPost.numberOfRates) + this.rated)/(this.currentPost.numberOfRates + 1)).toFixed(1)
      }
      PostServices.update(this.currentPost.id, postUpdated)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      this.onBack();
    }
  }
}
</script>

<style scoped>
.actions{
  padding: 0;
}
.text{
  margin: 2px 10px 10px 30px;
  color: #fbfbfb;
}
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
  width: 50%;
  margin: auto;
}
.comment{
  margin-bottom: 5px;
  margin-top: 5px;
}
.cardImg{
  height: 555px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
