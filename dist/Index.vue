<template>
   <div class="v-select">
      <result
         :data="data_values"
         :placeholder="placeholder"
         :class="{'-open': is_show}"
         @open="open"
         />
      <options
         v-show="is_show"
         :data="data"
         :options="options"
         :name-key="nameKey"
         :id-key="idKey"
         @select="select"
         />
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
         }
      },
      data() {
         return {
            is_show: false,
            data: ''
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
         }
      },
      mounted() {
         this.getData();
         window.addEventListener('click', this.handler, true);
         window.addEventListener('keydown', this.handler, true);
      },
      beforeDestroy() {
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
         getData() {
            this.data = this.value;
         },
         select(id) {
            this.data = id;
            this.is_show = false;
         },
         open() {
            this.is_show = !this.is_show;
         }
      }
   };
</script>

<style lang="scss" scoped>
.v-select {
   width: fit-content;
   position: relative;
}
</style>
