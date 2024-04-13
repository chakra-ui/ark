import { mergeProps } from '@zag-js/react'
import { type ReactNode, forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardIndicatorProps extends HTMLArkProps<'div'> {
  copied?: ReactNode
}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>(
  (props, ref) => {
    const { children, copied, ...localProps } = props
    const clipboard = useClipboardContext()
    const mergedProps = mergeProps(
      clipboard.getIndicatorProps({ copied: clipboard.isCopied }),
      localProps,
    )

    return (
      <ark.div {...mergedProps} ref={ref}>
        {clipboard.isCopied ? copied : children}
      </ark.div>
    )
  },
)

ClipboardIndicator.displayName = 'ClipboardIndicator'
