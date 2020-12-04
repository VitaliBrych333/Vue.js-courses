import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'
import getYear from '@/components/filters/filters'

@Component({
  computed: {
    ...mapGetters(['filmId'])
  },
  filters: {
    getYear
  }
})
export default class FilmDurationComponent extends Vue {

}
