import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardIndicatorProps extends HTMLArkProps<'div'> {
  copied?: ReactNode
}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>(
  (props, ref) => {
    const { children, copied, ...localProps } = props
    const context = useClipboardContext()
    const mergedProps = mergeProps(
      context.getIndicatorProps({ copied: context.isCopied }),
      localProps,
    )

    return (
      <ark.div {...mergedProps} ref={ref}>
        {context.isCopied ? copied : children}
      </ark.div>
    )
  },
)

ClipboardIndicator.displayName = 'ClipboardIndicator'
