import { shallowMount, createLocalVue } from '@vue/test-utils';
import index from '../index.vue';
import result from '../components/result.vue';
import options from '../components/options.vue';
import search from '../components/search.vue';
import pagination from '../components/pagination.vue';

const localVue = createLocalVue();
const createCmp = (propsData) => shallowMount(index, {
   propsData,
   localVue,
   stubs: {
      result,
      options,
      search,
      pagination
   }
});
describe('Select', () => {
   it('Open select', async () => {
      const cmp = createCmp({ options: [] });
      expect(cmp.find('.v-select-result').classes()).not.toContain('-open');
      expect(cmp.find('.v-select-dropdown').classes()).not.toContain('-show');
      cmp.find('.v-select-result-arr').trigger('click');
      await localVue.nextTick();
      expect(cmp.find('.v-select-result').classes()).toContain('-open');
      expect(cmp.find('.v-select-dropdown').classes()).toContain('-show');
   });

   it('Change options property', () => {
      const arr = [];
      for (let i = 0; i < 100; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({ options: arr });
      expect(cmp.findAll('.v-select-dropdown li')).toHaveLength(100);
   });

   it('Change name-key property', async () => {
      const arr = [];
      for (let i = 0; i < 10; i++) {
         arr.push({
            id: i,
            title: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         nameKey: 'title',
         value: 2
      });
      await localVue.nextTick();
      expect(cmp.find('.v-select-result-text__text').text()).toEqual('Test 2');
   });

   it('Change id-key property', async () => {
      const arr = [];
      for (let i = 0; i < 10; i++) {
         arr.push({
            uniqId: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         idKey: 'uniqId',
         value: 2
      });
      await localVue.nextTick();
      expect(cmp.find('.v-select-result-text__text').text()).toEqual('Test 2');
   });

   it('Change placeholder property', async () => {
      const cmp = createCmp({
         options: [],
         placeholder: 'Select item...'
      });
      await localVue.nextTick();
      expect(cmp.find('.v-select-result-text__empty').text()).toEqual('Select item...');
   });
});
