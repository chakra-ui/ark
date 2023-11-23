import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemTextProps extends HTMLArkProps<'span'> {}

export const SegmentGroupItemText = defineComponent({
  name: 'SegmentGroupItemText',
  setup(_, { slots, attrs }) {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemContext()

    return () => (
      <ark.span
        {...api.value.getItemTextProps(itemProps.value)}
        {...segmentGroupAnatomy.build().itemText.attrs}
        {...attrs}
      >
        {slots.default?.()}
      </ark.span>
    )
  },
})
