import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'
import { Form } from '@/components/shared/interfaces/interfaces'

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

  private validate(): boolean {
    return this.form.value.trim() === '';
  }

  private onSubmit(event: Event): void {
    event.preventDefault()
    this.$store.dispatch('FETCH_MOVIES', { search: this.form.value, sortBy: this.sortBy })
  }
}
