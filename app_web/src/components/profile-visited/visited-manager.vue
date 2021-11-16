<template>
  <div class="relative inline-block overflow-hidden">
    <div>
      <div class="center">
        <img :src="currentUser.imgProfile" alt="MyProfile" class="v-avatar"/>
      </div>
      <div class="center">
        <v-btn class="" color="#002C3E" icon to="/Chat">
          <v-icon>mdi-message</v-icon>
        </v-btn>
      </div>
      <div class="center">
        <h3>{{currentUser.name}}</h3>
      </div>
      <div class="center">
        <AccessCalendar></AccessCalendar>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "../../users/services/users.services";
import AccessCalendar from "../calendar/pages/access-calendar";

export default {
  name: "visited-manager",
  components:{
    AccessCalendar
  },
  data:()=>({
    currentUser:{}
  }),
  mounted() {
    this.retrieveCurrentUser()
  },
  methods: {

    retrieveCurrentUser() {
      UsersService.getById(this.$route.params.userId)
          .then(response => {
            console.log((this.$route.params.userId))
            this.currentUser = response.data
          })
          .catch(e => {
            console.log(e)
          })
    },
  }
}
</script>

<style scoped>

.my-avatar{
  height: 170px;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
