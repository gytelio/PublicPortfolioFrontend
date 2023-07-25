<template>
  <div>
    <image-add-form @added="uploadImage($event)" />
    <div
      v-for="image of gallery"
      :key="image.public_id"
    >
      <nuxt-img 
        :src="image.url"
        width="400"
        height="160"
        :modifiers="{ roundCorner: 'max', effect: 'grayscale' }"
      />
      <button @click="deleteImage(image.public_id)">
        Delete
      </button>
      <div>
        <button @click="showUpdate = !showUpdate">
          {{ !showUpdate ? "Update" : "Close" }}
        </button>
        <image-add-form
          v-if="showUpdate"
          @added="updateImage($event, image.public_id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import photo from "~/routes/photos/api";
import { IPhoto } from "~/types/types";
import ImageAddForm from "./ImageAddForm.vue";

export default defineComponent({
  components: { ImageAddForm },
  data() {
    return {
      imageUrl: null as string | null,
      gallery: [] as IPhoto[],
      showUpdate: false,
    };
  },
  async mounted() {
    try {
      const response = await photo().get();
      this.gallery = await response.json();
      console.log({ response: this.gallery });
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async uploadImage(image: FormData) {
      try {
        await photo().post(image);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteImage(public_id: string) {
      try {
        await photo().delete(public_id);
      } catch (error) {
        console.error(error);
      }
    },
    async updateImage(image: FormData, public_id: string) {
      try {
        await photo().patch(image, public_id);
        this.showUpdate = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
