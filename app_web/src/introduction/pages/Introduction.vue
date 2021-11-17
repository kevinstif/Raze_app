<template>
    <v-content class="bak">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="mold">
                      <v-img :src="img">
                      </v-img>
                      <input type="file" accept="image/*" id="inputImage" class="" @change="onChange"/>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="letter">Let's complete your profile</h1>

                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field
                              v-model="username"
                              label="Username"
                              name="UserName"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                          />
                          <v-text-field
                              v-model="age"
                              label="Age"
                              name="Age"
                              prepend-icon="house"
                              type="text"
                              color="teal accent-3"
                          />
                        </v-form>
                        <div class="float-right">
                          <ProfessionManager v-on:save-professions="getProfessionId"></ProfessionManager>
                        </div>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3"  @click="step++">Next</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <div class="mold_interest">
                    <v-card class="account-box">
                      <v-card-title>Free</v-card-title>
                      <v-img max-height="294px" src="https://firebasestorage.googleapis.com/v0/b/raze-chat-37c27.appspot.com/o/images%2Fimagen_1.jpg?alt=media&token=0d33f5c2-3280-4f4a-96c1-f03127f11062"/>
                      <v-card-text>
                        <div style="height: 170px">
                          <ul>
                            <li>share your outfits</li>
                            <li>watch outfits of others users</li>
                            <li>receive advice and opinions about your outfits with the comment system </li>
                          </ul>
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn :color="colorFree" @click="setToFree">Select</v-btn>
                      </v-card-actions>
                    </v-card>
                    <v-card class="account-box">
                      <v-card-title>Premium</v-card-title>
                      <v-img src="https://firebasestorage.googleapis.com/v0/b/raze-chat-37c27.appspot.com/o/images%2Fpost.jpg?alt=media&token=5aa07022-d24e-48e1-98b0-9090fbb375fc"/>
                      <v-card-text>
                        <ul>
                          <li>share your outfits</li>
                          <li>watch outfits of others users</li>
                          <li>receive advice and opinions about your outfits with the comment system </li>
                          <li>chat with advisors </li>
                          <li>program meeting in google meets using google calendar included</li>
                        </ul>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn :color="colorPremium" @click="setToPremium">Select</v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                  <br>
                  <div class="text-center mt-n5">
                    <v-btn rounded color="teal accent-3"  @click="step++">Next</v-btn>
                  </div>
                  <br>
                </v-window-item>
                <v-window-item :value="3">
                  <v-row>
                    <v-col cols="12" md="4" class="column">
                      <iframe class="mold"
                              src="https://www.youtube.com/embed/fIX_Pu2Gw78?start=30&autoplay=1&controls=0&disablekb=1&modestbranding=1&start:1&mute=1&loop=1"
                              title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write;
                                encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="letter"
                        >Welcome To Raze</h1>
                        <h4 class="text-center mt-4">
                          Please select your interest to help us guide you.
                        </h4>
                        <v-btn :to="{name:'add',params:{userId:$route.params.userId}}" class="d-inline"
                               icon color="black">
                          <v-icon>fas fa-plus-circle</v-icon>
                        </v-btn>
                        <v-form>
                          <div class="mold_interest">
                            <div class="box" v-for="interest in interests" v-bind:key="interest.id">
                              <a href="#">
                                <img alt="interest image" :src="interest.img">
                                <div class="cap">
                                    {{interest.title}}
                                </div>
                              </a>
                              <v-btn class="btn_select" elevation="2" @click="selectInterest(interest.id)">
                                Select
                              </v-btn>
                            </div>
                          </div>
                        </v-form>
                        <h3 class="text-center mt-4">Are you ready?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn  rounded color="teal accent-3" dark  @click="managerImage">GO</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import interestDataService from "../../components/interest/services/interest-data-service";
import UsersService from "../../users/services/users.services";
import {storage} from "../../main";
import ProfessionManager from "../../components/profession/pages/profession-manager";

