<template>
   <div
      ref="select"
      class="v-select"
      >
      <result
         :data="data_values"
         :placeholder="placeholder"
         :is-show="is_show"
         :open-top="open_top"
         @open="open"
         >
         <template
            v-if="$scopedSlots['arrow']"
            slot="arr"
            slot-scope="prop"
            >
            <slot
               name="arrow"
               :is_show="prop.is_show"
               />
         </template>
      </result>
      <div
         class="v-select-dropdown"
         :class="{'-show': is_show, '-top': open_top}"
         >
         <options
            v-if="options && options.length"
            v-show="is_show"
            :data="data"
            :options="options"
            :name-key="nameKey"
            :id-key="idKey"
            :list-style="list_style"
            @select="select"
            >
            <template
               v-if="$scopedSlots['option']"
               slot="option-container"
               slot-scope="props"
               >
               <slot
                  name="option"
                  :item="props.option"
                  :selected="props.selected"
                  />
            </template>
         </options>
         <div
            v-else
            class="v-select-empty"
            >
            {{ emptyText }}
         </div>
      </div>
   </div>
</template>

<script>
   import result from './components/Result.vue';
   import options from './components/Options.vue';

   export default {
      components: { result, options },
      model: {
         prop: 'value',
         event: 'change'
      },
      props: {
         value: {
            type: [String, Number],
            default: ''
         },
         options: {
            type: Array,
            default() {
               return [];
            }
         },
         placeholder: {
            type: String,
            default: 'Выберите элемент'
         },
         nameKey: {
            type: String,
            default: 'name'
         },
         idKey: {
            type: String,
            default: 'id'
         },
         bottomIndent: {
            type: [Number, String],
            default: 20
         },
         dropHeight: {
            type: [Number, String],
            default: 300
         },
         openTop: {
            type: Boolean,
            default: false
         },
         emptyText: {
            type: String,
            default: 'No elements'
         }
      },
      data() {
         return {
            is_show: false,
            data: '',
            top: 0,
            drop_height: 300,
            change_window: false,
            bottom_indent: 20,
            open_top: false,
            list_style: ''
         };
      },
      computed: {
         data_values() {
            const result_value = this.options.find((option) => this.data === option[this.idKey]);
            return result_value ? result_value[this.nameKey] : '';
         }
      },
      watch: {
         data(data) {
            if (this.value !== data) {
               this.$emit('change', this.data);
            }
         },
         value(now, before) {
            if (now || before) {
               this.data = now;
            }
         },
         change_window(bool) {
            if (bool && this.is_show) {
               this.setListStyle();
            }
         },
         is_show(bool) {
            if (bool) {
               this.setListStyle();
            }
         }
      },
      mounted() {
         this.getData();
         this.setListStyle();
         window.addEventListener('resize', this.resize, true);
         window.addEventListener('click', this.handler, true);
         window.addEventListener('keydown', this.handler, true);
      },
      beforeDestroy() {
         window.removeEventListener('resize', this.resize, true);
         window.removeEventListener('click', this.handler, true);
         window.removeEventListener('keydown', this.handler, true);
      },
      methods: {
         handler(event) {
            if (event.keyCode === 27
               || (event.type === 'click' && !this.$el.contains(event.target))) {
               this.is_show = false;
            }
         },
         resize() {
            this.change_window = true;
         },
         getData() {
            this.data = this.value;
            const numbers = ['dropHeight', 'bottomIndent'];
            numbers.forEach((name) => {
               if (Number.isNaN(Number(this[name]))) {
                  console.error(`Option error: "${this._toKebabCase(name)}" must be number or number in string`);
               } else {
                  this[this._toSnakeCase(name)] = Number(this[name]);
               }
            });
         },
         select(id) {
            this.data = id;
            this.is_show = false;
         },
         open() {
            this.is_show = !this.is_show;
         },
         setListStyle() {
            const select = this.$refs.select;
            const select_top = select.getBoundingClientRect().top;
            if (this.top !== select_top || this.change_window) {
               const select_height = select.offsetHeight;
               const bottom_height = window.innerHeight - (select_top + select_height) - this.bottom_indent;
               const top_height = select.getBoundingClientRect().top - this.bottom_indent;
               this.open_top = this.openTop
                  ? this.openTop : bottom_height < this.drop_height && top_height > bottom_height;
               const max_height = (this.open_top ? top_height : bottom_height);
               if (max_height < this.drop_height) {
                  this.list_style = `height:${max_height}px`;
               } else {
                  this.list_style = `height:${this.drop_height}px`;
               }
               this.top = select_top;
               this.change_window = false;
            }
         },
         _toSnakeCase(str) {
            return str.replace(/\W+/g, ' ')
               .split(/ |\B(?=[A-Z])/)
               .map((word) => word.toLowerCase())
               .join('_');
         },
         _toKebabCase(str) {
            return str.replace(/\W+/g, ' ')
               .split(/ |\B(?=[A-Z])/)
               .map((word) => word.toLowerCase())
               .join('-');
         }
      }
   };
</script>

<style lang="scss">
.v-select {
   width: fit-content;
   position: relative;

   &-dropdown {
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

   &-empty {
      text-align: center;
      color: #bbbbbb;
      padding: 6px 10px;
   }
}
</style>
