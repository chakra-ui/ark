import type { ItemGroupProps } from '@zag-js/combobox'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { useComboboxContext } from './combobox-context'

export interface ComboboxItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const ComboboxItemGroup = defineComponent<ComboboxItemGroupProps>(
  (props, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getItemGroupProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemGroup',
    props: {
      id: {
        type: String as PropType<ComboboxItemGroupProps['id']>,
        required: true,
      },
    },
  },
)
