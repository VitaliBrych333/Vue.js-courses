import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('loader', ['isLoading'])
  }
})
export default class LoadingComponent extends Vue {}
