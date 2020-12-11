import { Module } from 'vuex'

const windowMessage: Module<any, any> = {
  namespaced: true,

  state: {
    filmEdit: null,
    isShowEditPage: false,
    isShowDeletePage: false,
    isShowAddPage: false
  },

  mutations: {
    SET_EDIT_FILM(state, payload) {
      if (payload.actionType) {
        const showWindowEdit = payload.actionType === 'Edit'
        state.isShowEditPage = showWindowEdit
        state.isShowDeletePage = !showWindowEdit
      }
      state.filmEdit = payload.filmEdit
    },
    SHOW_EDIT_PAGE(state, value) {
      state.isShowEditPage = value
    },
    SHOW_DELETE_PAGE(state, value) {
      state.isShowDeletePage = value
    },
    SHOW_ADD_PAGE(state, value) {
      state.isShowAddPage = value
      state.filmEdit = null
    }
  }
}

export default windowMessage
