import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import getYear from '@/components/filters/filters'

@Component({
  computed: {
    ...mapState('movie', ['filmId'])
  },
  filters: {
    getYear
  }
})
export default class FilmDurationComponent extends Vue {}
