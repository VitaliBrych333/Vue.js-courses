import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import Search from './search.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Search.vue', () => {
  let store: any

  beforeEach(
    () =>
      (store = new Vuex.Store({
        state: {},
        modules: {
          movie
        }
      }))
  )

  it('should render correctly', async () => {
    const wrapper = mount(Search, {
      store,
      localVue
    })

    const input = wrapper.find('input')
    const button = wrapper.find('button')

    await input.setValue('test')
    button.trigger('submit')

    expect(wrapper.text()).toMatchSnapshot()
  })
})
