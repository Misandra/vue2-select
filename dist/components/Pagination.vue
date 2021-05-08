<template>
   <div class="v-select-pagination">
      <div class="v-select-prev">
         <a
            href=""
            :disabled="page === 1"
            @click.prevent="getPage(1)"
            >
            <slot name="pagination-first">
               <span>&#9204;</span><span>&#9204;</span>
            </slot>
         </a>
         <a
            href=""
            :disabled="page === 1"
            @click.prevent="getBack"
            >
            <slot name="pagination-prev">
               <span>&#9204;</span>
            </slot>
         </a>
      </div>

      <div class="v-select-page">
         <slot
            name="pagination-pages"
            :page="page"
            :count="pages"
            :change="changePage"
            >
            {{ page }} / {{ pages }}
         </slot>
      </div>

      <div class="v-select-next">
         <a
            href=""
            :disabled="page === pages"
            @click.prevent="getNext"
            >
            <slot name="pagination-next">&#9205;</slot>
         </a>
         <a
            href=""
            :disabled="page === pages"
            @click.prevent="getPage(pages)"
            >
            <slot name="pagination-lase">
               <span>&#9205;</span><span>&#9205;</span>
            </slot>
         </a>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Pagination',
      model: {
         prop: 'value',
         event: 'change'
      },
      props: {
         value: {
            type: Number,
            default: 1
         },
         itemPerPage: {
            type: Number,
            default: 10
         },
         itemsCount: {
            type: Number,
            default: 0
         }
      },
      data() {
         return {
            page: 1
         };
      },
      computed: {
         pages() {
            return Math.ceil(this.itemsCount / this.itemPerPage);
         }
      },
      watch: {
         page(number) {
            this.$emit('change', number);
         },
         value(number) {
            if (number !== this.page) {
               this.page = number;
            }
         }
      },
      methods: {
         getBack() {
            if (this.page !== 1) {
               this.page--;
            }
         },
         getNext() {
            if (this.page !== this.pages) {
               this.page++;
            }
         },
         changePage(data) {
            const input = data;
            const value = input.target.value;
            if (value) {
               if (!Number.isNaN(Number(value))) {
                  this.getPage(Number(value));
               } else {
                  input.target.value = this.page;
               }
            }
         },
         getPage(number) {
            if (number <= 0) {
               this.page = 1;
            } else if (number > this.pages) {
               this.page = this.pages;
            } else {
               this.page = number;
            }
         }
      }
   };
</script>

<style lang="scss">
.v-select-pagination {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding: 6px 10px;
   color: #757575;
}

a {
   text-decoration: none;
   color: #2e2e2e;

   &[disabled] {
      cursor: default;
      pointer-events: none;
      opacity: .6;
   }

   span + span {
      margin-left: -11px;
   }
}
</style>
