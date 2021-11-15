<template>
  <div class="relative inline-block overflow-hidden">
    <input
        type="file"
        accept="image/*"
        class="hidden"
        ref="file"
        @change="change"
    />
    <img :src="src" alt="MyProfile" class="my-avatar" />
    <div>
      <button
          type="button"
          @click="browse()"
          class="rounded-full">
        <icon name="camera" class="s_camera"></icon>
      </button>
    </div>
  </div>
</template>

<script>

import Icon from "./icon";

export default {
  name:'myProfile',
  props: {
    value: File,
    defaultSrc: String,
  },
  watch: {
    value(file) {
      if (!file) {
        this.src = this.defaultSrc;
        this.$refs.file.value = "";
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.src = e.target.result;
        };
      }
    },
  },
  data() {
    return {
      src: this.defaultSrc,
    };
  },
  methods: {
    browse() {
      this.$refs.file.click();
    },
    remove() {
      this.$emit("input", null);
    },
    change(e) {
      this.$emit("input", e.target.files[0]);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style>
.hidden{
  visibility: hidden;
}

.my-avatar{
  text-align: center;
  height: 170px;
  border-radius: 100px;
  left: 50%;
  transform: translateX(-110%);
  margin-top: 40px;
}
.s_camera{
  margin-top: 20px;
}
.s_camera:hover{
  opacity: 0.5;
  transition-duration: 200ms;
}
</style>