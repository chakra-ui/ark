import { mergeProps } from '@zag-js/react'
import { type ReactNode, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardIndicatorBaseProps extends PolymorphicProps {
  copied?: ReactNode
}
export interface ClipboardIndicatorProps extends HTMLProps<'div'>, ClipboardIndicatorBaseProps {}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>(
  (props, ref) => {
    const { children, copied, ...localProps } = props
    const clipboard = useClipboardContext()
    const mergedProps = mergeProps(
      clipboard.getIndicatorProps({ copied: clipboard.copied }),
      localProps,
    )

    return (
      <ark.div {...mergedProps} ref={ref}>
        {clipboard.copied ? copied : children}
      </ark.div>
    )
  },
)

ClipboardIndicator.displayName = 'ClipboardIndicator'
