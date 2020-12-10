import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import AddWindow from './add-window.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AddWindow.vue', () => {
  let store: any

  beforeEach(
    () =>
      (store = new Vuex.Store({
        state: {
          window: {
            id: 1,
            title: 'test',
            date: '2020-01-01',
            url: 'https://',
            overview: '',
            runtime: 1
          }
        },
        modules: {
          movie
        }
      }))
  )

  it('should render correctly after changing route', () => {
    const wrapper = mount(AddWindow, {
      store,
      localVue
    })

    expect(wrapper.text()).toMatchSnapshot()
  })
})
