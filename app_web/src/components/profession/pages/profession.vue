<template>
  <div>
    <br>
    <v-btn class="float-left" to="/professions" text>Back ←</v-btn>
    <div v-if="currentProfession" class="edit-form py-3">
      <br>
      <p class="headline text-center">Edit profession</p>

      <v-form ref="form" lazy-validation>
        <v-text-field
            v-model="currentProfession.name"
            :rules="[(v) => !!v || 'Name is required']"
            label="Name"
            required></v-text-field>

        <v-divider class="my-5"></v-divider>

        <v-btn class="white--text d_btn" rounded width="20%" color="#002C3E" @click="deleteProfession">
          Delete
        </v-btn>

        <v-btn class="white--text u_btn" rounded width="20%" color="#002C3E" @click="updateProfession">
          Update
        </v-btn>
      </v-form>

    </div>

    <div v-else>
      <p>click on a profession</p>
    </div>
  </div>
</template>

<script>
import professionDataService from "../services/profession-data-service";

export default {
  name: "profession",
  data() {
    return {
      currentProfession: null,
      message: "",
    };
  },
  methods: {
    getProfession(id) {
      professionDataService.get(id)
          .then((response) => {
            this.currentProfession = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updateProfession() {
      professionDataService.update(this.currentProfession.id, this.currentProfession)
          .then((response) => {
            console.log(response.data);
            alert (this.message = "The profession was updated successfully");
          })
          .catch((e) => {
            console.log(e);
          });
    },

    deleteProfession() {
      professionDataService.delete(this.currentProfession.id)
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "professions" });
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = "";
    this.getProfession(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 600px;
  margin: auto;
}
.d_btn{
  margin-left: 20%;
}
.u_btn{
  margin-left: 15%;
}
</style>