import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import window from '@/store/modules/window'
import NameWindow from './name-window.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('NameWindow.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        window
      }
    })
  })

  it('should set h2 in Add movie', () => {
    const wrapper = mount(NameWindow, {
      store,
      localVue,
      propsData: {
        name: 'Add movie'
      }
    })
    const svg = wrapper.find('svg')
    const h2 = wrapper.find('h2')

    svg.trigger('click')

    expect(h2.text()).toEqual('Add movie')
  })

  it('should set h2 in Edit movie', () => {
    const wrapper = mount(NameWindow, {
      store,
      localVue,
      propsData: {
        name: 'Edit movie'
      }
    })
    const svg = wrapper.find('svg')
    const h2 = wrapper.find('h2')

    svg.trigger('click')

    expect(h2.text()).toEqual('Edit movie')
  })

  it('should set h2 in Delete movie', () => {
    const wrapper = mount(NameWindow, {
      store,
      localVue,
      propsData: {
        name: 'Delete movie'
      }
    })
    const svg = wrapper.find('svg')
    const h2 = wrapper.find('h2')

    svg.trigger('click')

    expect(h2.text()).toEqual('Delete movie')
  })

  it('should set h2 in empty string', () => {
    const wrapper = mount(NameWindow, {
      store,
      localVue,
      propsData: {
        name: ''
      }
    })
    const svg = wrapper.find('svg')
    const h2 = wrapper.find('h2')

    svg.trigger('click')

    expect(h2.text()).toEqual('')
  })
})
