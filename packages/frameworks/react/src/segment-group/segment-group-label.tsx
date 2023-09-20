import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const { labelProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(labelProps, segmentGroupAnatomy.build().label.attrs, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
