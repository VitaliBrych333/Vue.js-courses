import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'
import NameWindow from '@/components/shared/name-window/name-window.component.vue'
import { Film } from '@/components/interfaces/interfaces'

const updateFilms = (films: Array<Film>, total: number, id: number) => {
  const newValueMovies = {
    data: films.filter((item) => item.id !== id),
    totalAmount: total,
  };

  return newValueMovies;
};

@Component({
  components: {
    NameWindow
  },
  computed: {
    ...mapGetters(['films', 'totalFilms', 'filmsCriteria', 'totalFilmsCriteria', 'filmEdit'])
  }
})
export default class DeleteWindowComponent extends Vue {
  private films!: Array<Film>
  private totalFilms!: number
  private filmsCriteria!: Array<Film>
  private totalFilmsCriteria!: number
  private filmEdit!: Film

  public handleDelete(): void {
    const newMovies = updateFilms(this.films, this.totalFilms - 1, this.filmEdit.id)
    const newMoviesByCriteria = updateFilms(this.filmsCriteria, this.totalFilmsCriteria - 1, this.filmEdit.id)

    this.$store.dispatch('DELETE_MOVIE', { id: this.filmEdit.id, newMovies, newMoviesByCriteria })
  }
}

