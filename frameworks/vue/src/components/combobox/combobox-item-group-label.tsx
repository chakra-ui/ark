import type { ItemGroupLabelProps } from '@zag-js/combobox'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useComboboxContext } from './combobox-context'

export interface ComboboxItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const ComboboxItemGroupLabel = defineComponent<ComboboxItemGroupLabelProps>(
  (props, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxItemGroupLabel',
    props: {
      htmlFor: {
        type: String as PropType<ComboboxItemGroupLabelProps['htmlFor']>,
        required: true,
      },
    },
  },
)
