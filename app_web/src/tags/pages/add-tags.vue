<template>
  <v-container>
    <v-card>
      <v-card-title>Add Tag</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="title"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="addTags">
          <v-icon>fas fa-window-close</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="addTags">
        <v-icon>fas fa-check-circle</v-icon>
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "add-tags",
  data:()=>({
    title:'',
  }),
  methods:{
    //TODO: add tags will be place here
  }
}
</script>

<style scoped>

</style>