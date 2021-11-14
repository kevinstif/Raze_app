<template>
    <v-content class="bak">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="4" class="colum">
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="letter"
                        >Welcome To Raze</h1>
                        <h4 class="text-center mt-4">
                          Enter your details
                        </h4>
                        <v-form>
                          <v-text-field
                              v-model="signEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                          />

                          <v-text-field
                              v-model="signPassword"
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn to="/Web/Posts" rounded color="teal accent-3" dark >SIGN IN</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import interestDataService from "@/components/interest/services/interest-data-service";

export default {
  name: "Introduction",
  data() {
    return {
      interests: [],
    };
  },
  methods:{
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
}
</script>

<style scoped>

</style>