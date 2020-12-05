import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('movie', ['genre'])
  }
})
export default class CustomNavComponent extends Vue {
  public onClick(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent
    if (value) {
      this.$store.commit('movie/SET_GENRE', value)
    }
  }
}
