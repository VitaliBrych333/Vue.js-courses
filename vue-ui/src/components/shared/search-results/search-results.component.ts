import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'
import Card from '@/components/main/card/card.component.vue'
import NotFound from '@/components/shared/not-found/not-found.component.vue'
import EditWindow from '@/components/main/edit-window/edit-window.component.vue'
import DeleteWindow from '@/components/main/delete-window/delete-window.component.vue'

@Component({
  components: {
    Card,
    NotFound,
    EditWindow,
    DeleteWindow
  },
  computed: {
    ...mapGetters(['filmsCriteria', 'totalFilmsCriteria', 'isShowEditPage', 'isShowDeletePage'])
  }
})
export default class SearchResultsComponent extends Vue {

  public created(): void {
    const { search, sortBy, filter, searchBy } = this.$route.query

    if (sortBy && search) {
      this.$store.dispatch('FETCH_MOVIES', { search, sortBy })
    }

    if (sortBy && searchBy && filter) {
      this.$store.dispatch('FETCH_MOVIES_BY_GENRE', { sortBy, filterValue: filter })
    }
  }
}
