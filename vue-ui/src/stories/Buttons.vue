<template>
  <div class="buttons">
    <p>Sort by</p>
    <b-button-group :size="size">
      <b-button
        v-bind:class="{ active: sortBy === 'release_date' }"
        @click="onClick"
        :style="style"
        >Release date</b-button
      >
      <b-button
        v-bind:class="{ active: sortBy === 'vote_average' }"
        @click="onClick"
        :style="style"
        >Rating</b-button
      >
    </b-button-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import '../plugins/bootstrap-vue.js'
import '../components/shared/buttons/buttons.component.scss'

@Component({})
export default class Buttons extends Vue {
  @Prop({ type: String, default: 'release_date' }) public sortBy!: Record<
    string,
    any
  >
  @Prop({ type: String, default: '' }) public size!: Record<string, any>
  @Prop({ type: String, default: '' }) public backgroundColor!: Record<
    string,
    any
  >

  public get style(): Record<string, any> {
    return {
      backgroundColor: this.backgroundColor
    }
  }

  public onClick(): void {
    this.$emit('onClick')
  }
}
</script>
