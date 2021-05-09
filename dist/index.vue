<template>
   <div
      ref="select"
      class="v-select"
      >
      <result
         :selected-options="selected_options"
         :placeholder="placeholder"
         :is-show="is_show"
         :open-top="open_top"
         :multiple="multiple"
         :search="search"
         :has-text="!!q"
         :id-key="idKey"
         :name-key="nameKey"
         @open="open"
         @remove="removeItem"
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
         <template
            v-if="$slots['remove']"
            slot="remove-ico"
            >
            <slot name="remove" />
         </template>
      </result>
      <div
         class="v-select-dropdown"
         :class="{'-show': is_show, '-top': open_top}"
         >
         <search
            v-if="search"
            ref="search"
            v-model="q"
            :multiple="multiple"
            :is-show="is_show"
            />
         <options
            v-if="q ? search_options.length : options.length"
            v-show="is_show"
            :data="data"
            :options="q ? search_options : options"
            :name-key="nameKey"
            :id-key="idKey"
            :list-style="list_style"
            :page="page"
            :pagination="pagination"
            :item-per-page="item_per_page"
            :multiple="multiple"
            @select="selectItem"
            @add="addItem"
            @remove="removeItem"
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
         <pagination
            v-if="pagination"
            ref="pagination"
            v-model="page"
            :items-count="q ? search_options.length : options.length"
            >
            <template
               v-if="$scopedSlots['pagination']"
               slot="pagination-pages"
               slot-scope="props"
               >
               <slot
                  name="pagination"
                  :first="props.first"
                  :prev="props.prev"
                  :next="props.next"
                  :last="props.last"
                  :page="props.page"
                  :count="props.count"
                  :change="props.change"
                  />
            </template>
         </pagination>
      </div>
   </div>
</template>

<script>
   import result from './components/Result.vue';
   import search from './components/Search.vue';
   import options from './components/Options.vue';
   import pagination from './components/Pagination.vue';

   export default {
      components: {
         result, search, options, pagination
      },
      model: {
         prop: 'value',
         event: 'change'
      },
      props: {
         value: {
            type: [String, Number, Array],
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
         },
         search: {
            type: Boolean,
            default: false
         },
         pagination: {
            type: Boolean,
            default: false
         },
         itemPerPage: {
            type: [Number, String],
            default: 10
         },
         multiple: {
            type: Boolean,
            default: false
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
            list_style: '',
            q: '',
            item_per_page: 10,
            page: 1
         };
      },
      computed: {
         search_options() {
            return this.options.reduce((arr, item) => {
               const text = item[this.nameKey].toLowerCase();
               const q = this.q.toLowerCase();
               if (text.match(q)) {
                  arr.push(item);
               }
               return arr;
            }, []);
         },
         selected_options() {
            if (!this.multiple) {
               const arr = [];
               const option = this.options.find((i) => i[this.idKey] === this.data);
               if (option) {
                  arr.push(option);
               }
               return arr;
            }
            const data = JSON.parse(JSON.stringify(this.data));
            return data.length ? data.reduce((arr, item) => {
               const option = this.options.find((i) => i[this.idKey] === item);
               if (option) {
                  arr.push(option);
               }
               return arr;
            }, []) : [];
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
            } else {
               this.q = '';
               this.page = 1;
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
            if (this.multiple && !Array.isArray(this.value)) {
               this.data = [];
            } else {
               this.data = this.value;
            }
            const numbers = ['dropHeight', 'bottomIndent', 'itemPerPage'];
            numbers.forEach((name) => {
               if (Number.isNaN(Number(this[name]))) {
                  console.error(`Option error: "${this._toKebabCase(name)}" must be number or number in string`);
               } else {
                  this[this._toSnakeCase(name)] = Number(this[name]);
               }
            });
         },
         open() {
            this.is_show = !this.is_show;
         },
         setListStyle() {
            const select = this.$refs.select;
            const select_top = select.getBoundingClientRect().top;
            if (this.top !== select_top || this.change_window) {
               const select_height = select.offsetHeight;
               const search_height = this.search && this.multiple ? this.$refs.search.$el.offsetHeight : 0;
               const pages_height = this.pagination ? this.$refs.pagination.$el.offsetHeight : 0;
               const bottom_height = window.innerHeight - (select_top + select_height) - this.bottom_indent;
               const top_height = select.getBoundingClientRect().top - this.bottom_indent;
               this.open_top = this.openTop
                  ? this.openTop : bottom_height < this.drop_height && top_height > bottom_height;
               const max_height = (this.open_top ? top_height : bottom_height) - search_height - pages_height;
               if (max_height < this.drop_height) {
                  this.list_style = `height:${max_height}px`;
               } else {
                  this.list_style = `height:${this.drop_height - search_height - pages_height}px`;
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
         },
         selectItem(data) {
            this.data = data;
            this.is_show = false;
         },
         removeItem(id) {
            const option = this.data.find((i) => i === id);
            const index = this.data.indexOf(option);
            this.data.splice(index, 1);
         },
         addItem(id) {
            this.data.push(id);
         }
      }
   };
</script>

<style lang="scss">
.v-select {
   width: fit-content;
   position: relative;
   font-size: 14px;
   line-height: 1.2;
   font-family: Arial, sans-serif;
   color: #333;

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
