import type { ItemGroupLabelProps } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export interface SelectItemGroupLabelProps
  extends Assign<HTMLArkProps<'div'>, ItemGroupLabelProps> {}

export const SelectItemGroupLabel = defineComponent<SelectItemGroupLabelProps>(
  (props, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectItemGroupLabel',
    props: {
      htmlFor: {
        type: String as PropType<SelectItemGroupLabelProps['htmlFor']>,
        required: true,
      },
    },
  },
)
