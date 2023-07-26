import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = HTMLArkProps<'input'>

export const RadioInput: ComponentWithProps<RadioInputProps> = defineComponent({
  name: 'RadioInput',
  setup(_, { attrs }) {
    const groupApi = useRadioGroupContext()

    const api = useRadioContext()

    const radioInputProps = computed(() => {
      const apiInputProps = groupApi.value.getRadioInputProps(api)
      const apiInputState = groupApi.value.getRadioState(api)

      return {
        ...apiInputProps,
        modelValue: apiInputState.isChecked,
      }
    })

    return () => <ark.input {...radioInputProps.value} {...attrs} />
  },
})
