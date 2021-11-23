<template>
  <v-container>
    <v-card outlined class="mx-auto card">
      <v-img :src="post.img" class="cardImage white--text align-start" :height="post.isMain ? '500px' : '300px'">
        <v-card-title class="white--text title">{{post.title}}</v-card-title>
      </v-img>
      <v-card-text class="text--primary black--text">{{post.description}}</v-card-text>
      <v-card-actions class="pa-4">
        <v-row>
          <v-col align-self="auto">
            <v-icon color="warning" size="150%">mdi-star</v-icon>
            {{post.rate}}
          </v-col>
          <v-spacer></v-spacer>
          <div v-if="currentUser.id === postOwner.id">
            <v-col>
              <v-icon small class="mr-2" @click="openEditDialog()">mdi-pencil</v-icon>
              <v-icon small @click="openDialogDelete()">mdi-delete</v-icon>
            </v-col>
          </div>
          <v-col>
            <router-link :to="{name: 'PostDetail', params: {userId: currentUser.id, postId: post.id}}">
              <v-btn class="white--text" rounded width="20%" color="#002C3E" >View</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title>Delete Post</v-card-title>
        <v-card-text>Are you sure you want to delete this post?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  rounded  color="red"
                  class="my-4 mx-4" type="cancel" @click="dialogDelete = !dialogDelete">Cancel
          </v-btn>
          <v-btn rounded  color="green"
                 class="my-4 mx-4" @click="confirmDeletePost">Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEdit" max-width="600px">
      <template>
        <v-container>
          <v-card>
            <v-card-title>Edit Post</v-card-title>
            <v-form @submit="updatePost">
              <div>
                <div class="img">
                  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" height="500px"/>
                </div>
              </div>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <input type="file" accept="image/*" @change="onChange" class="my-10"/>
                    </v-col>
                  </v-row>
                </v-container>
                <v-text-field label="Title" placeholder="Title" outlined v-model="post.title"></v-text-field>
                <v-textarea outlined name="Description" placeholder="Description" label="Description"
                            v-model="post.description"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  rounded  color="red"
                        class="my-4 mx-4" type="cancel" @click="dialogEdit = !dialogEdit">Cancel
                </v-btn>
                <v-btn rounded  color="green"
                       class="my-4 mx-4" @click="managerImage">Edit
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'
import UsersService from '../../users/services/users.services'
import {storage} from "../../main";
const ref=storage.ref()

export default {
  name: "post-item",
  props:[
    "post"
  ],
  data: () => ({
    dialogEdit: false,
    dialogDelete: false,
    currentUser: {},
    postOwner: {},
    Image:'',
    item:{
      image : null,
      imageUrl: null
    }
  }),
  mounted(){
    this.retrieveCurrentUser();
    this.retrievePostOwner();
  },
  methods: {
    async managerImage(item){
      item.preventDefault();
      if(this.Image !== this.post.img){
        await this.uploadImage();
      }
      else{
        await this.updatePost();
      }
    },
    async uploadImage(){
      const refImg=ref.child('images/'+ this.image.name)
      const metadata={contentType:'img/*'}
      refImg.put(this.image,metadata)
          .then(response=>{
            console.log("upload: " + response);
            this.downloadImage();
          })
          .catch(e=>{
            console.log(e)
          })
      this.enableSelect=false;
    },
    async downloadImage(){
      ref.child(`images/${this.image.name}`).getDownloadURL()
          .then(response=>{
            this.Image=response
            console.log("download: " + response);
            this.updatePost();
          })
    },
    async updatePost(){
      const newPost = {
        Title: this.post.title,
        Image: this.Image,
        Description: this.post.description,
        Rate: this.post.rate,
        NumberOfRates: this.post.numberOfRates,
        UserId: this.post.userId,
        InterestId: this.post.interestId,
        TagId: this.post.tagId,
      }

      this.post.image = this.Image;

      PostServices.update(this.post.id, newPost)
          .then(response=>{
            console.log(response.data);
            this.$router.go(0);
          })
          .catch(e=>{
            console.log(e)
          })
    },
    openEditDialog(){
      this.dialogEdit = true;
      this.item.imageUrl = this.post.img;
    },
    openDialogDelete(){
      this.dialogDelete = true;
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      console.log(this.image)
      this.enableSave=true
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
    retrievePostOwner(){
      UsersService.getById(this.post.userId)
          .then(response=>{
            this.postOwner=response.data;
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e)
          })
    },
    editPost() {
      this.dialogEdit = true;
    },
    close() {
      this.dialogEdit = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    confirmDeletePost() {
      PostServices.delete(this.post.id)
          .then(response => {
            console.log(response.data);
            this.$router.go(0);
          })
          .catch(e => {
            console.log(e);
          });
      this.closeDelete();
    }
  }
}
</script>

<style scoped>
.title{
  background-image: linear-gradient(rgba(28, 28, 30, 0.7), rgba(35, 35, 37, 0.7));
}
.card:hover{
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.2);
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>
