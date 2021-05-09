<template>
   <div
      class="v-select-search"
      :class="{'-top': !multiple}"
      >
      <input
         ref="input"
         v-model="q"
         type="text"
         >
   </div>
</template>

<script>
   export default {
      name: 'Search',
      model: {
         prop: 'value',
         event: 'change'
      },
      props: {
         value: {
            type: String,
            default: ''
         },
         multiple: {
            type: Boolean,
            default: false
         },
         isShow: {
            type: Boolean,
            default: false
         }
      },
      data() {
         return {
            q: ''
         };
      },
      watch: {
         q(data) {
            if (data !== this.value) {
               this.$emit('change', data);
            }
         },
         value(now, before) {
            if (now || before) {
               this.q = now;
            }
         },
         isShow(bool) {
            if (bool) {
               this.$refs.input.focus();
            }
         }
      },
      mounted() {
         this.q = this.value;
      }
   };
</script>

<style lang="scss">
.v-select-search {
   padding: 10px;
   border-bottom: 1px solid #c7c7c7;
   position: relative;

   &.-top {
      position: absolute;
      left: 0;
      bottom: 100%;
      padding: 0;
      width: calc(100% - 30px);
      cursor: pointer;

      &:before {
         display: none;
      }

      input {
         padding: 7px 10px;
         border: none;
         background: none;
      }
   }

   &:before {
      position: absolute;
      content: '';
      width: 14px;
      height: 14px;
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz'+
    '0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OTAiIGhlaWdodD0iNDkwIj4KPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPS'+
    'IjMDAwIiBzdHJva2Utd2lkdGg9IjM2IiBzdHJva2UtbGluZWNhcD0icm91bmQiCmQ9Im0yODAsMjc4YTE1MywxNTMgMCAxLDAtMiwybDE3MC'+
    'wxNzBtLTkxLTExNyAxMTAsMTEwLTI2LDI2LTExMC0xMTAiLz4KPC9zdmc+IA==') no-repeat;
      background-size: contain;
      right: 17px;
      top: 18px;
      opacity: .3;
   }

   input {
      width: 100%;
      border: 1px solid #c7c7c7;
      border-radius: 3px;
      box-sizing: border-box;
      line-height: 1.2;
      padding: 6px 30px 6px 10px;
      outline: none;
   }
}
</style>
