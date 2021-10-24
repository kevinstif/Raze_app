<template>
  <div>
    <br>
    <v-btn class="float-left" to="/interests" text>Back ←</v-btn>
  <div v-if="currentInterest" class="edit-form py-3">
    <br>
    <p class="headline text-center">Edit interest</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
          v-model="currentInterest.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required></v-text-field>

      <v-text-field
          v-model="currentInterest.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentInterest.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentInterest.published"
             @click="updatePublished(false)"
             class="white--text" rounded width="30%" color="#002C3E">UnPublish</v-btn>

      <v-btn v-else
             @click="updatePublished(true)"
             class="white--text ml-15" rounded width="20%" color="#002C3E">Publish</v-btn>

      <v-btn class="white--text ml-10" rounded width="20%" color="#002C3E" @click="deleteInterest">
        Delete
      </v-btn>

      <v-btn class="white--text ml-10" rounded width="20%" color="#002C3E" @click="updateInterest">
        Update
      </v-btn>
    </v-form>

  </div>

    <div v-else>
     <p>click on a interest</p>
    </div>
  </div>
</template>

<script>
import interestDataService from "../services/interest-data-service";

export default {
  name: "interest",
  data() {
    return {
      currentInterest: null,
      message: "",
    };
  },
  methods: {
    getInterest(id) {
      interestDataService.get(id)
          .then((response) => {
            this.currentInterest = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updatePublished(status) {
      var data = {
        id: this.currentInterest.id,
        title: this.currentInterest.title,
        description: this.currentInterest.description,
        published: status,
      };

      interestDataService.update(this.currentInterest.id, data)
          .then((response) => {
            this.currentInterest.published = status;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updateInterest() {
      interestDataService.update(this.currentInterest.id, this.currentInterest)
          .then((response) => {
            console.log(response.data);
            alert (this.message = "The interest was updated successfully");
          })
          .catch((e) => {
            console.log(e);
          });
    },

    deleteInterest() {
      interestDataService.delete(this.currentInterest.id)
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "interests" });
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = "";
    this.getInterest(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 600px;
  margin: auto;
}
</style>