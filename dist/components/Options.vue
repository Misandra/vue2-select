<template>
   <ul :style="listStyle">
      <template
         v-for="(option, key) in options"
         >
         <li
            v-if="pagination ? (key < page * itemPerPage && key > (page-1) * itemPerPage) : true"
            :key="key"
            :class="{'-selected': data === option[$props.idKey]}"
            @click.prevent="select(option[$props.idKey])"
            >
            <slot
               name="option-container"
               :option="option"
               :selected="data === option[$props.idKey]"
               >
               {{ option[$props.nameKey] }}
            </slot>
         </li>
      </template>
   </ul>
</template>

<script>
   export default {
      name: 'Options',
      props: {
         data: {
            type: [String, Number],
            default: ''
         },
         options: {
            type: Array,
            default() {
               return [];
            }
         },
         nameKey: {
            type: String,
            default: 'name'
         },
         idKey: {
            type: String,
            default: 'id'
         },
         listStyle: {
            type: String,
            default: ''
         },
         pagination: {
            type: Boolean,
            default: false
         },
         itemPerPage: {
            type: Number,
            default: 10
         },
         page: {
            type: Number,
            default: 1
         }
      },
      methods: {
         select(id) {
            this.$emit('select', id);
         }
      }
   };
</script>

<style lang="scss"></style>
