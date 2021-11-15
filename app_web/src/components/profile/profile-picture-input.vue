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
  data() {
    return {
      currentUser:{}
    };
  },
  mounted() {
    this.retrieveCurrentUser()
  },
  methods: {

    retrieveCurrentUser(){
      UsersService.getById(this.$route.params.id)
          .then(response=>{
            console.log((this.$route.params.id))
            this.currentUser=response.data
          })
          .catch(e=>{
            console.log(e)
          })
    },
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
