<template>
   <div class="v-select-pagination">
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
            >&#9204;</a>
      </div>

      <div class="v-select-page">
         {{ page }} / {{ pages }}
      </div>

      <div class="v-select-next">
         <a
            href=""
            :disabled="page === pages"
            @click.prevent="getNext"
            >&#9205;</a>
         <a
            href=""
            :disabled="page === pages"
            @click.prevent="getPage(pages)"
            >
            <span>&#9205;</span><span>&#9205;</span>
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
         getPage(number) {
            if (number > 0 && number <= this.pages) {
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
