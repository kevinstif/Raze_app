<template>
  <div class="background">
    <v-btn class="float-left" to="/professions" text>Back ←</v-btn>
    <div class="submit-form mt-3 mx-auto">
      <br><br>
      <p class="headline text-center">Add new profession</p>
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
              v-model="profession.name"
              :rules="[(v) => !!v || 'Name is required']"
              label="Name"
              required></v-text-field>
        </v-form>

        <v-btn class="white--text s-class" rounded width="30%" color="#002C3E" @click="saveProfession">Submit</v-btn>
      </div>

      <div v-else>
        <v-card class="mc">
          <v-card-title>
            Your profession was submitted successfully
          </v-card-title>
          <v-btn color="secondary" class="validation-class" to="/professions" text>Continue</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import professionDataService from "../services/profession-data-service";

export default {
  name: "add-profession",
  data() {
    return {
      profession: {
        id: null,
        name: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveProfession() {
      var data = {
        name: this.profession.name,
      };

      professionDataService.create(data)
          .then((response) => {
            this.profession.id = response.data.id;
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
.background{
  background-color: white;
}
</style>
