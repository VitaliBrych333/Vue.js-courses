import { createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import Vuex from 'vuex'
import movie from './movie'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('movie.module', () => {
  let store: any
  let state = {
    movies: { data: [], totalAmount: 0 },
    moviesByCriteria: { data: [], totalAmount: 0 },
    filmId: {},
    url: '',
    search: '',
    sortBy: 'release_date',
    genre: 'All',
    loading: false,
    error: null
  }

  beforeEach(() =>
    store = new Vuex.Store({
      modules: {
        movie
      }
    })
  )

  it('should equal to value after FETCH_MOVIES_BEGIN', () => {
    const newValue = {
      loading: true,
      error: null
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_MOVIES_BEGIN')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_MOVIES_SUCCESS', () => {
    const payload = {
      newMovies: { data: [{}], totalAmount: 1 },
      newMoviesByCriteria: { data: [{}], totalAmount: 1 }
    }
    const newValue = {
      movies: { data: [{}], totalAmount: 1 },
      moviesByCriteria: { data: [{}], totalAmount: 1 }
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_MOVIES_MORE', () => {
    const payload = {
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    const newValue = {
      movies: { data: [{}], totalAmount: 0 },
      moviesByCriteria: { data: [{}], totalAmount: 0 }
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_MOVIES_MORE', payload)
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_MOVIES_FAILURE', () => {
    const newValue = {
      error: 'test error',
      movies: { data: [], totalAmount: 0 },
      loading: false
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_MOVIES_FAILURE', 'test error')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_FILMID_BEGIN', () => {
    const newValue = {
      loading: true,
      error: null
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_FILMID_BEGIN')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_FILMID_SUCCESS', () => {
    const newValue = {
      loading: false,
      filmId: {}
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_FILMID_SUCCESS', {})
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after FETCH_FILMID_FAILURE', () => {
    const newValue = {
      loading: false,
      error: 'test error',
      filmId: {}
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/FETCH_FILMID_FAILURE', 'test error')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SET_URL', () => {
    const newValue = {
      url: 'test url'
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/SET_URL', 'test url')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SET_SEARCH', () => {
    const newValue = {
      search: 'test'
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/SET_SEARCH', 'test')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SORT when value is Release date', () => {
    const newValue = {
      sortBy: 'release_date',
      movies: { data: [{ release_date: '2012-01-01' }, { release_date: '2014-01-01' }], totalAmount: 2 },
      moviesByCriteria: { data: [{ release_date: '2014-01-01' }, { release_date: '2012-01-01' }], totalAmount: 2 }
    }
    const valueState = Object.assign(state, newValue)

    const payload = {
      newMovies: { data: [{ release_date: '2012-01-01' }, { release_date: '2014-01-01' }], totalAmount: 2 },
      newMoviesByCriteria: { data: [{ release_date: '2012-01-01' }, { release_date: '2014-01-01' }], totalAmount: 2 }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SORT', 'Release date')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SORT when value and moviesByCriteria.data are empty', () => {
    const newValue = {
      sortBy: '',
      movies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      moviesByCriteria: { data: [], totalAmount: 0 }
    }
    const valueState = Object.assign(state, newValue)

    const payload = {
      newMovies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SORT', '')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SORT when moviesByCriteria.data is empty', () => {
    const newValue = {
      sortBy: '',
      movies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      moviesByCriteria: { data: [], totalAmount: 2 }
    }
    const valueState = Object.assign(state, newValue)

    const payload = {
      newMovies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      newMoviesByCriteria: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SORT', '')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SORT when value is Rating', () => {
    const newValue = {
      sortBy: 'vote_average',
      movies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      moviesByCriteria: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 }
    }
    const valueState = Object.assign(state, newValue)

    const payload = {
      newMovies: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 },
      newMoviesByCriteria: { data: [{ vote_average: 8 }, { vote_average: 7 }], totalAmount: 2 }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SORT', 'Rating')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SET_GENRE and genre is All', () => {
    const newValue = {
      genre: 'All',
      movies: { data: [
        { vote_average: 8, genres: ['Comedy'] },
        { vote_average: 7, genres: ['Action'] }
      ], totalAmount: 2 },

      moviesByCriteria: { data: [
        { vote_average: 8, genres: ['Comedy'] },
        { vote_average: 7, genres: ['Action'] }
      ], totalAmount: 2 }
    }
    const valueState = Object.assign(state, newValue)

    const payload = {
      newMovies: { data: [{ vote_average: 8, genres: ['Comedy'] }, { vote_average: 7, genres: ['Action'] }], totalAmount: 2 },
      newMoviesByCriteria: { data: [{ vote_average: 8, genres: ['Comedy'] }, { vote_average: 7, genres: ['Action'] }], totalAmount: 2 }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payload)
    store.commit('movie/SET_GENRE', 'All')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should equal to value after SET_GENRE and genre is Comedy', () => {
    const newValue = {
      genre: 'Comedy',
      movies: { data: [
        { vote_average: 8, genres: ['Comedy'] },
        { vote_average: 7, genres: ['Action'] }
      ], totalAmount: 2 },

      moviesByCriteria: { data: [{ vote_average: 8, genres: ['Comedy'] }], totalAmount: 1 }
    }
    const valueState = Object.assign(state, newValue)

    store.commit('movie/SET_GENRE', 'Comedy')
    expect(store.state.movie).toEqual(valueState)
  })

  it('should call commit 5 times by FETCH_MOVIES when the get request is successful', async () => {
    const payload = {
      sortBy: 'release_date',
      search: 'test',
      offset: 3
    }
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data:
          { data: [], totalAmount: 0 }}
      )
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIES', payload)
    expect(store.commit).toBeCalledTimes(5)
  })

  it('should call commit 3 times by FETCH_MOVIES when the get request is wrong', async () => {
    const payload = {
      sortBy: 'release_date',
      search: 'test',
      offset: 3
    }
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIES', payload)
    expect(store.commit).toBeCalledTimes(3)
  })

  it('should call commit 2 times by DOWNLOAD_MORE when the get request is successful', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data:
          { data: [], totalAmount: 0 }}
      )
    )
    store.commit = jest.fn()

    await store.dispatch('movie/DOWNLOAD_MORE', 3)
    expect(store.commit).toBeCalledTimes(2)
  })

  it('should call commit 2 times by DOWNLOAD_MORE when the get request is wrong', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/DOWNLOAD_MORE', 3)
    expect(store.commit).toBeCalledTimes(2)
  })

  it('should call commit 2 times by DELETE_MOVIE when the get request is successful', async () => {
    const payload = {
      id: 1,
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    mockedAxios.delete.mockImplementationOnce(() =>
      Promise.resolve()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/DELETE_MOVIE', payload)
    expect(store.commit).toBeCalledTimes(2)
  })

  it('should not call commit by DELETE_MOVIE when the get request is wrong', async () => {
    const payload = {
      id: 1,
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    mockedAxios.delete.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/DELETE_MOVIE', payload)
    expect(store.commit).toBeCalledTimes(0)
  })

  it('should call commit 1 times by ADD_MOVIE when the get request is successful', async () => {
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/ADD_MOVIE', {})
    expect(store.commit).toBeCalledTimes(1)
  })

  it('should not call commit by ADD_MOVIE when the get request is wrong', async () => {
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/ADD_MOVIE', {})
    expect(store.commit).toBeCalledTimes(0)
  })

  it('should call commit 2 times by UPDATE_MOVIE when the get request is successful and id does not match to state id', async () => {
    const payload = {
      movie: { id: 1 },
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    mockedAxios.put.mockImplementationOnce(() =>
      Promise.resolve()
    )
    store.commit('movie/FETCH_FILMID_SUCCESS', { id: 3 })
    store.commit = jest.fn()

    await store.dispatch('movie/UPDATE_MOVIE', payload)
    expect(store.commit).toBeCalledTimes(2)
  })

  it('should call commit 3 times by UPDATE_MOVIE when the get request is successful and id matches to state id', async () => {
    const payload = {
      movie: { id: 1 },
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    mockedAxios.put.mockImplementationOnce(() =>
      Promise.resolve()
    )
    store.commit('movie/FETCH_FILMID_SUCCESS', { id: 1 })
    store.commit = jest.fn()

    await store.dispatch('movie/UPDATE_MOVIE', payload)
    expect(store.commit).toBeCalledTimes(3)
  })

  it('should not call commit by UPDATE_MOVIE when the get request is wrong', async () => {
    const payload = {
      movie: { id: 1 },
      newMovies: { data: [], totalAmount: 0 },
      newMoviesByCriteria: { data: [], totalAmount: 0 }
    }
    mockedAxios.put.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/UPDATE_MOVIE', payload)
    expect(store.commit).toBeCalledTimes(0)
  })

  it('should call commit 4 times by FETCH_MOVIES_BY_GENRE when the get request is successful', async () => {
    const payload = {
      sortBy: 'release_date',
      filterValue: 'action'
    }
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data:
          { data: [], totalAmount: 0 }}
      )
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIES_BY_GENRE', payload)
    expect(store.commit).toBeCalledTimes(4)
  })

  it('should call commit 3 times by FETCH_MOVIES_BY_GENRE when the get request is wrong', async () => {
    const payload = {
      sortBy: 'release_date',
      filterValue: 'action'
    }
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIES_BY_GENRE', payload)
    expect(store.commit).toBeCalledTimes(3)
  })

  it('should call commit 2 times by FETCH_MOVIE_ID when the get request is successful', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data:
          { data: [], totalAmount: 0 }}
      )
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIE_ID', 1)
    expect(store.commit).toBeCalledTimes(2)
  })

  it('should call commit 2 times by FETCH_MOVIE_ID when the get request is wrong', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject()
    )
    store.commit = jest.fn()

    await store.dispatch('movie/FETCH_MOVIE_ID', 1)
    expect(store.commit).toBeCalledTimes(2)
  })
})