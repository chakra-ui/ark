import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useSegmentGroupContext } from './segment-group-context'

export interface SegmentGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const SegmentGroupIndicator = defineComponent<SegmentGroupIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useSegmentGroupContext()

    return () => (
      <ark.div
        {...api.value.indicatorProps}
        {...segmentGroupAnatomy.build().indicator.attrs}
        {...attrs}
      >
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SegmentGroupIndicator',
  },
)
