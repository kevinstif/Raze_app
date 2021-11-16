<template>
  <div class="relative inline-block overflow-hidden">
    <input type="file" accept="image/*" id="inputImg" class="hidden" ref="file"  @change="onChange"/>
    <img :src="currentUser.imgProfile" alt="MyProfile" class="my-avatar" />
    <div>
      <label for="inputImg"><icon name="camera" class="s_camera"></icon></label>
      <v-btn icon color="green" @click="uploadImage"><v-icon>fas fa-save</v-icon></v-btn>
    </div>
    <div>
      <h3>{{currentUser.name}}</h3>
    </div>
    <div>
      <AccessCalendar></AccessCalendar>
    </div>
  </div>
</template>

<script>

import Icon from "./icon";
import AccessCalendar from "../calendar/pages/access-calendar";
import UsersService from "../../users/services/users.services";
import {storage} from "../../main";
const ref=storage.ref()

export default {
  components: {
    AccessCalendar,
    Icon,
  },
  name:'myProfile',
  data:()=>({
    item:{
      image : null,
      imageUrl: null
    },
    currentUser:{}
  }),
  mounted() {
    this.retrieveCurrentUser()
  },
  methods: {

    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.userId)
          .then(response=>{
            console.log(response.data.imgProfile)
            this.currentUser=response.data
          })
          .catch(e=>{
            console.log(e)
          })
    },
    updateUser(){
      const user = {
        id: this.currentUser.id,
        name: this.currentUser.name,
        imgProfile: this.currentUser.imgProfile,
        age: this.currentUser.age,
        email: this.currentUser.email,
        password: this.currentUser.password,
        userType: this.currentUser.userType
      };
      UsersService.update(user.id,user)
      .then(response=>{
        console.log(response.data.imgProfile)
      })
      .catch(e=>{
        console.log(e)
      })
    },
    onChange(e) {
      const file = e.target.files[0]
      this.item.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      this.currentUser.imgProfile= URL.createObjectURL(file)
      console.log(this.currentUser.imgProfile)
      this.enableSave=true
    },
    async managerImage(){
      await this.uploadImage();
      this.downloadImage();
    },
    //carga de imagen al storage
    async uploadImage(){
      const refImg=ref.child('usersProfiles/'+ this.item.image.name)
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
      ref.child(`usersProfiles/${this.item.image.name}`).getDownloadURL()
          .then(response=>{
            this.currentUser.imgProfile=response
            console.log(response)
            this.updateUser();
          })
      this.enabledConfirm=true;
    }
  },
};
</script>

<style>
.hidden{
  visibility: hidden;
}

.my-avatar{
  text-align: center;
  height: 170px;
  border-radius: 100px;
  left: 50%;
  transform: translateX(-110%);
  margin-top: 40px;
}
.s_camera{
  margin-top: 20px;
}
.s_camera:hover{
  opacity: 0.5;
  transition-duration: 200ms;
}
</style>
