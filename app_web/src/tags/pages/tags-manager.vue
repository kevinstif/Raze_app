<template>
  <v-container>
    <div class="max_width">
      <v-combobox :items="tags" v-model="select" item-text="title" item-value="id" return-object
                  label="Tags" chips class="d-inline-block"></v-combobox>
      <v-btn icon color="black" @click="addTags">
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
      <v-btn icon color="green" @click="selectTag">
        <v-icon>fas fa-check-circle</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialogAdd" max-width="500px">
      <AddTags v-on:close="close"></AddTags>
    </v-dialog>

  </v-container>
</template>

<script>
import AddTags from "./add-tags";
import TagsServices from "../services/tags.sevices"
export default {
  name: "tags-manager",
  components: {AddTags},
  data:()=>({
    select:[],
    tags:[],
    dialogAdd:false
  }),
  methods:{
    addTags(){
      this.dialogAdd=true;
    },
    close(){
      this.dialogAdd=false;
    },
    getDisplayTags(tag){
      return{
        id:tag.id,
        title:tag.title
      }
    },
    retrieveTags(){
      TagsServices.getAll()
        .then(response=>{
          this.tags=response.data.map(this.getDisplayTags);
          console.log(this.tags)
        })
        .catch(e=>{
          console.log(e)
        })
    },
    selectTag(){
      const tagId=this.select.id
      this.$emit('save-tag',tagId);
    }
  },
  mounted() {
    this.retrieveTags();
  }
}
</script>

<style scoped>
.max_width{
  max-width: 100%;
}

</style>