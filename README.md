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
| empty-text | Sting | Empty options text | "No elements" | empty-text="Oops!" |
| search | Boolean | Show/hide search | false | :search="true" |
| pagination | Boolean | Show/hide pagination | false | :pagination="true" |
| item-per-page | [Number, String] | Quantity of items per page | 10 | item-per-page="30" |
| multiple | Boolean | Multiple selection | false | :multiple="true" |

### Example

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
       search
       multiple
       pagination
       empty-text="No any book"
       item-per-page="20"
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
                "title": "Honor?? de Balzac - Le P??re Goriot",
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
                "title": "Emily Bront?? - Wuthering Heights",
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

## Templating
You can create custom templates for some selectors.

### Option
This is the scoped slot to create custom option template.

```vue
<template>
    <v2-select :options="options">
      <template
         slot="option"
         slot-scope="prop">
         <input
            type="checkbox"
            :checked="prop.selected" />
         {{ prop.item.title}}
      </template>
    </v2-select>
</template>
```

#### properties

- ##### item
[Object] - option item (from property "options")

- ##### selected
[Boolean] - selection flag

---

### Arrow ico
This is the scoped slot to create custom arrow ico template.

```vue
<template>
    <v2-select :options="options">
      <template
         slot="arrow"
         slot-scope="prop">
         <i
            class="arrow"
            :class="{'-up': prop.is_show}" />
      </template>
    </v2-select>
</template>
```

#### properties

- ##### is_show

[Object] - dropdown show/hide flag

---

### Remove ico
This is the scoped slot to create custom remove ico template.

```vue
<template>
    <v2-select :options="options">
      <template
         slot="remove">
         x
      </template>
    </v2-select>
</template>
```

---

### Pagination
This is the scoped slot to create custom pagination template.

```vue
<template>
    <v2-select :options="options">
     <template
         slot="pagination"
         slot-scope="prop">
         <a href="/" @click.prevent="prop.first">first</a>
         <a href="/" @click.prevent="prop.prev">prev</a>
         <input @input="prop.change" :value="prop.page" /> / of {{prop.count}}
         <a href="/" @click.prevent="prop.next">next</a>
         <a href="/" @click.prevent="prop.last">last</a>
     </template>
    </v2-select>
</template>
```

#### properties

- ##### page

[Number] - active page count

- ##### count

[Number] - pages quantity

#### events

- **change()** - change active page

- **first()** - go to first page

- **last()** - go to last page

- **prev()** - go to previous page

- **next()** - go to next page

