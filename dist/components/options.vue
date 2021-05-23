<template>
   <ul
      class="v-select-options"
      :style="listStyle"
      >
      <template
         v-for="(option, key) in options"
         >
         <li
            v-if="pagination ? (key < page * itemPerPage && key >= (page - 1) * itemPerPage) : true"
            :key="key"
            :class="{'-selected': multiple ? data.includes(option[$props.idKey]) : data === option[$props.idKey]}"
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
            type: [String, Number, Array],
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
         },
         multiple: {
            type: Boolean,
            default: false
         }
      },
      methods: {
         select(id) {
            if (this.multiple) {
               const data = this.data.slice(0);
               if (data.includes(id)) {
                  this.$emit('remove', id);
               } else {
                  this.$emit('add', id);
               }
            } else {
               this.$emit('select', id);
            }
         }
      }
   };
</script>

<style lang="scss"></style>
