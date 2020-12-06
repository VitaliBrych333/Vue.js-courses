import Vue from 'vue'
import Vuex from 'vuex'
import movie from './modules/movie'
import window from './modules/window'
import loader from './modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie,
    window,
    loader
  }
})
