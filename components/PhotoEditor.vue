<template>
  <div>
    <div
      :class="{ layer: selected }"
      class="over"
      @click="user ? selected = true : undefined"
    >
      <nuxt-img
        v-if="photo"
        :src="photo.url"
        :style="{ width, height }"
        :modifiers="{ roundCorner: 'max', effect: 'grayscale' }"
      />
      <div
        v-else-if="user"
        :style="{width, height}"
        class="no-image flex items-end cursor-pointer z-50"
      >
        <h2 class="text-white">
          No photo
        </h2>
      </div>
    </div>
    <div
      v-if="user && selected"
      class="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-900"
    >
      <div class="bg-white rounded-lg shadow-md p-6 w-96">
        <div
          class="absolute top-2 right-2 text-white cursor-pointer"
          @click.stop="closeModal()"
        >
          <Icon name="mdi:close" />
        </div>
        <div v-if="!photo">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded my-2 hover:bg-blue-600"
            @click="showAdd = !showAdd"
          >
            {{ !showAdd ? "Add New" : "Close" }}
          </button>
          <image-add-form
            v-if="showAdd"
            class="bg-green-500 text-white px-4 py-2 rounded my-2"
            @added="uploadImage($event)"
          />
        </div>
        <button
          v-if="photo"
          class="bg-red-500 text-white px-4 py-2 rounded my-2 hover:bg-red-600"
          @click="deleteImage(photo.public_id)"
        >
          Delete
        </button>
        <div v-if="photo">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded my-2 hover:bg-blue-600"
            @click="showUpdate = !showUpdate"
          >
            {{ !showUpdate ? "Update" : "Close" }}
          </button>
          <image-add-form
            v-if="showUpdate"
            class="bg-green-500 text-white px-4 py-2 rounded my-2"
            @added="updateImage($event, photo.public_id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import photo from "~/routes/photos/api";
import { IPhoto } from "~/types/types";
import ImageAddForm from "./ImageAddForm.vue";
import { userStore } from "../pinia/auth";
import { PropType } from "@nuxtjs/composition-api";
  
export default defineComponent({
  components: { ImageAddForm },
  props: {
    photo: {
      type: Object as PropType<IPhoto | null>,
      default: null,
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    mainIndex: {
      type: Number,
      default: null,
    },
    hiddenClicked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["open"],
  data() {
    return {
      showUpdate: false,
      showAdd: false,
      user: null as string | null,
      selected: false,
    };
  },
  watch: {
    hiddenClicked() {
      if (this.hiddenClicked) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    },
  },
  async mounted() {
    const userBasket = userStore();
    this.user = userBasket.user;
  },
  methods: {
    async uploadImage(image: FormData) {
      const confirmUpload = window.confirm("Are you sure you want to upload this image?");
      if (confirmUpload) {
        try {
          await photo().post(image, this.mainIndex);
          this.selected = false;
          this.showAdd = false;
        } catch (error) {
          console.error(error);
        }
      }
    },

    async deleteImage(public_id: string) {
      const confirmDelete = window.confirm("Are you sure you want to delete this image?");
      if (confirmDelete) {
        try {
          await photo().delete(public_id);
          this.selected = false;
          this.$emit("open", false);
        } catch (error) {
          console.error(error);
        }
      }
    },

    async updateImage(image: FormData, public_id: string) {
      const confirmUpdate = window.confirm("Are you sure you want to update this image?");
      if (confirmUpdate) {
        try {
          await photo().patch(image, public_id);
          this.selected = false;
          this.showUpdate = false;
          this.$emit("open", false);
        } catch (error) {
          console.error(error);
        }
      }
    },
    closeModal() {
      this.selected = false; 
      this.$emit("open", false);
    },
  },
});
</script>
  
