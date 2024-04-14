import type { ItemProps } from '@zag-js/toggle-group'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useToggleGroupContext } from './toggle-group-context'

export interface ToggleGroupItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const ToggleGroupItem = defineComponent<ToggleGroupItemProps>(
  (props, { slots, attrs }) => {
    const api = useToggleGroupContext()

    return () => (
      <ark.button {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ToggleGroupItem',
    props: {
      value: {
        type: String as PropType<ItemProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<ItemProps['disabled']>,
      },
    },
  },
)
