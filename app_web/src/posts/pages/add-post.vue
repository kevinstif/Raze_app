<template>
  <v-container>
    <v-card>
      <v-card-title>Create Post</v-card-title>
      <v-form @submit="addPost">
        <div class="img">
          <img v-if="item.imageUrl" :src="item.imageUrl" height="500px" />
        </div>
        <v-card-text>
          <input type="file" accept="image/*" @change="onChange" class="my-10"/>
          <v-text-field label="Title" placeholder="Title" outlined v-model="title"></v-text-field>
          <v-textarea outlined name="Description" placeholder="Description" label="Description"
                      v-model="description"></v-textarea>
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
import PostServices from "@/posts/services/posts.services";
export default {
  name: "add-post",
  data:()=>({
    title:'',
    description:'',
    img:'',
    item:{
      image : null,
      imageUrl: null
    }
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

      PostServices.create(newPost)
          .then(response=>{
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })

      //this.$emit('add-post',newPost);
      this.title='';
      this.img='';
      this.description='';
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    }
  }
}
</script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>