import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters } from 'vuex'
import { Film } from '@/components/shared/interfaces/interfaces'

@Component({
  computed: {
    ...mapGetters(['filmId'])
  }
})
export default class FilmDurationComponent extends Vue {
  private filmId!: Film;
  private date = '';

  public updated(): void {
    this.date = this.filmId.release_date.trim().slice(0, 4)
  }
}

