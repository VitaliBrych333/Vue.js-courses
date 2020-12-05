import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class NameWindowComponent extends Vue {
  @Prop(String) readonly name!: string

  public onClick(): void {
    switch (this.name) {
      case 'Add movie':
        this.$store.commit('window/SHOW_ADD_PAGE', false)
        break

      case 'Edit movie':
        this.$store.commit('window/SHOW_EDIT_PAGE', false)
        break

      case 'Delete movie':
        this.$store.commit('window/SHOW_DELETE_PAGE', false)
        break

      default:
        break
    }
  }
}
