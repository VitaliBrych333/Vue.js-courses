import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import Search from '@/components/shared/search/search.component.vue'
import HeaderNav from '@/components/shared/header-nav/header-nav.component.vue'
import AddWindow from '@/components/main/add-window/add-window.component.vue'
import { BToast, Film } from '@/components/interfaces/interfaces'

@Component({
  components: {
    Search,
    HeaderNav,
    AddWindow
  },
  computed: {
    ...mapGetters(['filmEdit', 'isShowAddPage'])
  }
})
export default class HeaderComponent extends Vue {
  private $bvToast!: BToast;
  private filmEdit!: Film;

  @Prop(Number) readonly count!: number

  public onClick(): void {
    const prevIdEdit = this.filmEdit?.id.toString();
    if (prevIdEdit) {
      this.$bvToast.hide(prevIdEdit);
    }
    this.$store.commit('SHOW_ADD_PAGE', true)
  }
}
