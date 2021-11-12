<template>
  <div>
    <div>
      <h2>VueJS + Google Calendar Example</h2>
      <h3>Authentication</h3>
      <button v-if="!authorized" @click="handleAuthClick">Sign In</button>
      <button v-if="authorized" @click="handleSignoutClick">Sign Out</button>
    </div>
    <button v-if='authorized' @click="getData">Get Data</button>
    <div class="item-container" v-if="existingEvents">
      <pre>{{values.items}}</pre>
    </div>

  </div>
</template>
<script>

const CLIENT_ID= '334358607918-s4bbscpvaf7s6gea3tpm09mqq49ou8kt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB2TV-pyudWz5ieUvYaHYDeBitPpSnnVzw';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default {
  name: "access-calendar",

  data:()=>({
    values:{
      items: [],
      api: undefined,
    },
    authorized: false,
    existingEvents: false
  }),
  created() {
    this.values.api = window.gapi;
    this.handleClientLoad();
  },
  methods: {

    handleClientLoad() {
      this.values.api.load('client:auth2', this.initClient);
    },

    initClient() {
      let vm = this;
      vm.values.api.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        vm.values.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
      });
    },

    handleAuthClick(event) {
      Promise.resolve(this.values.api.auth2.getAuthInstance().signIn())
          .then(function() {
            console.log(event);
          });
      this.authorized = true;
    },

    handleSignoutClick() {
      Promise.resolve(this.values.api.auth2.getAuthInstance().signOut())
          .then(function() {
            this.authorized = false;
          });
    },

    getDisplayEvents(item){
      return{
        id:item.id,
        status:item.status,
        htmlLink:item.htmlLink,
        summary:item.summary,
        start:item.start.dateTime,
        end:item.end.dateTime,
        hangoutLink:item.hangoutLink
      }
    },

    getData() {
      let vm = this;

      vm.values.api.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        vm.values.items = response.result.items.map(this.getDisplayEvents)
        console.log(vm.values.items);
      });
      this.existingEvents=true;
    }
  }
}
</script>

<style scoped>

</style>
