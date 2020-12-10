import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import loader from './loader'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('loader.module', () => {
  const store = new Vuex.Store({
    modules: {
      loader
    }
  })

  it('should equal to value after LOADING', () => {
    const valueState = { isLoading: true }

    store.commit('loader/LOADING', true)

    expect(store.state.loader).toEqual(valueState)
  })
})
