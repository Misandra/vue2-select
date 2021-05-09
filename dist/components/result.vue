<template>
   <div
      class="v-select-result"
      :class="{'-open': isShow, '-top': openTop, '-tag': selectedOptions.length && multiple}"
      >
      <div
         class="v-select-result-text"
         :class="{'-min': !multiple, '-opacity': !hasText && is_opacity, '-hide': hasText && is_opacity}"
         >
         <template v-if="multiple">
            <div
               v-for="(item, key) in selectedOptions"
               :key="key"
               class="v-select-result-tag"
               >
               <div class="v-select-result-tag-text">
                  {{ item[$props.nameKey] }}
               </div>
               <span
                  class="v-select-result-clear"
                  @click.stop.prevent="remove(item[$props.idKey])"
                  >
                  <slot name="remove-ico" />
               </span>
            </div>
         </template>
         <div
            v-else
            class="v-select-result-text__text"
            @click.prevent="open"
            >
            {{ text }}
         </div>
         <div
            v-if="!selectedOptions.length"
            class="v-select-result-text__empty"
            @click.prevent="open"
            >
            {{ placeholder }}
         </div>
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
         placeholder: {
            type: String,
            default: 'No elements'
         },
         isShow: {
            type: Boolean,
            default: false
         },
         openTop: {
            type: Boolean,
            default: false
         },
         selectedOptions: {
            type: Array,
            default() {
               return [];
            }
         },
         multiple: {
            type: Boolean,
            default: false
         },
         idKey: {
            type: String,
            default: 'id'
         },
         nameKey: {
            type: String,
            default: 'name'
         },
         search: {
            type: Boolean,
            default: false
         },
         hasText: {
            type: Boolean,
            default: false
         }
      },
      computed: {
         text() {
            let data = '';
            if (!this.multiple && this.selectedOptions.length) {
               data = this.selectedOptions[0][this.nameKey];
            }
            return data || '';
         },
         is_opacity() {
            return !this.multiple && this.search && this.isShow;
         }
      },
      methods: {
         open() {
            this.$emit('open');
         },
         remove(item) {
            this.$emit('remove', item);
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

   &.-tag {
      padding-bottom: 0;
   }

   &-arr {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;

      &-ico {
         display: block;
         width: 30px;
         text-align: center;
         position: relative;
         height: 100%;

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
            transition: all .2s;
            position: relative;
            top: 11px;
         }

         &.-open {
            &:before {
               transform: rotate(315deg);
               top: 14px;
            }
         }
      }
   }

   &-text {
      cursor: default;

      &.-min {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
      &.-opacity {
         opacity: .6;
      }

      &.-hide {
         opacity: 0;
      }

      &__empty {
         cursor: pointer;
         opacity: .6;
      }
      &__text {
         cursor: pointer;
      }
   }

   &-tag {
      text-decoration: none;
      padding: 3px 19px 3px 6px;
      background-color: #f5f5f5;
      color: #2e2e2e;
      font-size: 90%;
      margin-bottom: 6px;
      position: relative;
      max-width: 100%;
      display: inline-block;
      width: fit-content;
      box-sizing: border-box;

      & + .v-select-result-tag {
         margin-left: 3px;
      }

      &-text {
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
   }

   &-clear {
      display: block;
      position: absolute;
      width: 19px;
      height: 23px;
      background:
         url("data:image/svg+xml,%3Csvg id='close' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'"+
      " xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M0.164044 7.15573L0.849707 7.84958L3.99978 "+
      "4.69962L7.14904 7.84898L7.14985 7.84978L7.84965 7.14986L4.69969 3.99973L7.84985 0.849687L7.14274 0.142578L4" +
      ".00042 3.30042L0.850577 0.15041L0.149902 0.849614L3.30223 4.00205L0.164044 7.15573Z'/%3E%3C/svg%3E")
         center center no-repeat;
      background-size: 8px;
      right: 0;
      top: 0;
      cursor: pointer;
      text-align: center;
      line-height: 23px;
   }
}
</style>