export default {
  name: "Introduction",
  components: {ProfessionManager},
  data:()=>({
    step:1,
    interests: [],
    interestSelect:-1,
    userGet:null,
    userUpdate:null,
    age:null,
    username:null,
    premium:false,
    professionId:1,
    colorFree:"#bababa",
    colorPremium:"#bababa",
    img:"https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png",
    item:{
      image : null,
      imageUrl: null
    }
  }),
  methods:{
    retrieveInterests() {
      interestDataService.getAll()
          .then((response) => {
            this.interests = response.data.map(this.getDisplayInterest);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    selectInterest(idInterest){
       this.interestSelect =idInterest;
    },
    getDisplayUser(user){
      return{
        id: user.id,
        name: user.name,
        imgProfile: user.imgProfile,
        age: user.age,
        interestId: user.interestId,
        email: user.email,
        password:user.password,
        userType: user.userType
      };
    },
    getUser(){
       UsersService.getById(this.userId)
           .then(response=>{
             this.userGet=this.getDisplayUser(response.data);

             console.log(response.data)
             this.userUpdate=this.userGet;
             this.userUpdate.age=this.age;
             this.userUpdate.interestId=this.interestSelect;
             this.userUpdate.username=this.username;
             this.userUpdate.imgProfile=this.img;
             this.userUpdate.premium=this.premium;
             this.userUpdate.professionId=this.professionId;
             this.updateUser(this.userUpdate.id)

           })
           .catch(e=>{
             console.log(e)
           });
     },
    updateUser(id){
      UsersService.update(id,this.userUpdate)
      .then(response=>{
        console.log("update")
        console.log(response);
        this.signToApp(id);
      })
      .catch(e=>{
        console.log(e);
      })
    },
    signToApp(id){
      this.$router.push({ path: `/web/${id}/posts`});
    },

    getDisplayInterest(interest) {
      return {
        id: interest.id,
        title: interest.title.length > 30 ? interest.title.substr(0, 30) + "..." : interest.title,
        img:interest.img,
        description: interest.description.length > 30 ? interest.description.substr(0, 30) + "..." : interest.description,
        status: interest.published ? "Published" : "Pending",
      };
    },

    onChange(e) {
      const file = e.target.files[0]
      this.item.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      this.img = URL.createObjectURL(file)
      console.log(this.item.image)
      this.enableSave=true
    },
    async managerImage(item){
      item.preventDefault();
      await this.uploadImage();
    },
    async uploadImage(){
      const ref=storage.ref();
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
      const ref=storage.ref();
      ref.child(`usersProfiles/${this.item.image.name}`).getDownloadURL()
          .then(response=>{
            console.log(response)
            this.img=response
            this.getUser();
          })
      this.enabledConfirm=true;
    },
    setToPremium(){
      this.premium=true;
      this.colorFree="#bababa";
      this.colorPremium="#db5534";
    },
    setToFree(){
      this.premium=false;
      this.colorFree="#209302";
      this.colorPremium="#bababa";
    },
    getProfessionId(professionId){
      console.log(professionId);
      this.professionId=professionId
    }
  },
  mounted() {
    this.retrieveInterests();
    this.userId= this.$route.params.userId;
  },
}
</script>

<style scoped>
.mold{
  width: 100%;
  height: 100%;
}
.label_image{
  background-color: #F7444E;
  padding: 1rem 16px;
}
.mold_interest{
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: auto;
}
.box{
  width: 300px;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin: 20px;
  border:3px solid #fff;
}
.account-box{
  width: 300px;
  height: 620px;
  position: relative;
  margin: 20px;
  border:3px solid #fff;
}
.box img{
  width: 100%;
  height: 70%;
  object-fit: cover;
}
.cap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  transform: scale(0);
  transition: .3s ease;
}
.box:hover .cap{
  transform: scale(1);
}
@media only screen and (max-width:900px){
  .mold_interest{
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
  }
}

.btn_select{
  background-color: #78BCC4;
}

.hidden{
  visibility: hidden;
}


</style>
