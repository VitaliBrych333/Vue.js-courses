import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import CustomNav from './custom-nav.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CustomNav.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        movie
      }
    })
  })

  it('should render nav with content when value of link is not empty', () => {
    const content = 'All Documentary Comedy Horror Crime'
    const wrapper = mount(CustomNav, {
      store,
      localVue
    })
    const link = wrapper.findAll('a').at(0)

    link.trigger('click')

    expect(wrapper.text()).toMatch(content)
  })

  it('should render nav with content when value of link is empty', () => {
    const content = 'Documentary Comedy Horror Crime'
    const wrapper = mount(CustomNav, {
      store,
      localVue
    })
    const link = wrapper.findAll('a').at(0)
    link.element.textContent = ''

    link.trigger('click')

    expect(wrapper.text()).toMatch(content)
  })
})
