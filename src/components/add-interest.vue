<template>
  <div><v-btn class="float-left" to="/interests" text>Back ←</v-btn>
  <div class="submit-form mt-3 mx-auto">
    <br><br>
    <p class="headline text-center">Add new interest</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
            v-model="interest.title"
            :rules="[(v) => !!v || 'Title is required']"
            label="Title"
            required></v-text-field>

        <v-text-field
            v-model="interest.description"
            :rules="[(v) => !!v || 'Description is required']"
            label="Description"
            required></v-text-field>
      </v-form>

      <v-btn color="#F7444E" class="mt-5 s-class" @click="saveInterest">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mc">
        <v-card-title>
          Your interest was submitted successfully!
        </v-card-title>
        <v-btn color="#F7444E" class="validation-class" to="/interests" text>Continue</v-btn>
      </v-card>
    </div>
  </div>
  </div>
</template>

<script>
import interestDataService from "../services/interest-data-service";

export default {
  name: "add-interest",
  data() {
    return {
      interest: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveInterest() {
      var data = {
        title: this.interest.title,
        description: this.interest.description,
      };

      interestDataService.create(data)
          .then((response) => {
            this.interest.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
}
.s-class{
  left: 50%;
  transform: translateX(-50%);
}
.validation-class{
  left: 50%;
  transform: translateX(-50%);
}
.mc{
  height: 120px;
}
</style>