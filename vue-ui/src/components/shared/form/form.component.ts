import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'
import selectOptions from '@/components/interfaces/select-options'
import {
  FilmForm,
  Film,
  Films,
  Genres,
  MovieRequest
} from '@/components/interfaces/interfaces'

const updateFilms = (films: Array<Film>, editFilm: MovieRequest) => {
  const objMovies = JSON.parse(JSON.stringify(films))

  objMovies.forEach((item: MovieRequest) => {
    if (item.id === editFilm.id) {
      for (const key in item) {
        if (key !== 'id') {
          item[key] = editFilm[key]
        }
      }
    }
  })

  return objMovies
}

@Component({
  components: {
    Multiselect
  },
  computed: {
    ...mapState('movie', ['movies', 'moviesByCriteria'])
  }
})
export default class FormComponent extends Vue {
  @Prop(Boolean) readonly showId!: boolean
  @Prop(String) readonly btnLeft!: string
  @Prop(String) readonly btnRight!: string

  private movies!: Films
  private moviesByCriteria!: Films
  private formValues!: FilmForm
  private value!: Array<Genres>
  private isTouched!: boolean
  private hasErrors!: boolean

  private get isInvalid(): boolean {
    return this.isTouched && this.value.length === 0
  }

  public data(): object {
    const { filmEdit } = this.$store.state.window

    return {
      formValues: {
        id: filmEdit?.id,
        title: filmEdit?.title,
        date: filmEdit?.release_date,
        url: filmEdit?.poster_path,
        overview: filmEdit?.overview,
        runtime: filmEdit?.runtime
      },
      value:
        filmEdit?.genres.flatMap(
          (item: string) => new Object({ code: item.toLowerCase(), name: item })
        ) || [],
      options: selectOptions,
      isTouched: false,
      hasErrors: true
    }
  }

  public handleReset(): void {
    const { filmEdit } = this.$store.state.window

    this.formValues = {
      id: filmEdit?.id,
      title: null,
      date: null,
      url: null,
      overview: null,
      runtime: null
    }

    this.value = []
  }

  public handleSubmit(): void {
    const { filmEdit } = this.$store.state.window

    const movie: MovieRequest = {
      title: this.formValues.title,
      genres: Array.from(this.value, (item: Genres) => item.name),
      release_date: this.formValues.date,
      poster_path: this.formValues.url,
      overview: this.formValues.overview,
      runtime: Number(this.formValues.runtime)
    }

    if (this.btnRight === 'Submit') {
      this.$store.dispatch('movie/ADD_MOVIE', movie)
    } else if (this.btnRight === 'Save') {
      movie.id = filmEdit?.id
      movie.vote_average = filmEdit?.vote_average

      const newMoviesByCriteria = updateFilms(this.moviesByCriteria.data, movie)
      const newMovies = updateFilms(this.movies.data, movie)

      this.$store.dispatch('movie/UPDATE_MOVIE', {
        movie,
        newMoviesByCriteria: {
          data: newMoviesByCriteria,
          totalAmount: this.moviesByCriteria.totalAmount
        },
        newMovies: {
          data: newMovies,
          totalAmount: this.movies.totalAmount
        }
      })
    }
  }

  private async performValidation(): Promise<void> {
    this.hasErrors =
      (await (this.$refs.form as Vue & { hasValidationErrors: () => boolean })
        ?.hasValidationErrors()) || this.value.length === 0
  }

  private onTouch(): void {
    this.isTouched = true
  }
}
