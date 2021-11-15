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
                      <iframe class="mold"
                              src="https://www.youtube.com/embed/fIX_Pu2Gw78?start=30&autoplay=1&controls=0&disablekb=1&modestbranding=1&start:1"
                              title="YouTube video player" frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write;
                                encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="letter"
                        >Welcome To Raze</h1>
                        <h4 class="text-center mt-4">
                          Please select one or more of your interests to help us guide you.
                        </h4>
                        <v-form>
                          <div class="mold_interest">
                            <div class="box"    v-for="interest in interests" v-bind:key="interest.id">
                              <a href="#">
                                <img :src="interest.img">
                                <div class="capa">
                                    {{interest.title}}
                                </div>
                              </a>
                              <v-btn
                                  class="btn_select"
                                  elevation="2"
                              >
                                Select
                              </v-btn>
                            </div>
                          </div>
                        </v-form>
                        <h3 class="text-center mt-4">Are you ready?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn to="/Web/Posts" rounded color="teal accent-3" dark >GO</v-btn>
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
        img:interest.img,
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
.mold{
  width: 100%;
  height: 100%;
}
.mold_interest{
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: auto;
}
.box{
  width: 300px;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin: 20px;
  border:3px solid #fff;
}
.box img{
  width: 100%;
  height: 70%;
  object-fit: cover;
}
.capa{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  transform: scale(0);
  transition: .3s ease;
}
.box:hover .capa{
  transform: scale(1);
}
@media only screen and (max-width:900px){
  .mold_interest{
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
  }
}

.btn_select{
  background-color: #78BCC4;
}


</style>