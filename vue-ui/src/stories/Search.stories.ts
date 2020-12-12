import Search from './Search.vue'

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: {
    onClick: { action: 'search' },
    disabled: { control: { type: 'boolean' } },
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['no', 'sm', 'lg'] } },
    placeholder: {
      control: { type: 'select', options: ['Enter film name', 'Search film'] }
    }
  }
}

const Template = (args: Record<string, any>, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Search },
  template: '<Search @onClick="onClick" v-bind="$props" />'
})

export const SearchInput = Template.bind({})
