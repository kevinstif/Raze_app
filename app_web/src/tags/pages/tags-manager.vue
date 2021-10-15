<template>
  <v-container>
    <div>
      <v-combobox :items="tags" label="Tags" multiple chips class="d-inline-block"></v-combobox>
      <v-btn icon color="black" @click="addTags">
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialogAdd" max-width="500px">
      <AddTags></AddTags>
    </v-dialog>

  </v-container>
</template>

<script>
import AddTags from "./add-tags";
export default {
  name: "tags-manager",
  components: {AddTags},
  data:()=>({
    tags:[
        't-shirt',
        'shorts',
        'pajama'
    ],
    dialogAdd:false
  }),
  methods:{
    addTags(){
      this.dialogAdd=true;
    },
    close(){
      this.dialogAdd=false;
    }
    //TODO: get all will be place here
  }
}
</script>

<style scoped>

</style>