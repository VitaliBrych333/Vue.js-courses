<template>
  <div>
    <b-toast
      :id="toastId"
      :variant="color"
      class="custom-toast"
      static
      no-auto-hide
    >
      <p @click="onClick">Edit</p>
      <p @click="onClick">Delete</p>
    </b-toast>
    <b-button @click="showToast">Show Toast</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import '../components/shared/custom-toast/custom-toast.component.scss'

@Component({})
export default class Toast extends Vue {
  @Prop({ type: String, default: '' }) public color!: Record<string, any>

  private readonly info = { id: 1 }

  private toastId!: string
  public $bvToast!: any

  public mounted(): void {
    this.$bvToast.show(this.info.id.toString())
  }

  public created(): void {
    this.toastId = this.info.id.toString()
  }

  public onClick(event: Event): void {
    const value = (event.target as HTMLButtonElement).textContent

    if (value === 'Edit') {
      this.$bvToast.hide(this.toastId)
      this.$emit('onEdit')
      this.$emit('onHideToast')
    } else if (value === 'Delete') {
      this.$bvToast.hide(this.toastId)
      this.$emit('onDelete')
      this.$emit('onHideToast')
    }
  }

  public showToast(): void {
    this.$bvToast.show(this.info.id.toString())
    this.$emit('onClick')
  }
}
</script>
