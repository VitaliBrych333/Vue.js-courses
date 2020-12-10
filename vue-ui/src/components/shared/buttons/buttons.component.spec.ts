import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import Buttons from './buttons.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Buttons.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        movie
      }
    })
  })

  it('should render buttons with content', () => {
    const content = 'Sort by Release date Rating'
    const wrapper = mount(Buttons, {
      store,
      localVue
    })
    const button = wrapper.findAll('button').at(0)

    button.trigger('click')

    expect(wrapper.text()).toMatch(content)
  })
})
