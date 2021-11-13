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

    <div id="app">
      <v-app id="inspire">
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn color="primary" dark class="mr-4" @click="dialog=true">Add</v-btn>
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                          :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                          @click:date="viewDay" @change="getData"></v-calendar>
              <v-dialog v-model="dialog">
                <v-card>
                  <v-container>
                    <v-form @submit.prevent="addEvent">
                      <v-text-field type="text" label="Name" v-model="name"></v-text-field>
                      <v-text-field type="text" label="Details" v-model="details"></v-text-field>
                      <v-text-field type="date" label="Date-Start" v-model="start"></v-text-field>
                      <v-text-field type="date" label="Date-End" v-model="end"></v-text-field>
                      <v-text-field type="color" label="Color" v-model="color"></v-text-field>
                      <v-btn type="submit" color="primary" @click.stop="dialog=false">ADD</v-btn>
                    </v-form>
                  </v-container>
                </v-card>
              </v-dialog>
              <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="selectedEvent.details" text color="primary" :href="selectedEvent.details">
                      Meet
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
      </v-app>
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
    existingEvents: false,
    //#############################
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog:false,
    currentlyEditing: null,
    name:'',
    details:'',
    color: "#FFFFFF",
    start:null,
    end:null,
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  created() {
    this.values.api = window.gapi;
    this.handleClientLoad();
  },
  mounted () {
    this.$refs.calendar.checkChange();
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
      Promise.resolve(this.values.api.auth2.getAuthInstance().signOut())
          .then(function() {
            this.authorized = false;
          });
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
    //###################################
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    dateToString(dateTime){
      var date=dateTime.substring(0,10)
      var hour=dateTime.substring(11,16)
      var calendarFormat=date+' '+hour;
      return calendarFormat ;
    },
    loadFakeData(){
      var event={
        name:"name",
        details:"details",
        start:"2021-11-13 09:00",
        end:"2021-11-13 10:00",
        color:"indigo"
      }
      this.events.push(event)
    }
  }
}
</script>

<style scoped>

</style>
