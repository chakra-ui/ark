import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentGroupLabelProps = HTMLArkProps<'label'>

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const { labelProps } = useSegmentGroupContext()
    const mergedProps = mergeProps(labelProps, props)

    return <ark.label {...mergedProps} {...parts.label.attrs} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
