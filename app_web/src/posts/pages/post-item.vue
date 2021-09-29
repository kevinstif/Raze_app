<template>
  <v-container>
    <v-card>
      <v-card-title>{{post.title}}</v-card-title>
      <!--TODO: the image will be place here-->
      <v-card-text>{{post.description}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on1, attrs1 }">
            <v-btn icon v-bind="attrs1" v-on="on1">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <!-- Edit Post -->
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title>Edit Post</v-card-title>
              <v-card-text>
                <v-text-field label="Title" v-model="post.title"></v-text-field>
                <v-text-field label="Description" v-model="post.description"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="close">Cancel</v-btn>
                <v-btn color="primary" @click="updatePost">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Delete Post Confirmation Dialog -->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title>Delete Post</v-card-title>
              <v-card-text>Are you sure you want to delete this item?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" @click="confirmDeletePost">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <template v-slot:activator="{ on, attrs }">
            <v-list>
              <v-list-item v-bind="attrs" v-on="on" @click="editPost">
                <v-icon>mdi-pencil</v-icon>
                <v-list-item-title>Edit post</v-list-item-title>
              </v-list-item>

              <v-list-item v-bind="attrs" v-on="on" @click="deletePost">
                <v-icon>mdi-delete</v-icon>
                <v-list-item-title>Delete post</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>

        </v-menu>
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

</style>