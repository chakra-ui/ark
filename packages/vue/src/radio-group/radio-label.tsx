import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLArkProps<'span'>

export const RadioLabel: ComponentWithProps<RadioLabelProps> = defineComponent({
  name: 'RadioLabel',
  setup(_, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    const api = useRadioContext()

    return () => (
      <ark.span {...groupApi.value.getRadioLabelProps(api)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.span>
    )
  },
})
