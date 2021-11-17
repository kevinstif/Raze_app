<template>
  <div>
    <div class="submit-form mt-3 mx-auto">
      <br><br>
      <p class="headline text-center">Add new interest</p>
    <div v-if="!submitted">
      <v-card>
        <img :src="interest.img" alt="interest image" width="600">
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <input type="file" accept="image/*" ref="file"  @change="onChange"/>
            <v-text-field
                v-model="interest.title"
                :rules="[(v) => !!v || 'Title is required']"
                label="Title"
                required></v-text-field>

            <v-text-field
                v-model="interest.description"
                :rules="[(v) => !!v || 'Description is required']"
                label="Description"
                required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="white--text s-class" rounded width="30%" color="#002C3E" @click="managerImage">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div v-else>
      <v-card class="mc">
        <v-card-title>
          Your interest was submitted successfully
        </v-card-title>
        <v-btn color="secondary" class="validation-class" :to="{name:'Introduction', params:{userId:userId}}"
               text>Continue</v-btn>
      </v-card>
    </div>
  </div>
  </div>
</template>

<script>
import interestDataService from "../services/interest-data-service";
import {storage} from "../../../main";
const ref=storage.ref()

export default {
  name: "add-interest",
  data:()=>({
    userId:1,
    interest: {
      id: null,
      title: "",
      img:"",
      description: "",
      published: false,
    },
    submitted: false,
    item:{
      image : null,
      imageUrl: null
    },
  }),
  mounted() {
    this.userId=this.$route.params.userId;
    console.log(this.userId);
  },
  methods: {
    saveInterest() {
      var data = {
        title: this.interest.title,
        img:this.interest.img,
        description: this.interest.description,
        published:true
      };

      interestDataService.create(data)
          .then((response) => {
            this.interest.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    onChange(e) {
      const file = e.target.files[0]
      this.item.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      this.interest.img= URL.createObjectURL(file)
      console.log(this.currentUser.imgProfile)
      this.enableSave=true
    },
    async managerImage(){
      await this.uploadImage();
      await this.downloadImage();
    },
    //carga de imagen al storage
    async uploadImage(){
      const refImg=ref.child('interests/'+ this.item.image.name)
      const metadata={contentType:'img/*'}
      refImg.put(this.item.image,metadata)
          .then(response=>{
            console.log(response)
            this.downloadImage()
          })
          .catch(e=>{
            console.log(e)
          })
      this.enableSelect=false;
    },
    //recupera el url de la imagen cargada
    async downloadImage(){
      ref.child(`interests/${this.item.image.name}`).getDownloadURL()
          .then(response=>{
            this.interest.img=response
            console.log(response)
            this.saveInterest();
          })
      this.enabledConfirm=true;
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
}
.s-class{
  left: 50%;
  transform: translateX(-50%);
}
.validation-class{
  left: 50%;
  transform: translateX(-50%);
}
.mc{
  height: 120px;
}
</style>
