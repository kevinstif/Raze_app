<template>
  <div><br>
    <v-row align="center" class="list px-3 mx-auto">

      <v-col cols="12" md="8" class="mt-10">
        <v-text-field v-model="name" label="Search by Name"></v-text-field>
      </v-col>

      <v-col cols="12" md="4" class="mt-10">
        <v-btn class="white--text" rounded width="30%" color="#002C3E" @click="searchName">Search</v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Professions List
            <v-btn to="/addProfession" class="ml-10" text>Add</v-btn>
            <v-icon to="/addProfession">mdi-plus</v-icon>
          </v-card-title>

          <v-data-table :headers="headers" :items="professions"
                        :hide-default-footer="false">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editProfession(item.id)">mdi-pencil</v-icon>
              <v-icon small @click="deleteProfession(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-card-actions v-if="professions.length > 0"></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import professionDataService from "../services/profession-data-service";
export default {
  name: "professions-list",
  data() {
    return {
      professions: [],
      name: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveProfessions() {
      professionDataService.getAll()
          .then((response) => {
            this.professions = response.data.map(this.getDisplayProfession);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveProfessions();
    },

    searchName() {
      professionDataService.findByName(this.name)
          .then((response) => {
            this.professions = response.data.map(this.getDisplayProfession);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    editProfession(id) {
      this.$router.push({ name: "profession-details", params: { id: id } });
    },

    deleteProfession(id) {
      professionDataService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProfession(profession) {
      return {
        id: profession.id,
        name: profession.name.length > 30 ? profession.name.substr(0, 30) + "..." : profession.name,
      };
    },
  },
  mounted() {
    this.retrieveProfessions();
  },
};
</script>

<style>
.list {
  max-width: 900px;
}
</style>