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
        class="flex items-center cursor-pointer z-50"
      >
        <h2 class="text-white">
          No photo
        </h2>
        <div @click="user ? selected = true : undefined">
          <Icon
            class="text-white"
            name="mdi:plus"
          />
        </div>
      </div>
    </div>
    <div
      v-if="user && selected"
      class="absolute inset-0 flex justify-center items-center z-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-md">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded"
          @click="selected = false"
        >
          <Icon name="mdi:close" />
        </button>
        <div>
          <div v-if="!photo">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded"
              @click="showAdd = !showAdd"
            >
              {{ !showAdd ? "Add new" : "Close" }}
            </button>
            <image-add-form
              v-if="showAdd"
              class="bg-green-500 text-white px-4 py-2 rounded"
              @added="uploadImage($event)"
            />
          </div>
          <button
            v-if="photo"
            class="bg-red-500 text-white px-4 py-2 rounded"
            @click="deleteImage(photo.public_id)"
          >
            Delete
          </button>
        </div>
        <div v-if="photo">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded"
            @click="showUpdate = !showUpdate"
          >
            {{ !showUpdate ? "Update" : "Close" }}
          </button>
          <image-add-form
            v-if="showUpdate"
            class="bg-green-500 text-white px-4 py-2 rounded"
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
  },
  data() {
    return {
      showUpdate: false,
      showAdd: false,
      user: null as string | null,
      selected: false,
    };
  },
  async mounted() {
    const userBasket = userStore();
    this.user = userBasket.user;
  },
  methods: {
    async uploadImage(image: FormData) {
      try {
        console.log("addd");
        await photo().post(image, this.mainIndex);
        this.selected = false;
        this.showAdd = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteImage(public_id: string) {
      try {
        await photo().delete(public_id);
        this.selected = false;
      } catch (error) {
        console.error(error);
      }
    },
    async updateImage(image: FormData, public_id: string) {
      try {
        await photo().patch(image, public_id);
        this.selected = false;
        this.showUpdate = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
  
