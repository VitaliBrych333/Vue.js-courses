import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { Form } from '@/components/interfaces/interfaces'

@Component({
  computed: {
    ...mapState('movie', ['sortBy'])
  }
})
export default class SearchComponent extends Vue {
  private sortBy!: string
  private form = {} as Form

  public data(): object {
    return {
      form: {
        value: ''
      }
    }
  }

  public validate(): boolean {
    return this.form.value.trim() === ''
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
    this.$store.dispatch('movie/FETCH_MOVIES', {
      sortBy: this.sortBy,
      search: this.form.value,
      offset: 0
    })
  }
}
