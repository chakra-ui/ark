import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './segment-group.props'
import { type UseSegmentGroupProps, useSegmentGroup } from './use-segment-group'
import { SegmentGroupProvider } from './use-segment-group-context'

export interface SegmentGroupRootProps extends Assign<HTMLArkProps<'div'>, UseSegmentGroupProps> {}

export const SegmentGroupRoot = defineComponent<SegmentGroupRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useSegmentGroup(props, emit)
    SegmentGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...segmentGroupAnatomy.build().root.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SegmentGroupRoot',
    props,
    emits,
  },
)
