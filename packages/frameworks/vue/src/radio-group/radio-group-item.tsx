import type { ItemProps } from '@zag-js/radio-group'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useRadioGroupContext } from './radio-group-context'
import { RadioGroupItemProvider } from './radio-group-item-context'

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const RadioGroupItem = defineComponent({
  name: 'RadioGroupItem',
  props: {
    value: {
      type: String as PropType<ItemProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<ItemProps['disabled']>,
      default: undefined,
    },
    invalid: {
      type: Boolean as PropType<ItemProps['invalid']>,
      default: undefined,
    },
  },

  setup(props, { slots, attrs }) {
    const api = useRadioGroupContext()
    RadioGroupItemProvider(computed(() => props))

    return () => (
      <ark.label {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
      </ark.label>
    )
  },
})
