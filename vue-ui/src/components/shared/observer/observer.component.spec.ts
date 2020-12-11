import { mount } from '@vue/test-utils'
import Observer from './observer.component.vue'

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

describe('Observer.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Observer)

    expect(wrapper.text()).toMatchSnapshot()
  })

  it('should call destroyed', () => {
    const stub = jest.fn()
    const wrapper = mount(Observer, {
      destroyed() {
        stub()
      }
    }).destroy()

    expect(stub).toBeCalled()
  })
})
