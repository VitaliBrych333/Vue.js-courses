import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['genre'])
  }
})
export default class CustomNavComponent extends Vue {

  public onClick(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent;
    if (value) {
      this.$store.commit('SET_GENRE', value)
    }
  }
}

