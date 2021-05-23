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
      for (let i = 0; i < 10; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({ options: arr });
      expect(cmp.findAll('.v-select-options li')).toHaveLength(10);
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

   it('Change placeholder property', () => {
      const placeholder = 'Select item...';
      const arr = [];
      for (let i = 0; i < 10; i++) {
         arr.push({
            uniqId: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         placeholder
      });
      expect(cmp.find('.v-select-result-text__empty').text()).toEqual(placeholder);
   });

   it('Change empty text property', () => {
      const empty_text = 'We have no item';
      const cmp = createCmp({
         options: [],
         emptyText: empty_text
      });
      expect(cmp.find('.v-select-empty').text()).toEqual(empty_text);
   });

   it('Change open-top property', () => {
      const cmp = createCmp({
         options: [],
         'open-top': true
      });
      expect(cmp.find('.v-select-result').classes()).toContain('-top');
      expect(cmp.find('.v-select-dropdown').classes()).toContain('-top');
   });

   it('Show search', () => {
      const cmp = createCmp({
         options: [],
         search: true
      });
      expect(cmp.find('.v-select-search').classes().length);
   });

   it('Show pagination', () => {
      const arr = [];
      for (let i = 0; i < 20; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         pagination: true
      });
      expect(cmp.find('.v-select-pagination').classes().length);
   });

   it('Change item-per-page count', async () => {
      const arr = [];
      for (let i = 0; i < 20; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         pagination: true,
         itemPerPage: 2
      });
      await localVue.nextTick();
      expect(cmp.findAll('.v-select-options li').length).toEqual(2);
   });

   it('Set multiple', async () => {
      const resultValue = [2, 3];
      const resultText = 'Test 2, Test 3';
      const resultArr = [];

      const arr = [];
      for (let i = 0; i < 10; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         value: resultValue,
         multiple: true
      });

      await localVue.nextTick();
      const tags = cmp.findAll('.v-select-result-tag-text');
      for (let i = 0; i < tags.length; i++) {
         resultArr.push(tags.at(i).text());
      }
      expect(resultArr.join(', ')).toEqual(resultText);
   });

   it('Change value from parent component', async () => {
      const arr = [];
      for (let i = 0; i < 10; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         value: 2
      });
      await localVue.nextTick();
      expect(cmp.find('.v-select-result-text__text').text()).toEqual('Test 2');
      cmp.setProps({ value: 3 });
      await localVue.nextTick();
      expect(cmp.find('.v-select-result-text__text').text()).toEqual('Test 3');
   });

   it('Search verification', async () => {
      const arr = [];
      for (let i = 0; i < 20; i++) {
         arr.push({
            id: i,
            name: `Test ${i}`
         });
      }
      const cmp = createCmp({
         options: arr,
         search: true
      });

      await localVue.nextTick();
      cmp.find('.v-select-search input').setValue('2');
      // options: "Test 2", "Test 12"
      await localVue.nextTick();
      expect(cmp.findAll('.v-select-options li').length).toEqual(2);
   });
});
