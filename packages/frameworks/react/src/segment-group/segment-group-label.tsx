import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const context = useSegmentGroupContext()
    const mergedProps = mergeProps(
      context.labelProps,
      segmentGroupAnatomy.build().label.attrs as Record<string, string>,
      props,
    )

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
