<template>
   <div class="v-select-pagination">
      <slot
         name="pagination-pages"
         :first="getFirst"
         :prev="getBack"
         :next="getNext"
         :last="getLast"
         :page="page"
         :count="pages"
         :change="changePage"
         >
         <div class="v-select-prev">
            <a
               href=""
               :disabled="page === 1"
               @click.prevent="getPage(1)"
               >
               <span>&#9204;</span><span>&#9204;</span>
            </a>
            <a
               href=""
               :disabled="page === 1"
               @click.prevent="getBack"
               >
               <span>&#9204;</span>
            </a>
         </div>
         <div class="v-select-page">
            {{ page }} / {{ pages }}
         </div>
         <div class="v-select-next">
            <a
               href=""
               :disabled="page === pages"
               @click.prevent="getNext"
               >
               <span>&#9205;</span>
            </a>
            <a
               href=""
               :disabled="page === pages"
               @click.prevent="getPage(pages)"
               >
               <span>&#9205;</span><span>&#9205;</span>
            </a>
         </div>
      </slot>
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
         },
         getFirst() {
            this.getPage(1);
         },
         getLast() {
            this.getPage(this.pages);
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
