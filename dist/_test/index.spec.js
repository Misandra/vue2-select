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
});
