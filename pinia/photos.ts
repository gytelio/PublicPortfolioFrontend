import { defineStore } from "pinia";
import { IPhoto } from "~/types/types";

export const galleryStore = defineStore("gallery", {
  state: () => ({ 
    gallery: [] as IPhoto[],
  }),
});
