<template>
  <div id="app">
    <!-- <div>
      <h1>Database / Backend</h1>
      <ul>
        <li
          v-for="user, index in users"
          :key="index"
        >
          {{ user.email }}
        </li>
      </ul>
    </div>
    <div>
      <h1>Pinia</h1>
      {{ $pinia.state.value }}
    </div>
    <button @click="incrementCounter">
      Increment Counter
    </button> -->
  </div>
</template>

<script lang="ts">
// import { useCounterStore } from "../pinia/basket";
// import { defineComponent } from "vue";
// import main from "../routes/api";
// import { IUser } from "../types/types";

// export default defineComponent({
//   data() {
//     return {
//       property: "Blank",
//       users: [] as IUser[],
//     };
//   },

//   computed: {
//     propertyComputed(): string {
//       return this.property;
//     },
//   },

//   created() {
//     this.property = "Example property update.";
//   },

//   async mounted() {
//     try {
//       const response = await main().get();
//       const dataArray = await response.json();
//       this.users = Array.isArray(dataArray) ? dataArray[0] : [];
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   },

//   methods: {
//     incrementCounter() {
//       const store = useCounterStore();
//       store.increment();
//     },
//   },
// });
</script>
