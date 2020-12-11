import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import windowMessage from '@/store/modules/windowMessage'
import CustomToast from './custom-toast.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CustomToast.vue', () => {
  let store: any
  const film = {
    id: 1,
    title: 'test',
    tagline: '',
    vote_average: 1,
    vote_count: 1,
    release_date: '2020-01-01',
    poster_path: 'http://',
    overview: 'test',
    budget: 1,
    revenue: 1,
    genres: [{ code: 'adventure', name: 'Adventure' }],
    runtime: 1
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        windowMessage
      }
    })
  })

  it('should render toast with content when value of p is not empty', () => {
    const content = 'Edit Delete'
    const wrapper = shallowMount(CustomToast, {
      store,
      localVue,
      propsData: {
        toastId: '1',
        info: film
      }
    })
    const p = wrapper.findAll('p').at(0)

    p.trigger('click')

    expect(wrapper.text()).toMatch(content)
  })

  it('should render toast with content when value of p is empty', () => {
    const content = 'Delete'
    const wrapper = shallowMount(CustomToast, {
      store,
      localVue,
      propsData: {
        toastId: '1',
        info: film
      }
    })
    const p = wrapper.findAll('p').at(0)

    p.element.textContent = ''
    p.trigger('click')

    expect(wrapper.text()).toMatch(content)
  })
})
