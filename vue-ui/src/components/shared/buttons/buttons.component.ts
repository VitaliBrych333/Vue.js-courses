import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class ButtonsComponent extends Vue {
  @Prop(String) readonly type!: string
  @Prop(String) readonly btnLeft!: string
  @Prop(String) readonly btnRight!: string

  private isActive: string | null = this.btnLeft

  public onClick(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent;
    this.isActive = value
    this.$store.commit('SORT', value)
  }
}
