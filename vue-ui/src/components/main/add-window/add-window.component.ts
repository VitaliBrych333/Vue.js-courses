import Vue from 'vue'
import Component from 'vue-class-component'
import NameWindow from '@/components/shared/name-window/name-window.component.vue'
import FormComponent from '@/components/shared/form/form.component.vue'

@Component({
  components: {
    NameWindow,
    FormComponent
  }
})
export default class AddWindowComponent extends Vue {}
