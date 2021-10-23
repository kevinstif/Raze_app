<template>
  <v-container>
    <v-card>
      <v-card-title>Add Tag</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="title"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="cancel">
          <v-icon>fas fa-window-close</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="save">
        <v-icon>fas fa-check-circle</v-icon>
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {v4 as uuidv4} from "uuid";
import TagsServices from "../services/tags.sevices"
export default {
  name: "add-tags",
  data:()=>({
    title:'',
  }),
  methods:{

    close(){
      this.$emit('close')
    },
    cancel(){
      this.title='';
      this.close();
    },
    save(){
      const newTag={
        id:uuidv4(),
        title:this.title
      }

      TagsServices.create(newTag)
          .then(response=>{
            console.log(response.data)
          })
          .catch(e=>{
            console.log(e)
          })

      this.title='';
      this.close();
    }
  }
}
</script>

<style scoped>

</style>