<template>
   <div class="app">
      <h1>vue2-select</h1>
      <div class="demo">
         <div class="result">
            Result: {{ value }}
         </div>

         <v2-select
            v-model="value"
            :options="options"
            name-key="title"
            placeholder="Select book..."
            pagination
            search
            multiple
            />
      </div>
   </div>
</template>

<script>
   import books from './books';

   export default {
      data() {
         return {
            value: [],
            options: books
         };
      }
   };
</script>

<style>
html {
   min-height: 100%;
}

.app {
   margin: 20px auto;
   width: 85%;
}

.result {
   margin-bottom: 20px;
}

.v-select {
   width: 300px;
}
</style>
