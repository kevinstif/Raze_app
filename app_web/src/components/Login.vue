<template>
  <div class="login-container">
    <button @click="loginSubmit">Login with Google</button>
  </div>
</template>

<script>
import firebase from "firebase/compat";
export default {
  methods: {
    loginSubmit() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
          .catch(console.log)
    }
  }
}
</script>