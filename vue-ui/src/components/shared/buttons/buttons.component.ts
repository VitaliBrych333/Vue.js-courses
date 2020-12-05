import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('movie', ['sortBy'])
  }
})
export default class ButtonsComponent extends Vue {
  public onClick(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent
    this.$store.commit('movie/SORT', value)
  }
}
