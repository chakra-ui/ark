'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardIndicatorBaseProps extends PolymorphicProps {
  copied?: ReactNode | undefined
}
export interface ClipboardIndicatorProps extends HTMLProps<'div'>, ClipboardIndicatorBaseProps {}

export const ClipboardIndicator = ({ ref, ...props }: ClipboardIndicatorProps) => {
  const { children, copied, ...localProps } = props
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getIndicatorProps({ copied: clipboard.copied }), localProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {clipboard.copied ? copied : children}
    </ark.div>
  )
}

ClipboardIndicator.displayName = 'ClipboardIndicator'
