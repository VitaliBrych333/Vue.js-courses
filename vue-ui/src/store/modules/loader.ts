import { Module } from 'vuex'

const loader: Module<any, any> = {
  namespaced: true,

  state: {
    isLoading: false
  },

  mutations: {
    LOADING(state, value) {
      state.isLoading = value
    }
  }
}

export default loader
