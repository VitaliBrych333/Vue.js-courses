import axios from 'axios'
import { Film, Films } from '@/components/interfaces/interfaces'
import { Module } from 'vuex'

const sortBy = (value: string, data: Array<Film>) => {
  let sortData: Array<Film> = []

  switch (value) {
    case 'vote_average':
      sortData = data.sort(
        (a: Film, b: Film) => b.vote_average - a.vote_average
      )
      break
    case 'release_date':
      sortData = data.sort(
        (a: Film, b: Film) =>
          new Date(b.release_date).valueOf() -
          new Date(a.release_date).valueOf()
      )
      break
    default:
      break
  }

  return sortData
}

const movie: Module<any, any> = {
  namespaced: true,

  state: {
    movies: { data: [], totalAmount: 0 },
    moviesByCriteria: { data: [], totalAmount: 0 } as Films,
    filmId: {},
    url: '',
    search: '',
    sortBy: 'release_date',
    genre: 'All',
    loading: false,
    error: null
  },

  mutations: {
    FETCH_MOVIES_BEGIN(state) {
      state.loading = true
      state.error = null
    },
    FETCH_MOVIES_SUCCESS(state, payload) {
      state.movies = payload.newMovies
      state.moviesByCriteria = payload.newMoviesByCriteria
    },
    FETCH_MOVIES_MORE(state, payload) {
      state.movies.data = [
        ...state.movies.data,
        ...(payload.newMovies.data as [])
      ]
      state.movies.totalAmount = payload.newMovies.totalAmount
      state.moviesByCriteria.data = [
        ...state.moviesByCriteria.data,
        ...(payload.newMoviesByCriteria.data as [])
      ]
      state.moviesByCriteria.totalAmount =
        payload.newMoviesByCriteria.totalAmount
    },
    FETCH_MOVIES_FAILURE(state, error) {
      state.movies = { data: [], totalAmount: 0 }
      state.loading = false
      state.error = error
    },
    FETCH_FILMID_BEGIN(state) {
      state.loading = true
      state.error = null
    },
    FETCH_FILMID_SUCCESS(state, filmId) {
      state.loading = false
      state.filmId = filmId
    },
    FETCH_FILMID_FAILURE(state, error) {
      state.loading = false
      state.error = error
      state.filmId = {}
    },
    SET_URL(state, value) {
      state.url = value
    },
    SET_SEARCH(state, value) {
      state.search = value
    },
    SORT(state, value) {
      let typeSort = ''

      switch (value) {
        case 'Release date':
          typeSort = 'release_date'
          break
        case 'Rating':
          typeSort = 'vote_average'
          break
        default:
          break
      }

      const { data } = state.moviesByCriteria

      if (data && data.length) {
        const sortData = sortBy(typeSort, data.slice())

        state.moviesByCriteria = {
          data: sortData,
          totalAmount: state.moviesByCriteria.totalAmount
        }
      }

      state.sortBy = typeSort
    },
    SET_GENRE(state, genre) {
      let totalCount

      let sortDataByGenre = sortBy(state.sortBy, state.movies.data.slice())

      if (genre !== 'All') {
        sortDataByGenre = sortDataByGenre
          .slice()
          .filter(film => film.genres.includes(genre))
        totalCount = sortDataByGenre.length
      } else {
        totalCount = state.movies.totalAmount
      }

      state.moviesByCriteria = {
        data: sortDataByGenre,
        totalAmount: totalCount
      }
      state.genre = genre
    }
  },

  actions: {
    FETCH_MOVIES({ commit }, payload) {
      const url = `movies?sortBy=${payload.sortBy}&sortOrder=desc&search=${payload.search}&searchBy=title`
      commit('SET_URL', url)
      commit('FETCH_MOVIES_BEGIN')

      return axios
        .get(`${url}&offset=${payload.offset}`)
        .then(res => {
          commit('FETCH_MOVIES_SUCCESS', {
            newMovies: res.data,
            newMoviesByCriteria: res.data
          })
          commit('SET_GENRE', 'All')
          commit('SET_SEARCH', payload.search)
        })
        .catch(err => commit('FETCH_MOVIES_FAILURE', err))
    },
    DOWNLOAD_MORE({ commit, state }, offset) {
      commit('FETCH_MOVIES_BEGIN')

      return axios
        .get(`${state.url}&offset=${offset}`)
        .then(res => {
          commit('FETCH_MOVIES_MORE', {
            newMovies: res.data,
            newMoviesByCriteria: res.data
          })
        })
        .catch(err => commit('FETCH_MOVIES_FAILURE', err))
    },
    DELETE_MOVIE({ commit }, payload) {
      return axios
        .delete(`movies/${payload.id}`)
        .then(() => {
          commit('FETCH_MOVIES_SUCCESS', {
            newMovies: payload.newMovies,
            newMoviesByCriteria: payload.newMoviesByCriteria
          })
          commit('windowMessage/SHOW_DELETE_PAGE', false, { root: true })
        })
        .catch(err => err)
    },
    ADD_MOVIE({ commit }, movie) {
      return axios
        .post('movies', JSON.stringify(movie))
        .then(() => {
          commit('windowMessage/SHOW_ADD_PAGE', false, { root: true })
        })
        .catch(err => err)
    },
    UPDATE_MOVIE({ commit, state }, payload) {
      return axios
        .put('movies', JSON.stringify(payload.movie))
        .then(() => {
          payload.movie.id === state.filmId.id
            ? commit('FETCH_FILMID_SUCCESS', payload.movie)
            : undefined
          commit('FETCH_MOVIES_SUCCESS', {
            newMovies: payload.newMovies,
            newMoviesByCriteria: payload.newMoviesByCriteria
          })
          commit('windowMessage/SHOW_EDIT_PAGE', false, { root: true })
        })
        .catch(err => err)
    },
    FETCH_MOVIES_BY_GENRE({ commit }, payload) {
      const url = `movies?sortBy=${payload.sortBy}&sortOrder=desc&searchBy=genres&filter=${payload.filterValue}`
      commit('FETCH_MOVIES_BEGIN')
      commit('SET_URL', url)
      return axios
        .get(`${url}&offset=0`)
        .then(res => {
          commit('FETCH_MOVIES_SUCCESS', {
            newMovies: res.data,
            newMoviesByCriteria: res.data
          })
          commit('SET_GENRE', 'All')
        })
        .catch(err => commit('FETCH_MOVIES_FAILURE', err))
    },
    FETCH_MOVIE_ID({ commit }, id) {
      commit('FETCH_FILMID_BEGIN')

      return axios
        .get(`movies/${id}`)
        .then(res => {
          commit('FETCH_FILMID_SUCCESS', res.data)
        })
        .catch(err => commit('FETCH_FILMID_FAILURE', err))
    }
  }
}

export default movie
