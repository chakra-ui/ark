import type { ItemProps } from '@zag-js/radio-group'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { RadioGroupItemProvider } from './use-radio-group-item-context'

export interface RadioGroupItemProps extends Assign<HTMLArkProps<'label'>, ItemProps> {}

export const RadioGroupItem = defineComponent<RadioGroupItemProps>(
  (props, { slots, attrs }) => {
    const api = useRadioGroupContext()
    RadioGroupItemProvider(computed(() => props))

    return () => (
      <ark.label {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
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
  },
)
