<template>
  <div
    class="flex"
  >
    <div :style="{width: `${40}%`}">
      <PhotoEditor
        :photo="mainPhotos[1] ?? null"
        :height="'100vh'"
        :width="'100vh'"
        :main-index="1"
      />
    </div>
    <div class="flex items-center justify-center h-screen">
      <div class="photo-wrapper relative">
        <div
          v-if="mainPhotos[2] || user"
          @click="!hiddenPhotoClicked && user ? hiddenPhotoClicked = true : undefined"
        >
          <PhotoEditor
            :photo="mainPhotos[2] ?? null"
            :height="'100vh'"
            :main-index="2"
            :hidden-clicked="hiddenPhotoClicked"
            @open="hiddenPhotoClicked = $event"
          />
          <div
            v-if="!hiddenPhotoClicked"
            class="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div class="w-full h-1 bg-white mb-2" />
            <div
              class="relative"
              @click.stop
            >
              <div class="typewriter">
                <h1 class="text-white text-center">
                  I'm Kamile, a photographer from Lithuania
                </h1>
                <p class="text-xs text-white description-font">
                  Set an element’s line-height at the same time you set the 
                  font size by adding a line-height modifier to any font size utility.
                </p>
              </div>
              <div
                v-if="user"
                @click.prevent="openEdit = true"
              >
                <Icon
                  class="text-white cursor-pointer"
                  name="mdi:edit"
                />
              </div>
            </div>
            <div class="absolute bottom-0 w-full text-center">
              <button
                class="more_button"
                @click.stop=""
              >
                <div
                  class="d-flex justify-content-start align-items-center flex-row theyPerished"
                >
                  See more
                  <Icon
                    name="uil:arrow-down"
                    class="text-2xl"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IPhoto } from "~/types/types";
import { userStore } from "../pinia/auth";
import { galleryStore } from "../pinia/photos";

export default defineComponent({
  data() {
    return {
      user: null as string | null,
      showSide: true,
      gallery: [] as IPhoto[],
      hiddenPhotoClicked: false,
      openEdit: false,
    };
  },
  computed: {
    mainPhotos() {
      const main: { [int: number]: IPhoto } = {};
      for (const photo of this.gallery.filter(el => el.main_index).sort((a, b) => a.main_index || 0 - (b.main_index || 0))) {
        main[photo.main_index!] = photo;
      }
      return main;
    },
  },  
  mounted() {
    const userBasket = userStore();
    this.user = userBasket.user;
    const galleryBasket = galleryStore();
    this.gallery = galleryBasket.gallery;
  },
  methods: {

  },
});
</script>
