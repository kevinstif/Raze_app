<template>
      <v-content class="bak">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" md=4 class="colum">
                        <iframe width="373" height="470"
                                src="https://www.youtube.com/embed/fIX_Pu2Gw78?start=30&autoplay=1&controls=0&disablekb=1&modestbranding=1&start:1"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write;
                                encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="letterMax"
                          >Welcome to Raze</h1>
                          <pre>

                          </pre>
                          <h4 class="text-center mt-29">
                            We are very happy to have you as a member of our community </h4>
                        </v-card-text>
                        <div class="container">
                          <div class="box">
                            <a href="#">
                              <img src="https://i.pinimg.com/564x/2f/2b/ae/2f2bae3425719788f4de1e0a5dc09e34.jpg">
                              <div class="capa">
                                <h2>Hola Mundo</h2>
                              </div>
                            </a>
                          </div>

                          <div class="box">
                            <a href="#">
                              <img src="https://i.pinimg.com/originals/41/63/1c/41631cafe3b9b737badf52dd428fd74e.jpg">
                              <div class="capa">
                                <h2>Hola Mundo</h2>
                              </div>
                            </a>
                          </div>

                          <div class="box">
                            <a href="#">
                              <img src="https://i.pinimg.com/originals/8e/07/74/8e0774d8e79a03476a41214945bccf86.jpg">
                              <div class="capa">
                                <h2>Hola Mundo</h2>
                              </div>
                            </a>
                          </div>
                        </div>
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
export default {
  name: "Introduction",
  data: () => ({
    step:1
  }),
}
</script>

<style scoped>

.letterMax{
  font-size: 60px;
  text-align: center;
  color: #F7444E;;
}
.container{
  width: 100%;
  height: 100vh;
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
  height: 100%;
  object-fit: cover;
}
.capa{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  .container{
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
  }
}

</style>