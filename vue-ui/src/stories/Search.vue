<template>
  <div class="search" style="margin-top: 0">
    <h1>Find your movie</h1>
    <b-form @submit="onSubmit" class="form">
      <b-form-input
        id="input-1"
        v-model="form.value"
        type="text"
        required
        :placeholder="placeholder"
        :style="style"
      >
      </b-form-input>
      <b-button type="submit" :disabled="validate()" :size="size" :style="style"
        >Search</b-button
      >
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Form } from '../components/interfaces/interfaces'
import '../components/shared/search/search.component.scss'

@Component({})
export default class Search extends Vue {
  @Prop({ type: String, default: 'Enter film name' })
  public placeholder!: Record<string, any>
  @Prop({ type: String, default: '' }) public size!: Record<string, any>
  @Prop({ type: String, default: '' }) public backgroundColor!: Record<
    string,
    any
  >
  @Prop({ type: Boolean, default: true }) public disabled!: boolean

  private form = {} as Form

  public data(): object {
    return {
      form: {
        value: ''
      }
    }
  }

  public get style(): Record<string, any> {
    return {
      backgroundColor: this.backgroundColor
    }
  }

  private validate(): boolean {
    if (!this.disabled) {
      return false
    }
    return this.form.value.trim() === ''
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
    this.$emit('onClick')
  }
}
</script>
