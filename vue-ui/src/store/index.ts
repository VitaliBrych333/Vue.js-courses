import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { Film, Films } from '@/components/interfaces/interfaces'

Vue.use(Vuex)

const sortBy = (value: string, data: Array<Film>) => {
  let sortData: Array<Film> = [];

  switch (value) {
    case 'vote_average':
      sortData = data.sort((a: Film, b: Film) => b.vote_average - a.vote_average);
      break;
    case 'release_date':
      sortData = data.sort(
        (a: Film, b: Film) => new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf()
      );
      break;
    default:
      break;
  }

  return sortData;
};

export default new Vuex.Store({
  state: {
    movies: { data: [], totalAmount: 0 },
    moviesByCriteria: { data: null , totalAmount: 0 } as Films,
    filmId: {},
    search: '',
    sort: 'release_date',
    genre: 'All',
    loading: false,
    error: null,

    filmEdit: null,
    isShowEditPage: false,
    isShowDeletePage: false,
    isShowAddPage: false,
  },
  getters: {
    films(state) {
      return state.movies.data;
    },
    totalFilms(state) {
      return state.movies.totalAmount;
    },
    filmsCriteria(state) {
      return state.moviesByCriteria.data;
    },
    totalFilmsCriteria(state) {
      return state.moviesByCriteria.totalAmount;
    },
    filmEdit(state) {
      return state.filmEdit;
    },
    filmId(state) {
      return state.filmId;
    },
    search(state) {
      return state.search;
    },
    sortBy(state) {
      return state.sort;
    },
    isShowAddPage(state) {
      return state.isShowAddPage;
    },
    isShowEditPage(state) {
      return state.isShowEditPage;
    },
    isShowDeletePage(state) {
      return state.isShowDeletePage;
    },
    genre(state) {
      return state.genre;
    }
  },
  mutations: {
    FETCH_MOVIES_BEGIN(state) {
      state.loading = true;
      state.error = null;
    },
    FETCH_MOVIES_SUCCESS(state, { newMovies, newMoviesByCriteria }) {
      state.movies = newMovies;
      state.moviesByCriteria = newMoviesByCriteria;
      // state.movies.data = [ ...state.movies.data, ...newMovies.data as []];
      // state.movies.totalAmount = newMovies.totalAmount;
      // state.moviesByCriteria.data = [ ...state.movies.data, ...newMoviesByCriteria.data as []];
      // state.moviesByCriteria.totalAmount = newMoviesByCriteria.totalAmount;
    },
    FETCH_MOVIES_MORE(state, { newMovies, newMoviesByCriteria }) {
      // state.movies = newMovies;
      // state.moviesByCriteria = newMoviesByCriteria;

      console.log('1111111111111111111111', state.movies.data)
      console.log('22222222222', newMovies.data)
      state.movies.data = [ ...state.movies.data, ...newMovies.data as []];
      state.movies.totalAmount = newMovies.totalAmount;
      state.moviesByCriteria.data = [ ...state.movies.data, ...newMoviesByCriteria.data as []];
      state.moviesByCriteria.totalAmount = newMoviesByCriteria.totalAmount;
    },
    FETCH_MOVIES_FAILURE(state, error) {
      state.movies = { data: [], totalAmount: 0 };
      state.loading = false;
      state.error = error;
    },
    FETCH_FILMID_BEGIN(state) {
      state.loading = true;
      state.error = null;
    },
    FETCH_FILMID_SUCCESS(state, filmId) {
      state.loading = false;
      state.filmId = filmId;
    },
    FETCH_FILMID_FAILURE(state, error) {
      state.loading = false;
      state.error = error;
      state.filmId = {};
    },
    SET_SEARCH(state, value) {
      state.search = value;
    },
    SORT(state, value) {
      let typeSort = '';

      switch (value) {
        case 'Release date':
          typeSort = 'release_date';
          break;
        case 'Rating':
          typeSort = 'vote_average';
          break;
        default:
          break;
      }

      const { data } = state.moviesByCriteria;

      if (data && data.length) {
        const sortData = sortBy(typeSort, data.slice());

        state.moviesByCriteria = {
          data: sortData,
          totalAmount: state.moviesByCriteria.totalAmount
        };
      }

      state.sort = typeSort;
    },
    SET_GENRE(state, genre) {
      let totalCount;

      let sortDataByGenre = sortBy(state.sort, state.movies.data.slice());

      if (genre !== 'All') {
        sortDataByGenre = sortDataByGenre
          .slice()
          .filter((film) => film.genres.includes(genre));
        totalCount = sortDataByGenre.length;
      } else {
        totalCount = state.movies.totalAmount;
      }

      state.moviesByCriteria = {
        data: sortDataByGenre,
        totalAmount: totalCount,
      };
      state.genre = genre;
    },
    SET_EDIT_FILM(state, { filmEdit, actionType }) {
      if (actionType) {
        const showWindowEdit = actionType === 'Edit';
        state.isShowEditPage = showWindowEdit;
        state.isShowDeletePage = !showWindowEdit;
      }
      state.filmEdit = filmEdit;
    },
    SHOW_EDIT_PAGE(state, value) {
      state.isShowEditPage = value;
    },
    SHOW_DELETE_PAGE(state, value) {
      state.isShowDeletePage = value;
    },
    SHOW_ADD_PAGE(state, value) {
      state.isShowAddPage = value;
      state.filmEdit = null;
    }
  },
  actions: {
    FETCH_MOVIES({ commit }, { sortBy, search, offset }) {
      commit('FETCH_MOVIES_BEGIN');

      return axios.get(`movies?sortBy=${sortBy}&sortOrder=desc&search=${search}&searchBy=title&offset=${offset}`)
        .then((res) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies: res.data, newMoviesByCriteria: res.data });
          commit('SET_GENRE','All');
          commit('SET_SEARCH', search);
        })
        .catch((err) => commit('FETCH_MOVIES_FAILURE', err));
    },
    DOWNLOAD_MORE({ commit, state }, { offset }) {
      commit('FETCH_MOVIES_BEGIN');

      return axios.get(`movies?sortBy=${state.sort}&sortOrder=desc&search=${state.search}&searchBy=title&offset=${offset}`)
        .then((res) => {
          commit('FETCH_MOVIES_MORE', { newMovies: res.data, newMoviesByCriteria: res.data });
          // commit('SET_GENRE','All');
          // commit('SET_SEARCH', search);
        })
        .catch((err) => commit('FETCH_MOVIES_FAILURE', err));
    },
    DELETE_MOVIE({ commit }, { id, newMovies, newMoviesByCriteria }) {
      return axios.delete(`movies/${id}`)
        .then((res) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies, newMoviesByCriteria });
          commit('SHOW_DELETE_PAGE', false)
        })
        .catch((err) => err);
    },
    ADD_MOVIE({ commit }, movie) {
      return axios.post('movies', JSON.stringify(movie))
        .then((res) => {
          commit('SHOW_ADD_PAGE', false)
        })
        .catch((err) => err);
    },
    UPDATE_MOVIE({ commit }, { movie, newMoviesByCriteria, newMovies }) {
      return axios.put('movies', JSON.stringify(movie))
        .then((res) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies, newMoviesByCriteria });
          commit('SHOW_EDIT_PAGE', false)
        })
        .catch((err) => err);
    },
    FETCH_MOVIES_BY_GENRE({ commit }, { sortBy, filterValue }) {
      commit('FETCH_MOVIES_BEGIN');

      return axios.get(`movies?sortBy=${sortBy}&sortOrder=desc&searchBy=genres&filter=${filterValue}`)
        .then((res) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies: res.data, newMoviesByCriteria: res.data });
          commit('SET_GENRE','All');
        })
        .catch((err) => commit('FETCH_MOVIES_FAILURE', err));
    },
    FETCH_MOVIE_ID({ commit }, id) {
      commit('FETCH_FILMID_BEGIN');

      return axios.get(`movies/${id}`)
        .then((res) => {
          commit('FETCH_FILMID_SUCCESS', res.data);
        })
        .catch((err) => commit('FETCH_FILMID_FAILURE', err));
    }
  },
  modules: {}
})
