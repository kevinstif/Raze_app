<template>
  <v-container>
    <div class="max_width">
      <v-combobox :items="interests" v-model="select" item-text="title" item-value="id" return-object
                  label="What is your post about" chips class="d-inline-block" @change="$emit('save-interest',select)"></v-combobox>
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
    }
  },
  mounted() {
    this.retrieveInterests();
  }
}
</script>

<style scoped>
.max_width{
  max-width: 100%;
}
</style>