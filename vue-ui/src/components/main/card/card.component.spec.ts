import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import movie from '@/store/modules/movie'
import windowMessage from '@/store/modules/windowMessage'
import Card from './card.component.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Card.vue', () => {
  let store: any
  const film = {
    id: 1,
    title: 'test',
    tagline: '',
    vote_average: 1,
    vote_count: 1,
    release_date: '2020-01-01',
    poster_path: 'http://',
    overview: 'test',
    budget: 1,
    revenue: 1,
    genres: [{ code: 'adventure', name: 'Adventure' }],
    runtime: 1
  }

  beforeEach(
    () =>
      (store = new Vuex.Store({
        state: {},
        modules: {
          movie,
          windowMessage
        }
      }))
  )

  it('should render correctly', () => {
    const wrapper = mount(Card, {
      store,
      localVue,
      propsData: {
        info: film
      }
    })
    const link = wrapper.findAll('a').at(1)
    const svg = wrapper.find('svg')
    const div = wrapper.findAll('div').at(0)

    div.trigger('mouseleave')
    svg.trigger('click')
    link.trigger('click')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render correctly with props info', () => {
    const newFilm = Object.assign(film, { release_date: '' })
    const wrapper = mount(Card, {
      store,
      localVue,
      propsData: {
        info: newFilm,
        filmEdit: newFilm
      }
    })
    const link = wrapper.findAll('a').at(1)
    const svg = wrapper.find('svg')
    const div = wrapper.findAll('div').at(0)

    div.trigger('mouseleave')
    svg.trigger('mouseenter')
    link.trigger('click')

    expect(wrapper.props('info')).toEqual(newFilm)
  })
})
