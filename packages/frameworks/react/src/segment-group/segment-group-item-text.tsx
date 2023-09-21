import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSegmentGroupContext } from './segment-group-context'
import { useSegmentGroupItemContext } from './segment-group-item-context'
import { parts } from './segment-group.anatomy'

export interface SegmentGroupItemTextProps extends HTMLArkProps<'span'> {}

export const SegmentGroupItemText = forwardRef<HTMLSpanElement, SegmentGroupItemTextProps>(
  (props, ref) => {
    const api = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemContext()
    const mergedProps = mergeProps(
      api.getItemTextProps(itemProps),
      parts.itemText.attrs as Record<string, string>,
      props,
    )

    return <ark.span {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemText.displayName = 'SegmentGroupItemText'
