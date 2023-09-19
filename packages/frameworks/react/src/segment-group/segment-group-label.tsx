import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const { labelProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(labelProps, props)

    return <ark.label {...mergedProps} {...segmentGroupAnatomy.build().label.attrs} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
