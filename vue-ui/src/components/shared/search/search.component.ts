import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'
import { Form } from '@/components/interfaces/interfaces'

@Component({
  computed: {
    ...mapGetters(['sortBy'])
  }
})
export default class SearchComponent extends Vue {
  private sortBy!: string
  private form = {} as Form

  public data(): object {
    return {
      form: {
        value: '',
      },
    }
  }
created() {
  console.log('render')
}
  private validate(): boolean {
    return this.form.value.trim() === '';
  }

  private onSubmit(event: Event): void {
    event.preventDefault()
    // this.$store.commit('SET_SEARCH', this.form.value)
    this.$store.dispatch('FETCH_MOVIES', { sortBy: this.sortBy, search: this.form.value, offset: 0 })
  }
}
