<template>
   <ul :style="listStyle">
      <li
         v-for="(option, key) in options"
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
