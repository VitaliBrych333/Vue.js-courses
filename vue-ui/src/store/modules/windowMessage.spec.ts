import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import windowMessage from './windowMessage'

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
          windowMessage
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

    store.commit('windowMessage/SET_EDIT_FILM', payload)

    expect(store.state.windowMessage).toEqual(valueState)
  })

  it('should equal to value after SET_EDIT_FILM when actionType is empty', () => {
    const newValue = {
      filmEdit: {}
    }
    const valueState = Object.assign(state, newValue)

    store.commit('windowMessage/SET_EDIT_FILM', newValue)

    expect(store.state.windowMessage).toEqual(valueState)
  })

  it('should equal to value after SHOW_EDIT_PAGE', () => {
    const newValue = {
      isShowEditPage: true
    }
    const valueState = Object.assign(state, newValue)

    store.commit('windowMessage/SHOW_EDIT_PAGE', true)

    expect(store.state.windowMessage).toEqual(valueState)
  })

  it('should equal to value after SHOW_DELETE_PAGE', () => {
    const newValue = {
      isShowDeletePage: true
    }
    const valueState = Object.assign(state, newValue)

    store.commit('windowMessage/SHOW_DELETE_PAGE', true)

    expect(store.state.windowMessage).toEqual(valueState)
  })

  it('should equal to value after SHOW_ADD_PAGE', () => {
    const newValue = {
      isShowAddPage: true,
      filmEdit: null
    }
    const valueState = Object.assign(state, newValue)

    store.commit('windowMessage/SHOW_ADD_PAGE', true)

    expect(store.state.windowMessage).toEqual(valueState)
  })
})
