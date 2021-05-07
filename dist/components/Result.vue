<template>
   <div
      class="v-select-result"
      :class="{'-open': isShow, '-top': openTop}"
      >
      <div class="v-select-result-text">
         {{ text }}
      </div>

      <div
         class="v-select-result-arr"
         @click.prevent="open"
         >
         <slot
            name="arr"
            :is_show="isShow"
            >
            <i
               class="v-select-result-arr-ico"
               :class="{'-open': isShow}"
               />
         </slot>
      </div>
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
         },
         isShow: {
            type: Boolean,
            default: false
         },
         openTop: {
            type: Boolean,
            default: false
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

<style lang="scss">
.v-select-result {
   border: 1px solid #c7c7c7;
   border-radius: 3px;
   padding: 6px 30px 6px 10px;
   cursor: pointer;

   &.-open {
      border-radius: 3px 3px 0 0;

      &.-top {
         border-radius: 0 0 3px 3px;
      }
   }

   &-arr {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;

      &-ico {
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

         &.-open {
            margin-top: -12px;
            transform: rotate(181deg);
         }
      }
   }

   &-text {
      cursor: default;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
}
</style>
