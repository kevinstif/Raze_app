<template>
  <v-container>
    <v-card outlined class="mx-auto card">
      <v-img :src="post.img" class="cardImage white--text align-start" :height="post.isMain ? '500px' : '300px'">
        <v-card-title class="white--text title">{{post.title}}</v-card-title>
      </v-img>
      <v-card-text class="text--primary black--text">{{post.description}}</v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-row>
          <v-col align-self="auto">
            <v-icon color="warning" size="150%">mdi-star</v-icon>
            {{post.rate}}
          </v-col>
          <v-spacer></v-spacer>
          <v-col><v-btn class="white--text" rounded width="20%" color="#002C3E" >View</v-btn></v-col>
        </v-row>


      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import PostServices from '../services/posts.services'

export default {
  name: "post-item",
  props:[
    "post"
  ],
  data: () => ({
    dialogEdit: false,
    dialogDelete: false,
  }),

  methods: {
    editPost() {
      this.dialogEdit = true;
    },
    deletePost() {
      this.dialogDelete = true;
    },
    close() {
      this.dialogEdit = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    updatePost() {
      var postUpdated = {
        id: this.post.id,
        title: this.post.title,
        img: this.post.img,
        description: this.post.description,
        published: this.post.status
      };

      PostServices.update(postUpdated.id, postUpdated)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      this.close();
    },
    confirmDeletePost() {
      PostServices.delete(this.post.id)
          .then(response => {
            console.log(response.data);
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
</style>
