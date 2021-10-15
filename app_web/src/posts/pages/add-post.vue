<template>
  <v-container>
    <v-card>
      <v-card-title>Create Post</v-card-title>
      <v-form @submit="addPost">
        <div class="img">
          <img v-if="item.imageUrl" :src="item.imageUrl" height="500px"/>
        </div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <input type="file" accept="image/*" @change="onChange" class="my-10"/>
              </v-col>
              <v-col>
                <TagsManager v-on:save-tag="getTagId"></TagsManager>
              </v-col>
            </v-row>
          </v-container>
          <v-text-field label="Title" placeholder="Title" outlined v-model="title"></v-text-field>
          <v-textarea outlined name="Description" placeholder="Description" label="Description"
                      v-model="description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  rounded  color="red"
                  class="my-4 mx-4" type="cancel">Cancel
          </v-btn>
          <v-btn :disabled="!enabledPublish" rounded  color="green"
                 class="my-4 mx-4" type="submit">Publish
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import PostServices from "@/posts/services/posts.services";
import TagsManager from "../../tags/pages/tags-manager";
export default {
  name: "add-post",
  components: {TagsManager},
  data:()=>({
    title:'',
    description:'',
    img:'',
    tagId:0,
    enabledPublish:false,
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
        published:true,
        tagId:this.tagId
      }

      PostServices.create(newPost)
          .then(response=>{
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })

      this.title='';
      this.img='';
      this.description='';
      this.tagId=0;
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
    },
    getTagId(tagId){
      this.enabledPublish=true;
      this.tagId=tagId;
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

.center{
  margin: auto;
  width: 5%;
}
</style>