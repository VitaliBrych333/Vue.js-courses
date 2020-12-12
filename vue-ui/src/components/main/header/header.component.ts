import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Search from '@/components/shared/search/search.component.vue'
import HeaderNav from '@/components/shared/header-nav/header-nav.component.vue'
import AddWindow from '@/components/main/add-window/add-window.component.vue'
import { InterfaceToast, Film } from '@/components/interfaces/interfaces'

@Component({
  components: {
    Search,
    HeaderNav,
    AddWindow
  },
  computed: {
    ...mapState('windowMessage', ['filmEdit', 'isShowAddPage'])
  }
})
export default class HeaderComponent extends Vue {
  @Prop(Number) readonly count!: number

  private $bvToast!: InterfaceToast
  private filmEdit!: Film

  public onClick(): void {
    const prevIdEdit = this.filmEdit?.id.toString()
    if (prevIdEdit) {
      this.$bvToast.hide(prevIdEdit)
    }
    this.$store.commit('windowMessage/SHOW_ADD_PAGE', true)
  }
}
