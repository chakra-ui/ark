import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const mergedProps = mergeProps(
      api.labelProps,
      segmentGroupAnatomy.build().label.attrs as Record<string, string>,
      props,
    )

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
