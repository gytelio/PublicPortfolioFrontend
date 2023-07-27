<template>
  <div>
    Photos
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";
import { IUser } from "../types/types";
import "../styles/photos.css";
    
export default defineComponent({
  data() {
    return {
      property: "Blank",
      users: [] as IUser[],
    };
  },
    
});
</script>
  
