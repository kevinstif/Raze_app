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