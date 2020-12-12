import Toast from './Toast.vue'

export default {
  title: 'Example/Toast',
  component: Toast,
  argTypes: {
    onClick: { action: 'showToast' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
    onHideToast: { action: 'hideToast' },
    color: {
      control: {
        type: 'select',
        options: ['no', 'primary', 'secondary', 'danger', 'warning', 'success']
      }
    }
  }
}

const Template = (args: Record<string, any>, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Toast },
  template:
    '<Toast @onClick="onClick" @onEdit="onEdit" @onDelete="onDelete" @onHideToast="onHideToast" v-bind="$props" />'
})

export const CustomToast = Template.bind({})
