import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import CustomToast from '@/components/shared/custom-toast/custom-toast.component.vue'
import { InterfaceToast, Film } from '@/components/interfaces/interfaces'
import getYear from '@/components/filters/filters'

@Component({
  components: {
    CustomToast
  },
  computed: {
    ...mapState('movie', ['sortBy']),
    ...mapState('windowMessage', ['filmEdit'])
  },
  filters: {
    getYear
  }
})
export default class CardComponent extends Vue {
  @Prop(Object) readonly info!: Film

  private $bvToast!: InterfaceToast
  private filmEdit!: Film
  private sortBy!: string
  private show = false

  public filterByGenre(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent
    this.$store.dispatch('movie/FETCH_MOVIES_BY_GENRE', {
      sortBy: this.sortBy,
      filterValue: value
    })
  }

  public showDots(): void {
    this.show = true
  }

  public hideDots(): void {
    this.show = false
  }

  public hideToast(): void {
    const prevIdEdit = this.filmEdit?.id.toString()
    if (prevIdEdit) {
      this.$bvToast.hide(prevIdEdit)
    }
  }

  public onClick(): void {
    this.$store.commit('windowMessage/SET_EDIT_FILM', { filmEdit: this.info })
    this.$bvToast.show(this.info.id.toString())
    this.hideDots()
  }
}
