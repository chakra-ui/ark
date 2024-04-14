import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = defineComponent<SegmentGroupItemControlProps>(
  (_, { slots, attrs }) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemContext()

    return () => (
      <>
        <ark.div
          {...api.value.getItemControlProps(itemProps.value)}
          {...segmentGroupAnatomy.build().itemControl.attrs}
          {...attrs}
        >
          {slots.default?.()}
        </ark.div>
        <input {...api.value.getItemHiddenInputProps(itemProps.value)} />
      </>
    )
  },
  {
    name: 'SegmentGroupItemControl',
  },
)
