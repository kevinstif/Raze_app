<template>
  <div id="app" >
    <v-app id="inspire">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="#92B4A7">
              <v-btn color="#002C3E" dark class="mr-4" @click="dialog=true">Add</v-btn>
              <v-btn class="mr-4" dark color="#002C3E" @click="setToday">Today</v-btn>
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
                  <v-spacer></v-spacer>
                  <v-btn dark color="#002C3E" @click="getData">Update Data</v-btn>
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
            <v-dialog v-model="dialog" max-width="30%">
              <v-card>
                <v-card-title>
                  <h3>Create Meeting</h3>
                </v-card-title>
                <v-container>
                  <v-form @submit.prevent="addEvent">
                    <v-text-field type="text" label="Name" v-model="name"></v-text-field>
                    <v-text-field type="text" label="Details" v-model="description"></v-text-field>
                    <v-text-field type="datetime-local" label="Date-Start" v-model="start"></v-text-field>
                    <v-text-field type="datetime-local" label="Date-End" v-model="end"></v-text-field>
                    <v-btn type="submit" dark color="#002C3E" @click.stop="dialog=false">ADD</v-btn>
                  </v-form>
                </v-container>
                <div class="item-container">
                  <pre>{{start}}</pre>
                </div>
              </v-card>
            </v-dialog>
            <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.description"></span>
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
</template>

<script>
export default {
  name: "calendar",
  data: () => ({
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
    start:null,
    end:null,
    name:'',
    details:'',
    dialog:false,
    currentlyEditing: null,
  }),
  props:[
      "events"
  ],
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
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
    //######################
    getData(){
      this.$emit('get-data');
    },
    addEvent(){
      var event = {
        'summary': this.name,
        'location': '',
        'description': this.description,
        'start': {
          'dateTime': this.start+":00-05:00",
          'timeZone': 'America/Lima'
        },
        'end': {
          'dateTime': this.end+":00-05:00",
          'timeZone': 'America/Lima'
        },
        'recurrence': [],
        'attendees': [
          //TODO: invited counts will be place here
        ],
        conferenceData: {
          createRequest: {
            requestId: "hangoutsMeet",
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
          sendNotifications: true,
        }
      };
      this.$emit('add-event',event)
    }
  }
}
</script>

<style scoped>

</style>
