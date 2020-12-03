import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['filmId'])
  }
})
export default class FilmRatingComponent extends Vue {

}

