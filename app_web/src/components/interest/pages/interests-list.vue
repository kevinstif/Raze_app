<template>
  <div><br>
  <v-row align="center" class="list px-3 mx-auto">

    <v-col cols="12" md="8" class="mt-10">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4" class="mt-10">
      <v-btn class="white--text" rounded width="30%" color="#002C3E" @click="searchTitle">Search</v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Interests List
          <v-btn to="/add" class="ml-10" text>Add</v-btn>
          <!--v-icon dw-->
          <v-icon to="/add">mdi-plus</v-icon>
        </v-card-title>

        <v-data-table :headers="headers" :items="interests"
            :hide-default-footer="false"> <!--pagination-->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editInterest(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteInterest(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="interests.length > 0"></v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
import interestDataService from "../services/interest-data-service";
export default {
  name: "interests-list",
  data() {
    return {
      interests: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveInterests() {
      interestDataService.getAll()
          .then((response) => {
            this.interests = response.data.map(this.getDisplayInterest);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveInterests();
    },

    searchTitle() {
      interestDataService.findByTitle(this.title)
          .then((response) => {
            this.interests = response.data.map(this.getDisplayInterest);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    editInterest(id) {
      this.$router.push({ name: "interest-details", params: { id: id } });
    },

    deleteInterest(id) {
      interestDataService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayInterest(interest) {
      return {
        id: interest.id,
        title: interest.title.length > 30 ? interest.title.substr(0, 30) + "..." : interest.title,
        description: interest.description.length > 30 ? interest.description.substr(0, 30) + "..." : interest.description,
        status: interest.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveInterests();
  },
};
</script>

<style>
.list {
  max-width: 900px;
}
</style>