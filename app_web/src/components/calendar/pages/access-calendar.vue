<template>
  <div>
    <div>
      <v-btn v-if="!authorized" color="#002C3E" @click="handleAuthClick">
        <v-icon color="#FFFF">fas fa-calendar-alt</v-icon>
      </v-btn>
      <v-btn v-if="authorized" dark color="#002C3E" @click="handleSignoutClick">Sign Out</v-btn>
    </div>

    <div v-if="authorized">
      <Calendar v-on:get-data="getData" v-on:add-event="addEvent" v-bind:events="events"></Calendar>
    </div>

  </div>
</template>
<script>

import Calendar from "./calendar";
const CLIENT_ID= '334358607918-s4bbscpvaf7s6gea3tpm09mqq49ou8kt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB2TV-pyudWz5ieUvYaHYDeBitPpSnnVzw';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';

export default {
  name: "access-calendar",
  components: {Calendar},
  data:()=>({
    values:{
      items: [],
      api: undefined,
    },
    authorized: false,
    existingEvents: false,
    events: [],
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
      this.getData();
    },

    handleSignoutClick() {
      Promise.resolve(this.values.api.auth2.getAuthInstance().signOut()).then(function() {});
      this.authorized = false;
    },

    getDisplayEvents(item){
      var timeStart=this.dateToString(item.start.dateTime);
      var timeEnd=this.dateToString(item.end.dateTime)
      return{
        id:item.id,
        status:item.status,
        htmlLink:item.htmlLink,
        name:item.summary,
        start:timeStart,
        end:timeEnd,
        description:item.description,
        details:item.hangoutLink,
        color:'indigo'
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
      this.events=vm.values.items;
      this.existingEvents=true;
    },
    dateToString(dateTime){
      var date=dateTime.substring(0,10)
      var hour=dateTime.substring(11,16)
      var calendarFormat=date+' '+hour;
      return calendarFormat ;
    },
    addEvent(event){
      var request = this.values.api.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
        'conferenceDataVersion': 1
      });

      request.execute(function(event) {
        console.log('Event created: ' + event.htmlLink)
      });
    }
  }
}
</script>

<style scoped>

</style>
