import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupIndicatorProps = HTMLArkProps<'div'>

export const RadioGroupIndicator = defineComponent({
  name: 'RadioGroupIndicator',
  setup(_, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    return () => (
      <ark.div {...groupApi.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
