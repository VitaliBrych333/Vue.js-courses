import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState('movie', ['filmId'])
  }
})
export default class FilmRatingComponent extends Vue {}
