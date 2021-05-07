<template>
   <div
      class="v-select-result"
      @click.prevent="open"
      >
      <div class="v-select-result-text">
         {{ text }}
      </div>

      <i />
   </div>
</template>

<script>
   export default {
      name: 'Result',
      props: {
         data: {
            type: [String, Number],
            default: ''
         },
         placeholder: {
            type: String,
            default: 'Элементы отсутствуют'
         }
      },
      computed: {
         text() {
            return this.data ? this.data : this.placeholder;
         }
      },
      methods: {
         open() {
            this.$emit('open');
         }
      }
   };
</script>

<style lang="scss" scoped>
.v-select-result {
   border: 1px solid #c7c7c7;
   border-radius: 3px;
   padding: 6px 30px 6px 10px;
   cursor: pointer;
   &.-open {
      border-radius: 3px 3px 0 0;
      i {
         margin-top: -12px;
         transform: rotate(181deg);
      }
   }
   i {
      width: auto;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -5px;
      transition: all .2s;
      &:before {
         border-color: #333;
         border-style: solid;
         border-width: 2px 2px 0 0;
         content: '';
         display: inline-block;
         height: 5px;
         width: 5px;
         vertical-align: top;
         transform: rotate(133deg);
      }
   }
   &-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
}
</style>
