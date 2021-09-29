<template>
  <v-container>
    <v-card>
      <v-card-title>{{post.title}}</v-card-title>
      <!--TODO: the image will be place here-->
      <v-card-text>{{post.description}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">More</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "post-item",
  props:[
    "post"
  ]
}
</script>