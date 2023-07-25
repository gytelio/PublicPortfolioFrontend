<template>
  <div>
    <form
      method="post"
      enctype="multipart/form-data"
      @submit.prevent="uploadImage"
    >
      <label for="imageUpload">Select an image:</label>
      <input
        id="imageUpload"
        ref="fileInput"
        type="file"
        name="file"
      >
      <br>
      <button type="submit">
        Upload
      </button>
    </form>
  </div>
</template>
      
<script lang="ts">
import { defineComponent } from "vue";
import "../styles/contact.css";
      
export default defineComponent({
  emits: ["added"],
  data() {
    return {
    };
  },
  methods: {
    async uploadImage() {
      const fileInput = this.$refs.fileInput as HTMLInputElement | null;      
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        this.$emit("added", formData);
      }
    },
  },
});
</script>
  
