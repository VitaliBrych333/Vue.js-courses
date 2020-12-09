import { Module } from 'vuex'

// export const mutations = {
//   LOADING(state, value) {
//     state.isLoading = value
//   }
// }

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
