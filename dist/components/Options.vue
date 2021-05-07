<template>
   <div class="v-select-wrapper">
      <ul
         v-if="options && options.length"
         :style="listStyle"
         >
         <li
            v-for="(option, key) in options"
            :key="key"
            :class="{'-selected': data === option[$props.idKey]}"
            @click.prevent="select(option[$props.idKey])"
            >
            {{ option[$props.nameKey] }}
         </li>
      </ul>
      <div
         v-else
         class="v-select-empty"
         >
         No elements
      </div>
   </div>
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
         isShow: {
            type: Boolean,
            default: false
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

<style lang="scss">
.v-select-wrapper {
   position: absolute;
   left: 0;
   top: calc(100% - 1px);
   width: 100%;
   box-sizing: border-box;
   border: 1px solid #c7c7c7;
   border-radius: 0 0 3px 3px;
   background-color: #fff;
   z-index: 100;

   &.-top {
      top: auto;
      bottom: calc(100% - 1px);
      border-radius: 3px 3px 0 0;
   }
   &:not(.-show) {
      visibility: hidden;
      ul {
         height: 0;
      }
   }
   ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
      overflow-y: auto;
      li {
         padding: 6px 10px;
         cursor: pointer;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         &.-selected {
            background-color: #f1f1f1;
         }
         &:hover {
            background-color: #f9f9f9;
         }
      }
   }
}
</style>
