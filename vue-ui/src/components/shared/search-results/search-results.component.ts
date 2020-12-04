import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'
import Card from '@/components/main/card/card.component.vue'
import NotFound from '@/components/shared/not-found/not-found.component.vue'
import EditWindow from '@/components/main/edit-window/edit-window.component.vue'
import DeleteWindow from '@/components/main/delete-window/delete-window.component.vue'
import Observer from '@/components/shared/observer/observer.component.vue';

@Component({
  components: {
    Card,
    NotFound,
    EditWindow,
    Observer,
    DeleteWindow
  },
  computed: {
    ...mapGetters(['filmsCriteria', 'totalFilmsCriteria', 'isShowEditPage', 'isShowDeletePage', 'search', 'genre', 'sortBy'])
  }
})
export default class SearchResultsComponent extends Vue {
  public totalFilmsCriteria!: number
  public filmsCriteria!: any

  public offset!: number
  public items!: any

  public genre!: string
  public sortBy!: string
  public search!: string

  public data(): object {
    return {
      offset: 10, items: []
    }
  }

  async intersected() {
    if (this.genre === 'All' && this.filmsCriteria.length !== this.totalFilmsCriteria) {
      console.log('ffffffffffffffffffffffff', this.search)
      this.$store.dispatch('DOWNLOAD_MORE', { offset: this.offset })
      this.offset += 10;
    }
    
    // const res = await fetch(`http://localhost:4000/movies?sortBy=${this.sortBy}&sortOrder=desc&search=king&limit=10&searchBy=title&offset=${
    //   this.offset
    // }`);
    // this.offset += 10;
    // const items = await res.json();
    // console.log('2222222222222222222222222', this.items)
    // this.items = [...this.items, ...items.data];
  }

  // public updated(): void {
  //   if(!this.items.length) this.items = this.filmsCriteria;
  //   console.log('updated', this.items, this.filmsCriteria)
  // }


  public created(): void {
    const { search, sortBy, filter, searchBy } = this.$route.query

    if (sortBy && search) {
      this.$store.dispatch('FETCH_MOVIES', { search, sortBy, offset: 0 })
    }

    if (sortBy && searchBy && filter) {
      this.$store.dispatch('FETCH_MOVIES_BY_GENRE', { sortBy, filterValue: filter })
    }
  }
}
