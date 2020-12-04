import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
import selectOptions from '@/components/interfaces/select-options'
import { FilmForm, Film, Genres, MovieRequest } from '@/components/interfaces/interfaces'

const updateFilms = (films: Array<Film>, editFilm: MovieRequest) => {
  const objMovies = JSON.parse(JSON.stringify(films));

  objMovies.forEach((item: MovieRequest) => {
    if (item.id === editFilm.id) {
      for (const key in item) {
        if (key !== 'id') {
          item[key] = editFilm[key];
        }
      }
    }
  });

  return objMovies;
};

@Component({
  components: {
    Multiselect
  },
  computed: {
    ...mapGetters(['films', 'totalFilms', 'filmsCriteria', 'totalFilmsCriteria'])
  }
})
export default class FormComponent extends Vue {
  @Prop(Boolean) readonly showId!: boolean
  @Prop(String) readonly btnLeft!: string
  @Prop(String) readonly btnRight!: string

  private films!: Array<Film>
  private totalFilms!: number
  private filmsCriteria!: Array<Film>
  private totalFilmsCriteria!: number
  private formValues!: FilmForm
  private value!: Array<Genres>
  private isTouched!: boolean
  private hasErrors!: boolean

  private get isInvalid(): boolean {
    return this.isTouched && this.value.length === 0;
  }

  public data(): object {
    const { filmEdit } = this.$store.getters;

    return {
      formValues: {
        id: filmEdit?.id,
        title: filmEdit?.title,
        date: filmEdit?.release_date,
        url: filmEdit?.poster_path,
        overview: filmEdit?.overview,
        runtime: filmEdit?.runtime
      },
      value: filmEdit?.genres.flatMap(
        (item: string) => new Object({ code: item.toLowerCase(), name: item })
      ) || [],
      options: selectOptions,
      isTouched: false,
      hasErrors: true,
    }
  }

  public handleReset(): void {
    const { filmEdit } = this.$store.getters;

    this.formValues = {
      id: filmEdit?.id,
      title: null,
      date: null,
      url: null,
      overview: null,
      runtime: null
    };

    this.value = [];
  }

  public handleSubmit(): void {
    const { filmEdit } = this.$store.getters;

    const movie: MovieRequest = {
      title: this.formValues.title,
      genres: Array.from(this.value, (item: Genres) => item.name),
      release_date: this.formValues.date,
      poster_path: this.formValues.url,
      overview: this.formValues.overview,
      runtime: Number(this.formValues.runtime),
    };

    if (this.btnRight === 'Submit') {
      this.$store.dispatch('ADD_MOVIE', movie);
  
    } else if (this.btnRight === 'Save') {
      movie.id = filmEdit?.id;
      movie.vote_average = filmEdit?.vote_average;

      const newMoviesByCriteria = updateFilms(this.filmsCriteria, movie);
      const newMovies = updateFilms(this.films, movie);

      this.$store.dispatch('UPDATE_MOVIE', { 
        movie,
        newMoviesByCriteria: { 
          data: newMoviesByCriteria,
          totalAmount: this.totalFilmsCriteria
        },
        newMovies: {
          data: newMovies,
          totalAmount: this.totalFilms
        }
      });
    }
  }

  private async performValidation(): Promise<void> {
    this.hasErrors = await (this.$refs.form as Vue & { hasValidationErrors: () => boolean })
                             ?.hasValidationErrors() || this.value.length === 0;
  }

  private onTouch(): void {
    this.isTouched = true;
  }
}
