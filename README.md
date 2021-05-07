# vue2-select

## Install

```bash
npm i @misandra/vue2-select --save
```

Then, import and register the component:

```js
import Vue from "vue";
import vue2select from "@misandra/vue2-select";

Vue.component("v2-select", vue2select);
```

## Options

| Option | Type | Description | Default value | Example |
|--------|------|-------------| :-------------: | ------- |
| options | Array | List of items | [] | :options=[{"id": 1,"name": "John"},{"id": 2,"name": "Parker"}] |
| id-key | String | Name of key for id (returned by v-model) | "id" | id-key="uniqId" |
| name-key | String | Name of key for visible value | "name" | name-key="text" |
| placeholder | String | Placeholder text | "Select..." | placeholder="Select name" |
| drop-height | [Number, String] | Dropdown height | 300 | drop-height="500" |
| bottom-indent | [Number, String] | Bottom indent of dropdown | 20 | bottom-indent="20" |
| open-top | Boolean | Open dropdown to top | false | :open-top="true" |

## Example

```vue
<template>
    <v2-select
       :options=books
       id-key="uniqId"
       name-key="title"
       placeholder="Select book..."
       drop-height="200"
       bottom-indent="10"
       open-top
     />
</template>

<script>
   import vue2select from 'vue2-select';

   export default {
      components: {
         'v2-select': vue2select
      },
      data() {
         return {
          books: [
          {
                "title": "One Thousand and One Nights",
                "uniqId": "t7cHOcpV2OotjvHV1Sfe_mltgcwBkRhT"
             },
             {
                "title": "Jane Austen - Pride and Prejudice",
                "uniqId": "O2X6pXTCrGjAnlttxfHcVKtQ8B0ZJmuV"
             },
             {
                "title": "Honoré de Balzac - Le Père Goriot",
                "uniqId": "jyIm3u4H54sEIjWNNdb9f3CLoQAJwt15"
             },
             {
                "title": "Samuel Beckett - Molloy, Malone Dies, The Unnamable, the trilogy",
                "uniqId": "kWbzMd8Q_Q3elXIHKatxuImNScPLDY0j"
             },
             {
                "title": "Giovanni Boccaccio - The Decameron",
                "uniqId": "csDI78SMXE1X2DlLbBx51eh0rdcAckPz"
             },
             {
                "title": "Jorge Luis Borges - Ficciones",
                "uniqId": "fplduVhSy1B8kjtPMdIkfIaSuRl5wTLY"
             },
             {
                "title": "Emily Brontë - Wuthering Heights",
                "uniqId": "KMV0a0SeZbvqjkSkk43Cn7ozIZ9DwYHG"
             },
             {
                "title": "Albert Camus - The Stranger",
                "uniqId": "VMLokHO1T6mI1bwSq5FuckKM6_jYi562"
             }
          ]
         }
      }
   }
</script>
```
