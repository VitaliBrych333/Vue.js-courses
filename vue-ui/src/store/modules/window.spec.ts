import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import window from './window'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('movie.module', () => {
  let store: any
  const state = {
    filmEdit: null,
    isShowEditPage: false,
    isShowDeletePage: false,
    isShowAddPage: false
  }

  beforeEach(
    () =>
      (store = new Vuex.Store({
        modules: {
          window
        }
      }))
  )

  it('should equal to value after SET_EDIT_FILM when actionType is Edit', () => {
    const payload = {
      actionType: 'Edit',
      filmEdit: {}
    }
    const newValue = {
      isShowEditPage: true,
      isShowDeletePage: false,
      filmEdit: {}
    }
    const valueState = Object.assign(state, newValue)

    store.commit('window/SET_EDIT_FILM', payload)

    expect(store.state.window).toEqual(valueState)
  })

  it('should equal to value after SET_EDIT_FILM when actionType is empty', () => {
    const newValue = {
      filmEdit: {}
    }
    const valueState = Object.assign(state, newValue)

    store.commit('window/SET_EDIT_FILM', newValue)

    expect(store.state.window).toEqual(valueState)
  })

  it('should equal to value after SHOW_EDIT_PAGE', () => {
    const newValue = {
      isShowEditPage: true
    }
    const valueState = Object.assign(state, newValue)

    store.commit('window/SHOW_EDIT_PAGE', true)

    expect(store.state.window).toEqual(valueState)
  })

  it('should equal to value after SHOW_DELETE_PAGE', () => {
    const newValue = {
      isShowDeletePage: true
    }
    const valueState = Object.assign(state, newValue)

    store.commit('window/SHOW_DELETE_PAGE', true)

    expect(store.state.window).toEqual(valueState)
  })

  it('should equal to value after SHOW_ADD_PAGE', () => {
    const newValue = {
      isShowAddPage: true,
      filmEdit: null
    }
    const valueState = Object.assign(state, newValue)

    store.commit('window/SHOW_ADD_PAGE', true)

    expect(store.state.window).toEqual(valueState)
  })
})
