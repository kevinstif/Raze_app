<template>
 <div>
   <chat v-if="user"></chat>
   <Login v-else></Login>
 </div>

</template>

<script>

import firebase from "firebase/compat";
import Chat from "@/components/chat/chat";
import Login from "@/components/chat/login";

export default {
  name: "Access-chat",
  data() {
    return {
      user: firebase.auth().currentUser
    }
  },
  components: {
    Chat, Login
  }
}
</script>

<style scoped>

</style>