<template>
  <div class="relative inline-block overflow-hidden">
    <input type="file" accept="image/*" class="hidden" ref="file"/>
    <img :src="currentUser.imgProfile" alt="MyProfile" class="my-avatar" />
    <div>
      <button
          type="button"
          class="rounded-full">
        <icon name="camera" class="s_camera"></icon>
      </button>
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

export default {
  components: {
    AccessCalendar,
    Icon,
  },
  name:'myProfile',
  props: {
    value: File,
    defaultSrc: String,
  },
  /*watch: {
    value(file) {
      if (!file) {
        this.src = this.defaultSrc;
        this.$refs.file.value = "";
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.src = e.target.result;
        };
      }
    },
  },*/
  data() {
    return {
      currentUser:{}
    };
  },
  mounted() {
    this.retrieveCurrentUser()
  },
  methods: {
    getDisplayUser(user){
      return{
        id: user.id,
        name: user.name,
        imgProfile: user.imgProfile,
        age: user.age,
        email: user.email,
        userType: user.userType
      }
    },
    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.id)
          .then(response=>{
            console.log((this.$route.params.id))
            this.currentUser=response.data.map(this.getDisplayUser)
          })
          .catch(e=>{
            console.log(e)
          })
    },
    /*browse() {
      this.$refs.file.click();
    },
    remove() {
      this.$emit("input", null);
    },
    change(e) {
      this.$emit("input", e.target.files[0]);
    },*/
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
