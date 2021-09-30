<template>
     <!--Jesus-->
  <div class="wrapper">
    <header>
      <h1>Raze Chat</h1>
      <button @click="logout">Logout</button>
    </header>
    <!--Jesus-->
    <!--Leonardo-->
    <section>
      <main>
        <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
             :class="['message', sentOrReceived(msg.userUID)]"> <!--Advisor ↔ advised  message → msg-->
          <img :src="msg.photoURL" :alt="msg.displayName">
          <p>{{ msg.text }}</p>
        </div>
    <!--Leonardo-->
        <div ref="scrollable"></div>
      </main>

      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="Type something...">
        <button :disabled="!message" type="submit">Send ✉️</button>
      </form>
    </section>
  </div>
</template>


<script>
//Leonardo
import firebase from "firebase/compat";
export default {
  mounted() {
    this.db.collection('messages').orderBy('createdAt')
        .onSnapshot(querySnap => {
          this.messages = querySnap.docs.map(doc => doc.data())
        })
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      db: firebase.firestore(),
      message: '',
      messages: [],
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
    },
    
    async sendMessage() {
      const messageInfo = {
        'userUID': this.user.uid,
        'displayName': this.user.displayName,
        'photoURL': this.user.photoURL,
        'text': this.message,
        'createdAt': Date.now(),
      }
      await this.db.collection('messages').add(messageInfo)
      this.message = ''
      this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
    }
    //Leonardo
  }
}
</script>


<style scoped>
body {
  margin: 0;
  font-family: 'Hind', sans-serif;
  font-style: normal;
  font-weight: 100;
}
.wrapper {
  text-align: center;
  margin: 0 auto;
}
.wrapper header {
  background-color: #78BCC4;
  height: 10vh;
  min-height: 50px;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid grey;
}
.wrapper section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #F7F8F3;
}
.wrapper section main {
  padding: 10px;
  height: 75vh;
  margin: 10vh 0 10vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
/*Yisus*/
.wrapper section main::-webkit-scrollbar {
  width: 0.25rem;
}
.wrapper section main::-webkit-scrollbar-track {
  background: #1e1e24;
}
.wrapper section main::-webkit-scrollbar-thumb {
  background: #6649b8;
}
.wrapper section form {
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: #181717;
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  border: 2px solid grey;
}
.wrapper section form button {
  width: 20%;
  background-color: #F7444E;
}
.wrapper section form input {
  line-height: 1.5;
  width: 100%;
  font-size: 1.5rem;
  background: #3a3a3a;
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
}
/*Yisus*/
.wrapper button {
  background-color: #002C3E;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 1.25rem;
  border-radius: 15px;
}
.wrapper button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.wrapper button, .wrapper input {
  color: #fff;
  border: none;
}
.wrapper p {
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: white;
  float: left;
}
.wrapper .message {
  display: flex;
  align-items: center;
}
.wrapper .message.received p {
  background: #e5e5ea;
  color: #000;
}
.wrapper .message.sent {
  flex-direction: row-reverse;
}

/*Leonardo*/
.wrapper .message.sent p {
  color: #fff;
  background: #0b93f6;
  align-self: flex-end;
}
.wrapper .message img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
}
.wrapper .message p {
  max-width: 35%;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: #fff;
  text-align: left;
}
/*Leonardo*/
</style>