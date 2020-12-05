import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Duration from '@/components/shared/film-duration/film-duration.component.vue'
import Rating from '@/components/shared/film-rating/film-rating.component.vue'

@Component({
  components: {
    Duration,
    Rating
  },
  computed: {
    ...mapState('movie', ['filmId'])
  }
})
export default class FilmDetailsComponent extends Vue {
  @Watch('$route.params.id') onRouteIdChanged() {
    this.updateFilm()
  }

  public created(): void {
    this.updateFilm()
  }

  private updateFilm(): void {
    const id = this.$route.params.id
    this.$store.dispatch('movie/FETCH_MOVIE_ID', id)
  }
}
