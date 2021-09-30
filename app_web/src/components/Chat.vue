<template>
     <!--Jesus-->
  <div class="wrapper">
    <header>
      <h1>Raze Chat</h1>
      <button @click="logout">Logout</button>
    </header>
    <!--Jesus-->
</template>

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
</style>