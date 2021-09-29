<template>
  <v-container>
    <v-card>
      <v-card-title>Create Post</v-card-title>
      <v-form @submit="addPost">
        <v-card-text>
          <v-text-field label="Title" v-model="title"></v-text-field>
          <v-text-field label="Description" v-model="description"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="my-4 mx-4" type="submit">Publish</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "add-post",
  data:()=>({
    title:'',
    description:'',
    img:''
  }),
  methods:{
    addPost(item){
      item.preventDefault();
      const newPost={
        id:uuidv4(),
        title:this.title,
        img:this.img,
        description:this.description,
        published:true
      }
      this.$emit('add-post',newPost);
      this.title='',
          this.img='',
          this.description='';
    }
  }
}
</script>

<style scoped>

</style>