<template>

  <div id="app">
    <AvatarInput
        class="rounded-full rounded text-center mt-20 text-lg"
        v-model="form.avatar"
        default-src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"/>
  </div>

</template>

<script>

import AvatarInput from "./profile-picture-input";

export default {
  name: "profile",
  components: {
    AvatarInput,
  },
  data() {
    return {
      form: {
        avatar: null,
      },
    };
  },
};
</script>

<style>

</style>
