import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import Card from '@/components/main/card/card.component.vue'
import NotFound from '@/components/shared/not-found/not-found.component.vue'
import EditWindow from '@/components/main/edit-window/edit-window.component.vue'
import DeleteWindow from '@/components/main/delete-window/delete-window.component.vue'
import Observer from '@/components/shared/observer/observer.component.vue'
import { Films } from '@/components/interfaces/interfaces'

@Component({
  components: {
    Card,
    NotFound,
    EditWindow,
    Observer,
    DeleteWindow
  },
  computed: {
    ...mapState('movie', [
      'movies',
      'moviesByCriteria',
      'search',
      'sortBy',
      'genre'
    ]),
    ...mapState('window', ['isShowEditPage', 'isShowDeletePage'])
  }
})
export default class SearchResultsComponent extends Vue {
  private movies!: Films
  private moviesByCriteria!: Films
  private genre!: string
  private sortBy!: string
  private offset!: number

  public intersected(): void {
    if (
      this.genre === 'All' &&
      this.movies.data.length % 10 === 0 &&
      this.movies.data.length % 10 !== this.moviesByCriteria.totalAmount &&
      this.sortBy !== 'vote_average'
    ) {
      this.offset = this.movies.data.length
      this.$store.dispatch('movie/DOWNLOAD_MORE', this.offset)
      this.offset += 10
    }
  }

  public created(): void {
    const { search, sortBy, filter, searchBy } = this.$route.query

    if (sortBy && search) {
      this.$store.dispatch('movie/FETCH_MOVIES', { search, sortBy, offset: 0 })
    }

    if (sortBy && searchBy && filter) {
      this.$store.dispatch('movie/FETCH_MOVIES_BY_GENRE', {
        sortBy,
        filterValue: filter
      })
    }
  }
}
