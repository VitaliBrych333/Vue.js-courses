import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Buttons from '@/components/shared/buttons/buttons.component.vue'
import CustomNav from '@/components/shared/custom-nav/custom-nav.component.vue'

@Component({
  components: {
    Buttons,
    CustomNav
  },
  computed: {
    ...mapState('movie', ['moviesByCriteria'])
  }
})
export default class HeaderNavComponent extends Vue {
  @Prop(String) readonly type!: string
  @Prop(String) readonly btnLeft!: string
  @Prop(String) readonly btnRight!: string
}
