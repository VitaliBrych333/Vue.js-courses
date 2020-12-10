import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import window from '@/store/modules/window'
import movie from '@/store/modules/movie'
import Header from './header.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Search.vue', () => {
  let store: any
  let wrapper: any
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

  const filmEdit = {
    id: 1,
    title: 'test',
    date: '2020-01-01',
    url: 'https://',
    overview: 'test',
    genres: ['Family'],
    runtime: 1
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      modules: {
        window,
        movie
      }
    })
    wrapper = mount(Header, {
      store,
      localVue,
      propsData: {
        count: 1
      }
    })
    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
  })

  it('should render correctly', async () => {
    const button = wrapper.findAll('button').at(0)

    button.trigger('click')

    expect(wrapper.text()).toMatchSnapshot()
  })

  it('should render button with text is "+ Add movie"', async () => {
    const button = wrapper.findAll('button').at(0)

    store.commit('window/SET_EDIT_FILM', { filmEdit })
    button.trigger('click')

    expect(button.text()).toEqual('+ Add movie')
  })
})
