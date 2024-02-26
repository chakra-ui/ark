import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardIndicatorProps extends HTMLArkProps<'div'> {
  copied?: ReactNode
}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>(
  (props, ref) => {
    const { children, copied, ...localProps } = props
    const api = useClipboardContext()
    const mergedProps = mergeProps(api.getIndicatorProps({ copied: api.isCopied }), localProps)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {api.isCopied ? copied : children}
      </ark.div>
    )
  },
)

ClipboardIndicator.displayName = 'ClipboardIndicator'
