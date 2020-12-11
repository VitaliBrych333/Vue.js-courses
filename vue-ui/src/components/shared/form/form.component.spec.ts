import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import Form from './form.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AddWindow.vue', () => {
  let store: any
  const filmEdit = {
    id: 1,
    title: 'test',
    date: '2020-01-01',
    url: 'https://',
    overview: 'test',
    genres: ['Family'],
    runtime: 1
  }

  beforeEach(
    () =>
      (store = new Vuex.Store({
        state: {
          windowMessage: {
            filmEdit: filmEdit
          }
        },
        modules: {
          movie
        }
      }))
  )

  it('should render correctly', async () => {
    const wrapper = mount(Form, {
      store,
      localVue,
      propsData: {
        value: [{ code: 'family', name: 'Family' }]
      }
    })
    const buttonRight = wrapper.findAll('button').at(1)
    const multiselect = wrapper
      .findAll('div')
      .filter(w => !w.classes('multiselect'))
      .at(1)

    await multiselect.trigger('input')
    buttonRight.trigger('click')

    expect(wrapper.text()).toMatchSnapshot()
  })

  it('should set buttonRight in Save', async () => {
    const wrapper = mount(Form, {
      store,
      localVue,
      propsData: {
        btnRight: 'Save',
        value: [{ code: 'family', name: 'Family' }]
      }
    })
    const payload = {
      newMovies: {
        data: [
          {
            id: 1,
            title: 'test',
            tagline: 'test',
            vote_average: 2,
            vote_count: 2,
            release_date: '2020-01-01',
            poster_path: 'https://',
            overview: 'test',
            budget: 123,
            revenue: 1,
            genres: ['Action'],
            runtime: 1
          }
        ],
        totalAmount: 1
      },
      newMoviesByCriteria: {
        data: [
          {
            id: 2,
            title: 'test',
            tagline: 'test',
            vote_average: 2,
            vote_count: 2,
            release_date: '2020-01-01',
            poster_path: 'https://',
            overview: 'test',
            budget: 123,
            revenue: 1,
            genres: ['Action'],
            runtime: 1
          }
        ],
        totalAmount: 1
      }
    }
    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)

    const buttonRight = wrapper.findAll('button').at(1)
    const multiselect = wrapper
      .findAll('div')
      .filter(w => !w.classes('multiselect'))
      .at(1)

    await multiselect.trigger('input')
    buttonRight.trigger('click')

    expect(buttonRight.text()).toEqual('Save')
  })

  it('should set buttonRight in Submit', async () => {
    const wrapper = mount(Form, {
      store,
      localVue,
      propsData: {
        btnRight: 'Submit',
        value: [{ code: 'family', name: 'Family' }]
      }
    })
    const buttonRight = wrapper.findAll('button').at(1)
    const multiselect = wrapper
      .findAll('div')
      .filter(el => !el.classes('multiselect'))
      .at(1)

    await multiselect.trigger('input')
    buttonRight.trigger('click')

    expect(buttonRight.text()).toEqual('Submit')
  })

  it('should set buttonLeft in Submit', () => {
    store = new Vuex.Store({
      state: {
        windowMessage: {}
      },
      modules: {
        movie
      }
    })
    const wrapper = mount(Form, {
      store,
      localVue,
      propsData: {
        value: [{ code: 'family', name: 'Family' }]
      }
    })
    const buttonLeft = wrapper.findAll('button').at(0)

    buttonLeft.trigger('click')

    expect(buttonLeft.text()).toEqual('Submit')
  })
})
