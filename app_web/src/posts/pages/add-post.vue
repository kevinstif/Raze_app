<template>
  <v-container>
    <v-card>
      <v-card-title>Create Post</v-card-title>
      <v-form @submit="addPost">
        <div>
          <div class="img">
            <img v-if="item.imageUrl" :src="item.imageUrl" height="500px"/>
          </div>
        </div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <input v-if="enableSelect" type="file" accept="image/*" @change="onChange" class="my-10"/>
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
          <v-btn :disabled="!enableSave" color="yellow" rounded @click="managerImage">Save Image</v-btn>
          <v-btn :disabled="!enabledPublish" rounded  color="green"
                 class="my-4 mx-4" @click="addPost">Publish
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-dialog v-model="enableMessage" max-width="500px">
      <v-card>
        <v-card-text>
          Your post was created successfully!
        </v-card-text>
        <v-card-actions>
          <v-btn icon color="green" to="/Posts">
            <v-icon>fas fa-check-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import PostServices from "@/posts/services/posts.services";
import TagsManager from "../../tags/pages/tags-manager";
import {storage} from "../../main";
const ref=storage.ref()

export default {
  name: "add-post",
  components: {TagsManager},
  data:()=>({
    title:'',
    description:'',
    img:'',
    tagId:0,
    enabledPublish:false,
    enabledConfirm:false,
    enableSelect:true,
    enableSave:false,
    enableMessage:false,
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
        rate:0,
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
      this.enableMessage=true;
    },

    getTagId(tagId){
      this.enabledPublish=true;
      this.tagId=tagId;
    },
    setConfirm(){
      this.enabledConfirm=false;
    },
    //carga y vista previa de imgagen
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      console.log(this.image)
      this.enableSave=true
    },
    managerImage(){
      this.uploadImage();
      this.downloadImage();
    },
    //carga de imagen al storage
    uploadImage(){
      const refImg=ref.child('images/'+ this.image.name)
      const metadata={contentType:'img/*'}
      refImg.put(this.image,metadata)
        .then(response=>{
          console.log(response)
        })
        .catch(e=>{
          console.log(e)
        })
      this.enableSelect=false;
    },
    //recupera el url de la imagen cargada
    downloadImage(){
      ref.child(`images/${this.image.name}`).getDownloadURL()
      .then(response=>{
        this.img=response
        console.log(response)
      })
      this.enabledConfirm=true;
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
