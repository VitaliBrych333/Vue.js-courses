import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface Film {
  id: number,
  title: string,
  tagline: string,
  vote_average: number,
  vote_count: number,
  release_date: string,
  poster_path: string,
  overview: string,
  budget: number,
  revenue: number,
  genres: Array<string>,
  runtime: number
};

interface Films {
  data: Array<Film> | null,
  totalAmount: number  
};

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
    FETCH_MOVIES({ commit }, { sortBy, search}) {
      const request = `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${search}&searchBy=title`;
      commit('FETCH_MOVIES_BEGIN');

      return fetch(request)
        .then((res) => res.json())
        .then((json) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies: json, newMoviesByCriteria: json });
          commit('SET_GENRE','All');
          return json;
        })
        .catch((error) => commit('FETCH_MOVIES_FAILURE', error));
    },
    DELETE_MOVIE({ commit }, { id, newMovies, newMoviesByCriteria }) {
      const request = `http://localhost:4000/movies/${id}`;

      return fetch(request, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          } else {
            commit('FETCH_MOVIES_SUCCESS', { newMovies, newMoviesByCriteria });
            commit('SHOW_DELETE_PAGE', false)
            return res;
          }
        })
        .catch((error) => error);
    },
    ADD_MOVIE({ commit }, movie) {
      const request = 'http://localhost:4000/movies';

      return fetch(request, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie)})
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          } else {
            commit('SHOW_ADD_PAGE', false)
            return res.json();
          }
        })
        .catch((error) => error);
    },
    UPDATE_MOVIE({ commit }, { movie, newMoviesByCriteria, newMovies }) {
      const request = 'http://localhost:4000/movies';

      return fetch(request, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie)})
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          } else {
            commit('FETCH_MOVIES_SUCCESS', { newMovies, newMoviesByCriteria });
            commit('SHOW_EDIT_PAGE', false)
            return res.json();
          }
        })
        .catch((error) => error);
    },
    FETCH_MOVIES_BY_GENRE({ commit }, { sortBy, filterValue }) {
      const request = `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&searchBy=genres&filter=${filterValue}`;
      commit('FETCH_MOVIES_BEGIN');

      return fetch(request)
        .then((res) => res.json())
        .then((json) => {
          commit('FETCH_MOVIES_SUCCESS', { newMovies: json, newMoviesByCriteria: json });
          commit('SET_GENRE','All');
          return json;
        })
        .catch((error) => commit('FETCH_MOVIES_FAILURE', error));
    },
    FETCH_MOVIE_ID({ commit }, id) {
      const request = `http://localhost:4000/movies/${id}`;
      commit('FETCH_FILMID_BEGIN');

      return fetch(request)
        .then((res) => res.json())
        .then((json) => {
          commit('FETCH_FILMID_SUCCESS', json);
          return json;
        })
        .catch((error) => commit('FETCH_FILMID_FAILURE', error));
    }
  },
  modules: {}
})
