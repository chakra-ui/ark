import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemTextProps extends HTMLArkProps<'span'> {}

export const SegmentGroupItemText = defineComponent<SegmentGroupItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()

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
  {
    name: 'SegmentGroupItemText',
  },
)
