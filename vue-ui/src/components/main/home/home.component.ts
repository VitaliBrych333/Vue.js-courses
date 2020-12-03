import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/main/header/header.component.vue'
import SearchResults from '@/components/shared/search-results/search-results.component.vue'

@Component({
  components: {
    Header,
    SearchResults
  },
})
export default class HomeComponent extends Vue {

}

