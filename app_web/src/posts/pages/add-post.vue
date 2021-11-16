<template>
  <v-container>
    <v-card>
      <v-card-title>Create Post</v-card-title>
      <v-form @submit="addPost">
        <div>
          <div class="img">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" height="500px"/>
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
              <v-col>
                <InterestManager v-on:save-interest="getInterestId"></InterestManager>
              </v-col>
            </v-row>
          </v-container>
          <v-text-field label="Title" placeholder="Title" outlined v-model="Title"></v-text-field>
          <v-textarea outlined name="Description" placeholder="Description" label="Description"
                      v-model="Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  rounded  color="red"
                  class="my-4 mx-4" type="cancel" to="/web/posts">Cancel
          </v-btn>
          <v-btn rounded  color="green"
                 class="my-4 mx-4" @click="managerImage">Publish
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
          <v-btn icon color="green" to="/web/Posts">
            <v-icon>fas fa-check-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PostServices from "@/posts/services/posts.services";
import TagsManager from "../../tags/pages/tags-manager";
import InterestManager from "../../components/interest/pages/interest-manager";
import {storage} from "../../main";
const ref=storage.ref()

export default {
  name: "add-post",
  components: {InterestManager, TagsManager},
  data:()=>({
    Title:'',
    Description:'',
    Image:'',
    interestId: 0,
    TagId:0,
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
    async addPost(){
      const newPost={
        title:this.Title,
        img:this.Image,
        description:this.Description,
        rate:0,
        rateNumber: 0,
        userId: 5,
        interestId: this.interestId,
        tagId:this.TagId,
        //tagId:this.Tag.id
      }
      PostServices.create(newPost)
          .then(response=>{
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })

      this.Title='';
      this.img='';
      this.Description='';
      this.tagId=0;
      this.enableMessage=true;
    },

    getTagId(Tag){
      this.enabledPublish=true;
      this.TagId=Tag.id;
    },
    getInterestId(Interest){
      this.enabledPublish=true;
      this.interestId=Interest.id;
    },

    onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      console.log(this.image)
      this.enableSave=true
    },
    async managerImage(item){
      item.preventDefault();
      await this.uploadImage();
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
        this.addPost();
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
