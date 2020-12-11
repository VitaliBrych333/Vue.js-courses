import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import windowMessage from '@/store/modules/windowMessage'
import DeleteWindow from './delete-window.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DeleteWindow.vue', () => {
  let store: any

  beforeEach(
    () =>
      (store = new Vuex.Store({
        modules: {
          movie,
          windowMessage
        }
      }))
  )

  it('should render correctly', () => {
    const wrapper = mount(DeleteWindow, {
      store,
      localVue
    })

    const payloadFilmEdit = {
      actionType: 'Delete',
      filmEdit: { id: 1 }
    }

    const payloadMovies = {
      newMovies: {
        data: [{ id: 1 }],
        totalAmount: 1
      },
      newMoviesByCriteria: {
        data: [{ id: 2 }],
        totalAmount: 1
      }
    }

    store.commit('movie/FETCH_MOVIES_SUCCESS', payloadMovies)
    store.commit('windowMessage/SET_EDIT_FILM', payloadFilmEdit)
    const button = wrapper.findAll('button').at(1)
    button.trigger('click')

    expect(wrapper.text()).toMatchSnapshot()
  })
})
