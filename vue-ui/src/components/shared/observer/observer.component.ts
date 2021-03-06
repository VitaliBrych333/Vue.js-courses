import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ObserverComponent extends Vue {
  public observer!: IntersectionObserver

  public data(): object {
    return {
      observer: null
    }
  }

  public mounted(): void {
    const callback = ([entry]: Array<IntersectionObserverEntry>) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
      }
    }
    this.observer = new IntersectionObserver(callback)
    this.observer.observe(this.$el)
  }

  public destroyed(): void {
    this.observer.disconnect()
  }
}
