import ButtonGroup from './Buttons.vue'

export default {
  title: 'Example/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    onClick: { action: 'setSortBy' },
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['no', 'sm', 'lg'] } },
    sortBy: {
      control: { type: 'select', options: ['release_date', 'vote_average'] }
    }
  }
}

const Template = (args: Record<string, any>, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonGroup },
  template: '<ButtonGroup @onClick="onClick" v-bind="$props" />'
})

export const ActiveButton = Template.bind({})
