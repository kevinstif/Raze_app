<template>
  <v-container>
    <div class="max_width">
      <v-combobox :items="professions" v-model="select" item-text="name" item-value="id" return-object
                  label="professions" chips class="d-inline-block" @change="$emit('save-professions',select.id)">
      </v-combobox>
      <v-btn icon color="black" @click="addProfession">
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialogAdd" max-width="500px">
      <AddProfession></AddProfession>
    </v-dialog>
  </v-container>
</template>

<script>
import professionDataService from "../services/profession-data-service";
import AddProfession from "./add-profession";

export default {
  name: "profession-manager",
  components: {AddProfession},
  data:()=>({
    select:[],
    professions:[],
    dialogAdd:false
  }),
  methods:{
    addProfession(){
      this.dialogAdd=true;
    },
    close(){
      this.dialogAdd=false;
    },
    getDisplayProfession(profession){
      return {
        id: profession.id,
        name: profession.name
      }
    },
    retrieveProfessions(){
      professionDataService.getAll()
          .then(response=>{
            console.log(response.data)
            this.professions=response.data.map(this.getDisplayProfession)
            console.log(this.professions);
          })
          .catch(e=>{
            console.log(e)
          })
    },
    selectProfession(){
      const ProfessionId=this.select.id
      this.$emit('save-professions',ProfessionId);
    }
  },
  mounted() {
    this.retrieveProfessions();
  }
}
</script>

<style scoped>

</style>
