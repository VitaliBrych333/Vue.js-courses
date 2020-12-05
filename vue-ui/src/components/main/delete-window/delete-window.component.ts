import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import NameWindow from '@/components/shared/name-window/name-window.component.vue'
import { Film, Films } from '@/components/interfaces/interfaces'

const updateFilms = (films: Films, id: number) => {
  const newValueMovies = {
    data: films.data.filter(item => item.id !== id),
    totalAmount: films.totalAmount - 1
  }

  return newValueMovies
}

@Component({
  components: {
    NameWindow
  },
  computed: {
    ...mapState('movie', ['movies', 'moviesByCriteria']),
    ...mapState('window', ['filmEdit'])
  }
})
export default class DeleteWindowComponent extends Vue {
  private movies!: Films
  private moviesByCriteria!: Films
  private filmEdit!: Film

  public handleDelete(): void {
    const newMovies = updateFilms(this.movies, this.filmEdit.id)
    const newMoviesByCriteria = updateFilms(
      this.moviesByCriteria,
      this.filmEdit.id
    )

    this.$store.dispatch('movie/DELETE_MOVIE', {
      id: this.filmEdit.id,
      newMovies,
      newMoviesByCriteria
    })
  }
}
