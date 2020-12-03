import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import CustomToast from '@/components/shared/custom-toast/custom-toast.component.vue'
import { BToast, Film } from '@/components/shared/interfaces/interfaces'

@Component({
  components: {
    CustomToast
  },
  computed: {
    ...mapGetters(['filmEdit', 'sortBy'])
  }
})
export default class CardComponent extends Vue {
  private $bvToast!: BToast;
  private filmEdit!: Film;
  private sortBy!: string;
  private show = false;

  @Prop(Object) readonly info!: Film

  public filterByGenre(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent;
    this.$store.dispatch('FETCH_MOVIES_BY_GENRE', { sortBy: this.sortBy, filterValue: value });
  }

  public showDots(): void {
    this.show = true
  }

  public hideDots(): void {
    this.show = false
  }

  public onClick(): void {
    const prevIdEdit = this.filmEdit?.id.toString();
    if (prevIdEdit) {
      this.$bvToast.hide(prevIdEdit);
    }
    this.$store.commit('SET_EDIT_FILM', { filmEdit: this.info });
    this.$bvToast.show(this.info.id.toString());
    this.hideDots()
  }
}

