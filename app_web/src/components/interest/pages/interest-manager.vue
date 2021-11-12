<template>
  <v-container>
    <div class="max_width">
      <v-combobox :items="interests" v-model="select" item-text="title" item-value="id" return-object
                  label="What is your post about" chips class="d-inline-block"></v-combobox>
      <v-btn icon color="green" @click="selectInterest">
        <v-icon>fas fa-check-circle</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import interestDataService from "../services/interest-data-service"

export default {
  name: "interest-manager",
  data:()=>({
    select:[],
    interests:[]
  }),
  methods:{
    getDisplayInterests(interest){
      return{
        id:interest.id,
        title:interest.title
      }
    },
    retrieveInterests(){
      interestDataService.getAll()
          .then(response=>{
            this.interests=response.data.map(this.getDisplayInterests);
            console.log(this.tags)
          })
          .catch(e=>{
            console.log(e)
          })
    },
    selectInterest(){
      const interestId=this.select.id
      this.$emit('save-interest',interestId);
    }
  },
  mounted() {
    this.retrieveInterests();
  }
}
</script>

<style scoped>

</style>