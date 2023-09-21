import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export interface SegmentGroupLabelProps extends HTMLArkProps<'label'> {}

export const SegmentGroupLabel = forwardRef<HTMLLabelElement, SegmentGroupLabelProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const mergedProps = mergeProps(
      api.labelProps,
      parts.label.attrs as Record<string, string>,
      props,
    )

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SegmentGroupLabel.displayName = 'SegmentGroupLabel'
