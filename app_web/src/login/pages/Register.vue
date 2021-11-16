
<template>
    <v-content class="bak">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                            class="letter"
                        >Sign in to Raze</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-twitter</v-icon>
                          </v-btn>
                        </div>
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
                        <v-btn @click="validateData" rounded color="teal accent-3" dark >SIGN IN</v-btn>
                        <v-btn  rounded color="teal accent-3" dark  @click="validateData">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="colum">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Do not have an account?</h1>
                        <h5
                            class="text-center"
                        >Sign up and see all the outfits that await you</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">Register</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="colum">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Already have an account?</h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="letter">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form>
                          <v-text-field
                              v-model="createName"
                              label="Name"
                              name="Name"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                          />
                          <v-text-field
                              v-model="createEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                          />

                          <v-text-field
                              v-model="createPassword"
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" dark @click="addUser">SIGN UP</v-btn>
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
import UsersService from '../../users/services/users.services'
export default {
  name:'register',
  data: () => ({
    userRetrieved:{},
    step: 1,
    signEmail:'',
    idResponse:'',
    emailResponse:' ',
    passwordResponse:' ',
    signPassword:'',


    //
    createName:'',
    createEmail:' ',
    createPassword:' ',
  }),
  props: {
    source: String
  },
  methods:{
    getDisplayUser(user){
      return{
        id: user.id,
        name: user.name,
        imgProfile: user.imgProfile,
        age: user.age,
        interestId: user.interestId,
        email: user.email,
        password:user.password,
        userType: user.userType
      };
    },
    validateData(){
      console.log("Ya entro")
      UsersService.findBy(this.signEmail)
          .then(response=>{
            this.userRetrieved=this.getDisplayUser(response.data[0])
            console.log(response)
            console.log("iserretrived");
            console.log(this.userRetrieved)
            this.idResponse=this.userRetrieved.id
            this.signToApp(this.idResponse)
          })
          .catch(e => {
            console.log(e);
          })
    },
    signToApp(id){
      console.log(id)
      this.$router.push(`web/posts/${id}`);
    },
    signToIntroduction(id){
      console.log(this.idResponse)
      this.$router.push(`introduction/${id}`);
    },



    //register
    addUser(){
      const newUser={
        name:this.createName,
        email:this.createEmail,
        password:this.createPassword,
        imgProfile:"",
        age: 1,
        userType: "Advisor"
      }

     UsersService.create(newUser)
          .then(response=>{
            console.log(response.data)
            console.log(newUser)
            this.signToIntroduction(response.data.id)
          })
          .catch(e=>{
            console.log(e)
          })
    }
  }
};
</script>
<style>
.bak{
  background-color: #ffffff;
backface-visibility: unset;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2378bcc4' fill-opacity='0.73' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%C/g%3E%3C/svg%3E");
}
.letter{
  text-align: center;
  width: auto;
  color: #F7444E;
}
.colum{
  background-color: #F7444E;
}
</style>
