import type { IndicatorProps } from '@zag-js/clipboard'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardIndicatorProps extends Assign<HTMLArkProps<'div'>, IndicatorProps> {}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>(
  (props, ref) => {
    const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['copied'])
    const api = useClipboardContext()
    const mergedProps = mergeProps(api.getIndicatorProps(indicatorProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ClipboardIndicator.displayName = 'ClipboardIndicator'
