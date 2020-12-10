import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import movie from '@/store/modules/movie'
import FilmDetails from './film-details.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/test/:id' }]
})

describe('FilmDetails.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        movie
      }
    })
  })

  it('should render correctly after changing route', () => {
    const wrapper = mount(FilmDetails, {
      store,
      localVue,
      router
    })

    wrapper.vm.$router.push('/test/12')

    expect(wrapper.text()).toMatchSnapshot()
  })
})
