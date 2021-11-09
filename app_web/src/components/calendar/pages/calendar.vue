<template>
  <div id="app">
    <div class='authentification'>
      <h2>VueJS + Google Calendar Example</h2>
      <h3>Authentication</h3>
      <button v-if="!authorized" @click="handleAuthClick">Sign In</button>
      <button v-if="authorized" @click="handleSignoutClick">Sign Out</button>
    </div>
    <hr>
    <button v-if='authorized' @click="getData">Get Data</button>
    <div class="item-container" v-if="authorized && items">
      <pre v-html="items"></pre>
    </div>
  </div>
</template>
<script>
const CLIENT_ID= '334358607918-s4bbscpvaf7s6gea3tpm09mqq49ou8kt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB2TV-pyudWz5ieUvYaHYDeBitPpSnnVzw';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default {
  name: "calendar",
  data() {
    return {
      items: undefined,
      api: undefined,
      authorized: false
    }
  },
  created() {
    this.api = window.gapi;
    this.handleClientLoad();
  },
  methods: {

    handleClientLoad() {
      this.api.load('client:auth2', this.initClient);
    },

    initClient() {
      let vm = this;
      vm.api.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
      });
    },

    handleAuthClick(event) {
      Promise.resolve(this.api.auth2.getAuthInstance().signIn())
          .then(function() {
            console.log(event);
          });
      this.authorized = true;
    },

    handleSignoutClick() {
      Promise.resolve(this.api.auth2.getAuthInstance().signOut())
          .then(function() {
            this.authorized = false;
          });
    },

    getData() {
      let vm = this;

      vm.api.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        vm.items = this.syntaxHighlight(response.result.items);
        console.log(vm.items);
      });
    },
    syntaxHighlight(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }
  }
}
</script>

<style scoped>

</style>
