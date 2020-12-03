import Vue from 'vue';
import Component from 'vue-class-component';
import FilmDetails from '@/components/shared/film-details/film-details.component.vue'
import HeaderNav from '@/components/shared/header-nav/header-nav.component.vue'
import SearchResults from '@/components/shared/search-results/search-results.component.vue'

@Component({
  components: {
    FilmDetails,
    HeaderNav,
    SearchResults
  }
})
export default class DetailsComponent extends Vue {

}

