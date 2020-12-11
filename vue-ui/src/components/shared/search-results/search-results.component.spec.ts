import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import windowMessage from '@/store/modules/windowMessage'
import Observer from '@/components/shared/observer/observer.component.vue'
import SearchResults from './search-results.component.vue'

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchResults.vue', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        movie,
        windowMessage
      }
    })
    store.dispatch = jest.fn()
  })

  it('should call store.dispatch with "movie/FETCH_MOVIES" when method is Created', () => {
    const $route = {
      query: {
        search: 'test',
        sortBy: 'test',
        filter: '',
        searchBy: ''
      }
    }
    const wrapper = mount(SearchResults, {
      store,
      localVue,
      mocks: {
        $route
      }
    })

    expect(store.dispatch).toHaveBeenCalledWith('movie/FETCH_MOVIES', {
      search: 'test',
      sortBy: 'test',
      offset: 0
    })
  })

  it('should call store.dispatch with "movie/FETCH_MOVIES_BY_GENRE" when method is Created', () => {
    const $route = {
      query: {
        search: '',
        sortBy: 'test',
        filter: 'action',
        searchBy: 'test'
      }
    }
    const wrapper = mount(SearchResults, {
      store,
      localVue,
      mocks: {
        $route
      }
    })

    expect(store.dispatch).toHaveBeenCalledWith('movie/FETCH_MOVIES_BY_GENRE', {
      sortBy: 'test',
      filterValue: 'action'
    })
  })

  it('should call store.dispatch once when method is Intersected and genre is All', () => {
    const payloadMovies = {
      newMovies: {
        data: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 }
        ],
        totalAmount: 10
      },
      newMoviesByCriteria: {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        totalAmount: 3
      }
    }
    store.commit('movie/FETCH_MOVIES_SUCCESS', payloadMovies)

    const $route = {
      query: {
        search: '',
        sortBy: '',
        filter: '',
        searchBy: ''
      }
    }
    const wrapper = mount(SearchResults, {
      store,
      localVue,
      mocks: {
        $route
      }
    })
    const observer = wrapper.findComponent(Observer)

    observer.vm.$emit('intersect')

    expect(store.dispatch).toHaveBeenCalledTimes(1)
  })

  it('should not call store.dispatch when method is Intersected and genre is not All', () => {
    const payload = {
      newMovies: {
        data: [
          { id: 1, genres: ['Comedy'] },
          { id: 2, genres: ['Action'] }
        ],
        totalAmount: 2
      },
      newMoviesByCriteria: {
        data: [
          { id: 1, genres: ['Comedy'] },
          { id: 2, genres: ['Action'] }
        ],
        totalAmount: 2
      }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SET_GENRE', 'Comedy')
    const $route = {
      query: {
        search: '',
        sortBy: '',
        filter: '',
        searchBy: ''
      }
    }
    const wrapper = mount(SearchResults, {
      store,
      localVue,
      mocks: {
        $route
      }
    })
    const observer = wrapper.findComponent(Observer)

    observer.vm.$emit('intersect')

    expect(store.dispatch).toHaveBeenCalledTimes(0)
  })
})
