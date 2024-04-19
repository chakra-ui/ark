import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

export interface SegmentGroupItemControlProps extends HTMLArkProps<'div'> {}

export const SegmentGroupItemControl = defineComponent<SegmentGroupItemControlProps>(
  (_, { slots, attrs }) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()

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
